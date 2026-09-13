import React from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
	index: string;
	title: string;
	kicker?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
	index,
	title,
	kicker,
}) => (
	<Reveal className="mb-12 sm:mb-16">
		<div className="flex items-center gap-3">
			<span className="font-mono text-xs text-iris-400">{index}</span>
			<span className="h-px w-10 bg-gradient-to-r from-iris-500 to-transparent" />
			{kicker && (
				<span className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
					{kicker}
				</span>
			)}
		</div>
		<h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
			{title}
		</h2>
	</Reveal>
);

export default SectionHeading;
