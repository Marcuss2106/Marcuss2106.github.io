import React, { useCallback, useEffect, useRef } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
	/** Adds a subtle 3D tilt toward the cursor. */
	tilt?: boolean;
	/** Radius of the cursor-following glow, in pixels. */
	spotlight?: number;
}

/**
 * Pointer position is pushed straight to CSS custom properties on the node and
 * batched into one rAF. Storing it in React state instead would re-render the
 * whole card subtree on every mousemove — with a dozen cards on the page that
 * is the difference between smooth and visibly janky.
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({
	children,
	className = '',
	tilt = false,
	spotlight = 420,
	...rest
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const frame = useRef(0);
	const pending = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

	const flush = useCallback(() => {
		frame.current = 0;
		const node = ref.current;
		if (!node) return;

		const { x, y, rx, ry } = pending.current;
		node.style.setProperty('--mx', `${x}px`);
		node.style.setProperty('--my', `${y}px`);
		if (tilt) {
			node.style.setProperty(
				'--tilt',
				`perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`
			);
		}
	}, [tilt]);

	const handleMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const node = ref.current;
			if (!node) return;

			const rect = node.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			pending.current = {
				x,
				y,
				rx: ((rect.height / 2 - y) / rect.height) * 7,
				ry: ((x - rect.width / 2) / rect.width) * 7,
			};

			if (!frame.current) frame.current = requestAnimationFrame(flush);
		},
		[flush]
	);

	const handleEnter = useCallback(() => {
		const node = ref.current;
		if (!node) return;
		// Transform must not be transitioning while we retarget it every frame:
		// each new target would restart the transition and force a style
		// recalculation on the main thread for the whole hover duration.
		node.classList.remove('tilt-return');
		node.style.setProperty('--spot-opacity', '1');
	}, []);

	const handleLeave = useCallback(() => {
		const node = ref.current;
		if (!node) return;
		node.classList.add('tilt-return');
		node.style.setProperty('--spot-opacity', '0');
		node.style.setProperty('--tilt', 'none');
	}, []);

	useEffect(
		() => () => {
			if (frame.current) cancelAnimationFrame(frame.current);
		},
		[]
	);

	return (
		<div
			ref={ref}
			onMouseMove={handleMove}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			style={
				{
					'--mx': '50%',
					'--my': '50%',
					'--spot-opacity': '0',
					'--tilt': 'none',
					'--spot-size': `${spotlight}px`,
					transform: 'var(--tilt)',
				} as React.CSSProperties
			}
			className={`group surface surface-hover relative isolate overflow-hidden rounded-2xl transition-[border-color,background-color] duration-500 ease-out ${className}`}
			{...rest}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
				style={{
					opacity: 'var(--spot-opacity)',
					background:
						'radial-gradient(var(--spot-size) circle at var(--mx) var(--my), rgba(139,92,246,0.16), transparent 65%)',
				}}
			/>
			{children}
		</div>
	);
};

export default SpotlightCard;
