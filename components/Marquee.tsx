import React from 'react';
import { marqueeItems } from '../data/content';

const Marquee: React.FC = () => {
	const track = [...marqueeItems, ...marqueeItems];

	return (
		<div className="pause-on-hover relative overflow-hidden border-y border-white/6 bg-white/[0.02] py-4">
			<div className="animate-marquee flex w-max items-center gap-10 pr-10">
				{track.map((item, i) => (
					<span
						key={`${item}-${i}`}
						className="flex shrink-0 items-center gap-10 font-mono text-sm uppercase tracking-[0.18em] text-slate-500 transition-colors duration-300 hover:text-iris-400"
					>
						{item}
						<span className="h-1 w-1 rounded-full bg-iris-500/60" />
					</span>
				))}
			</div>

			<div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
		</div>
	);
};

export default Marquee;
