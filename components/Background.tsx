import React, { useEffect, useRef } from 'react';

interface Node {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
}

const LINK_DISTANCE = 140;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
const POINTER_RADIUS = 190;
const POINTER_RADIUS_SQ = POINTER_RADIUS * POINTER_RADIUS;

/** Alpha bands used to batch line segments into a handful of draw calls. */
const BANDS = 4;
const FAR_MAX_ALPHA = 0.08;
const NEAR_MAX_ALPHA = 0.55;

/** A full-viewport canvas re-uploads its whole texture to the GPU on every
 *  painted frame, so halving the rate roughly halves that bandwidth. */
const FRAME_INTERVAL = 1000 / 30;

/**
 * Layered backdrop: drifting aurora blobs, a faint grid, and a canvas
 * constellation that leans toward the cursor.
 */
const Background: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;

		// Phones, low-core laptops, and ?lite get a single static pass instead
		// of a permanently running loop.
		const lowPower =
			document.documentElement.dataset.lowPower === 'true' ||
			window.matchMedia('(max-width: 768px)').matches;

		const isStatic = reduceMotion || lowPower;

		let frame = 0;
		let lastPaint = 0;
		let nodes: Node[] = [];
		let width = 0;
		let height = 0;
		const pointer = { x: -9999, y: -9999 };

		const resize = () => {
			// Deliberately 1:1 with CSS pixels. A 2x buffer quadruples the
			// bytes pushed per frame for detail nobody notices on 1px lines
			// behind content.
			const dpr = 1;
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const count = Math.min(60, Math.round((width * height) / 26000));
			nodes = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.22,
				vy: (Math.random() - 0.5) * 0.22,
				r: Math.random() * 1.4 + 0.5,
			}));

			if (isStatic) {
				ctx.clearRect(0, 0, width, height);
				drawNodes();
				drawLinks();
			}
		};

		const onPointerMove = (e: PointerEvent) => {
			pointer.x = e.clientX;
			pointer.y = e.clientY;
		};

		const onPointerLeave = () => {
			pointer.x = -9999;
			pointer.y = -9999;
		};

		const drawNodes = () => {
			const dim = new Path2D();

			for (const node of nodes) {
				node.x += node.vx;
				node.y += node.vy;

				if (node.x < 0) node.x = width;
				if (node.x > width) node.x = 0;
				if (node.y < 0) node.y = height;
				if (node.y > height) node.y = 0;

				const dx = node.x - pointer.x;
				const dy = node.y - pointer.y;
				const distSq = dx * dx + dy * dy;

				if (distSq < POINTER_RADIUS_SQ) {
					// Few enough of these to be worth their own draw call.
					const dist = Math.sqrt(distSq);
					ctx.beginPath();
					ctx.arc(node.x, node.y, node.r + 0.7, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(167, 139, 250, ${0.9 - dist / POINTER_RADIUS})`;
					ctx.fill();
				} else {
					dim.moveTo(node.x + node.r, node.y);
					dim.arc(node.x, node.y, node.r, 0, Math.PI * 2);
				}
			}

			ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
			ctx.fill(dim);
		};

		const drawLinks = () => {
			// One Path2D per alpha band instead of one stroke() per segment.
			const far = Array.from({ length: BANDS }, () => new Path2D());
			const near = Array.from({ length: BANDS }, () => new Path2D());
			let anyFar = false;
			let anyNear = false;

			for (let i = 0; i < nodes.length; i++) {
				const a = nodes[i];
				for (let j = i + 1; j < nodes.length; j++) {
					const b = nodes[j];
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const distSq = dx * dx + dy * dy;
					if (distSq > LINK_DISTANCE_SQ) continue;

					const closeness = 1 - Math.sqrt(distSq) / LINK_DISTANCE;
					const mx = (a.x + b.x) / 2;
					const my = (a.y + b.y) / 2;
					const pdx = mx - pointer.x;
					const pdy = my - pointer.y;
					const pDistSq = pdx * pdx + pdy * pdy;

					let bucket: Path2D;
					if (pDistSq < POINTER_RADIUS_SQ) {
						const boost = 1 - Math.sqrt(pDistSq) / POINTER_RADIUS;
						const alpha = closeness * (0.07 + boost * 0.45);
						const band = Math.min(
							BANDS - 1,
							(alpha / NEAR_MAX_ALPHA * BANDS) | 0
						);
						bucket = near[band];
						anyNear = true;
					} else {
						const alpha = closeness * 0.07;
						const band = Math.min(
							BANDS - 1,
							(alpha / FAR_MAX_ALPHA * BANDS) | 0
						);
						bucket = far[band];
						anyFar = true;
					}

					bucket.moveTo(a.x, a.y);
					bucket.lineTo(b.x, b.y);
				}
			}

			ctx.lineWidth = 0.7;

			if (anyFar) {
				for (let band = 0; band < BANDS; band++) {
					const alpha = ((band + 0.5) / BANDS) * FAR_MAX_ALPHA;
					ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
					ctx.stroke(far[band]);
				}
			}

			if (anyNear) {
				for (let band = 0; band < BANDS; band++) {
					const alpha = ((band + 0.5) / BANDS) * NEAR_MAX_ALPHA;
					ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
					ctx.stroke(near[band]);
				}
			}
		};

		const draw = (now: number) => {
			frame = requestAnimationFrame(draw);
			if (now - lastPaint < FRAME_INTERVAL) return;
			lastPaint = now;

			ctx.clearRect(0, 0, width, height);
			drawNodes();
			drawLinks();
		};

		const stop = () => {
			if (frame) cancelAnimationFrame(frame);
			frame = 0;
		};

		const start = () => {
			if (!frame) frame = requestAnimationFrame(draw);
		};

		const onVisibility = () => (document.hidden ? stop() : start());

		resize();
		window.addEventListener('resize', resize);

		if (!isStatic) {
			window.addEventListener('pointermove', onPointerMove, { passive: true });
			document.addEventListener('pointerleave', onPointerLeave);
			document.addEventListener('visibilitychange', onVisibility);
			start();
		}

		return () => {
			stop();
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', onPointerMove);
			document.removeEventListener('pointerleave', onPointerLeave);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	}, []);

	return (
		<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<div className="absolute inset-0 bg-ink-950" />

			<div className="aurora aurora-iris -left-[22vw] -top-[26vh] h-[76vh] w-[76vw] animate-drift" />
			<div
				className="aurora aurora-aqua -right-[20vw] top-[4vh] h-[70vh] w-[66vw] animate-drift"
				style={{ animationDelay: '-8s' }}
			/>
			<div
				className="aurora aurora-flare bottom-[-28vh] left-[18vw] h-[78vh] w-[78vw] animate-drift"
				style={{ animationDelay: '-16s' }}
			/>

			<div className="absolute inset-0 grid-lines" />

			<div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,transparent_35%,var(--color-ink-950)_100%)]" />

			<div className="noise-layer absolute inset-0" />

			{/* Last in the stack and given its own compositor layer, so the
			    per-frame invalidation never dirties anything painted above it. */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0"
				style={{ willChange: 'transform', transform: 'translateZ(0)' }}
			/>
		</div>
	);
};

export default Background;
