import React from 'react';
import { skillGroups } from '../data/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';

const Stack: React.FC = () => (
	<section id="stack" className="scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32">
		<div className="mx-auto max-w-6xl">
			<SectionHeading
				index="05"
				title="The stack"
				kicker="Tools I reach for"
			/>

			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{skillGroups.map((group, i) => (
					<Reveal key={group.name} delay={i * 70} className="h-full">
						<SpotlightCard className="h-full p-6" tilt>
							<div className="flex items-baseline justify-between gap-3">
								<h3 className="font-display text-lg font-semibold tracking-tight text-white">
									{group.name}
								</h3>
								<span className="font-mono text-[10px] text-slate-600">
									{String(i + 1).padStart(2, '0')}
								</span>
							</div>
							<p className="mt-1 text-[12.5px] text-slate-500">{group.hint}</p>

							<ul className="mt-5 flex flex-wrap gap-2">
								{group.items.map((item) => (
									<li
										key={item}
										className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-[12.5px] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-iris-400/35 hover:bg-iris-500/10 hover:text-iris-400"
									>
										{item}
									</li>
								))}
							</ul>
						</SpotlightCard>
					</Reveal>
				))}
			</div>
		</div>
	</section>
);

export default Stack;
