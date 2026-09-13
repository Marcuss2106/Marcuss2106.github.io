import React from 'react';
import { useInView } from '../hooks/useReveal';

interface Box {
	x: number;
	y: number;
	w: number;
	h: number;
	label: string;
	tone: 'iris' | 'aqua' | 'flare';
	/** Place the caption under the box instead of above it. */
	below?: boolean;
}

const boxes: Box[] = [
	{ x: 118, y: 26, w: 64, h: 34, label: 'insulator 0.91', tone: 'aqua' },
	{ x: 126, y: 74, w: 48, h: 46, label: 'transformer 0.88', tone: 'iris' },
	{ x: 108, y: 18, w: 84, h: 208, label: 'pole:wood 0.94', tone: 'iris', below: true },
	{ x: 176, y: 156, w: 96, h: 62, label: 'vegetation · med', tone: 'flare' },
];

const tones = {
	iris: '#a78bfa',
	aqua: '#22d3ee',
	flare: '#f472b6',
};

/**
 * Stylized stand-in for the Polepad inference output — the project has no
 * screenshot, so the card renders the pipeline instead.
 */
const DetectionVisual: React.FC = () => {
	// The dashed strokes and scan sweep are SVG repaints, not composited
	// transforms, so they are worth stopping the moment they leave the screen.
	const { ref, inView } = useInView<HTMLDivElement>();

	return (
	<div
		ref={ref}
		className={`relative h-full min-h-[280px] w-full overflow-hidden rounded-xl border border-white/8 bg-ink-900 ${
			inView ? '' : 'anim-paused'
		}`}
	>
		<div className="absolute inset-0 grid-lines opacity-60" />
		<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.18),transparent_60%)]" />

		<svg
			viewBox="0 0 320 260"
			className="absolute inset-0 h-full w-full"
			role="img"
			aria-label="Illustration of AI detection boxes on a utility pole"
		>
			{/* pole + hardware silhouettes */}
			<rect x="140" y="20" width="20" height="210" rx="3" fill="#1f2537" />
			<rect x="112" y="34" width="76" height="7" rx="3" fill="#1f2537" />
			<rect x="130" y="82" width="40" height="34" rx="4" fill="#252b40" />
			<circle cx="120" cy="30" r="5" fill="#252b40" />
			<circle cx="180" cy="30" r="5" fill="#252b40" />
			<path
				d="M186 218c8-22 22-34 40-38 20-4 34 6 44 20 8 11 10 18 10 18Z"
				fill="rgba(244,114,182,0.14)"
			/>

			{boxes.map((box) => {
				const capY = box.below ? box.y + box.h : box.y - 12;
				return (
					<g key={box.label}>
						<rect
							x={box.x}
							y={box.y}
							width={box.w}
							height={box.h}
							rx="3"
							fill="none"
							stroke={tones[box.tone]}
							strokeWidth="1.2"
							className="animate-dash"
							opacity="0.85"
						/>
						<rect
							x={box.x}
							y={capY}
							width={box.label.length * 5.4 + 8}
							height="12"
							rx="2"
							fill={tones[box.tone]}
							opacity="0.9"
						/>
						<text
							x={box.x + 4}
							y={capY + 8.5}
							fontSize="7.5"
							fontFamily="ui-monospace, monospace"
							fill="#04050a"
							fontWeight="600"
						>
							{box.label}
						</text>
					</g>
				);
			})}
		</svg>

		{/* scan sweep */}
		<div className="animate-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua-300 to-transparent shadow-[0_0_16px_2px_rgba(34,211,238,0.6)]" />

		{/* OCR readout chip */}
		<div className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-ink-950/95 px-3 py-2 font-mono text-[10.5px]">
			<p className="text-slate-500">PP-OCRv5 · plate</p>
			<p className="mt-0.5 tracking-[0.14em] text-white">
				A<span className="text-aqua-300">B</span>1
				<span className="text-flare-400">2</span>34
			</p>
			<p className="mt-0.5 text-emerald-400">conf 0.97</p>
		</div>

		<div className="absolute right-3 top-3 rounded-full border border-white/10 bg-ink-950/90 px-2.5 py-1 font-mono text-[10px] text-slate-400">
			842 ms
		</div>
	</div>
	);
};

export default DetectionVisual;
