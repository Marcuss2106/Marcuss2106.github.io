import React from 'react';
import { roles } from '../data/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

const Experience: React.FC = () => (
	<section
		id="experience"
		className="scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32"
	>
		<div className="mx-auto max-w-6xl">
			<SectionHeading
				index="03"
				title="Experience"
				kicker="Research, engineering, leadership"
			/>

			<div className="relative">
				{/* timeline spine */}
				<div
					aria-hidden
					className="absolute left-[7px] top-2 hidden h-full w-px bg-gradient-to-b from-iris-500 via-aqua-400/40 to-transparent sm:block"
				/>

				<ol className="space-y-6">
					{roles.map((role, i) => (
						<Reveal as="li" key={role.title} delay={i * 100} className="relative">
							<span
								aria-hidden
								className="absolute left-0 top-8 hidden h-[15px] w-[15px] items-center justify-center rounded-full border border-iris-400/50 bg-ink-950 sm:flex"
							>
								<span className="h-[5px] w-[5px] rounded-full bg-iris-400 shadow-[0_0_10px_2px_rgba(139,92,246,0.8)]" />
							</span>

							<SpotlightCard className="p-6 sm:ml-10 sm:p-8">
								<div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
									<div>
										<div className="flex flex-wrap items-center gap-2.5">
											<h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
												{role.title}
											</h3>
											{role.kind === 'leadership' && (
												<span className="rounded-full border border-aqua-400/25 bg-aqua-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-aqua-300">
													Leadership
												</span>
											)}
										</div>
										<p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-iris-400">
											{role.url ? (
												<a
													href={role.url}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
												>
													{role.org}
													<ExternalLinkIcon className="h-3.5 w-3.5" />
												</a>
											) : (
												role.org
											)}
											<span className="text-slate-600">·</span>
											<span className="text-slate-500">{role.location}</span>
										</p>
									</div>

									<span className="shrink-0 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 font-mono text-[11px] tracking-tight text-slate-400">
										{role.period}
									</span>
								</div>

								<p className="mt-4 text-[14.5px] leading-relaxed text-slate-300">
									{role.summary}
								</p>

								<ul className="mt-5 space-y-2.5">
									{role.highlights.map((point) => (
										<li
											key={point}
											className="flex gap-3 text-[14px] leading-relaxed text-slate-400"
										>
											<span
												aria-hidden
												className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-iris-500"
											/>
											{point}
										</li>
									))}
								</ul>

								<ul className="mt-6 flex flex-wrap gap-2">
									{role.tags.map((tag) => (
										<li
											key={tag}
											className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-400 transition-colors duration-300 hover:border-iris-400/30 hover:text-iris-400"
										>
											{tag}
										</li>
									))}
								</ul>
							</SpotlightCard>
						</Reveal>
					))}
				</ol>
			</div>
		</div>
	</section>
);

export default Experience;
