import React from 'react';
import { about, profile } from '../data/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';

const About: React.FC = () => (
	<section id="about" className="scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32">
		<div className="mx-auto max-w-6xl">
			<SectionHeading index="02" title="About" kicker="Who you'd be hiring" />

			<div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
				<div>
					<Reveal>
						<p className="font-display text-2xl font-medium leading-snug tracking-tight text-white sm:text-[1.75rem]">
							{about.lede}
						</p>
					</Reveal>

					<div className="mt-8 space-y-5 text-[15px] leading-relaxed text-slate-400">
						{about.paragraphs.map((para, i) => (
							<Reveal key={i} delay={i * 90}>
								<p>{para}</p>
							</Reveal>
						))}
					</div>

					<Reveal delay={280}>
						<div className="mt-9 flex flex-wrap gap-2.5">
							{[profile.clearance, profile.degree, `Class of 2028`].map(
								(chip) => (
									<span
										key={chip}
										className="rounded-full border border-iris-500/25 bg-iris-500/10 px-3.5 py-1.5 text-xs font-medium text-iris-400"
									>
										{chip}
									</span>
								)
							)}
						</div>
					</Reveal>
				</div>

				<div className="space-y-4">
					<Reveal delay={120}>
						<SpotlightCard className="p-6" tilt>
							<h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
								Fast facts
							</h3>
							<dl className="mt-5 space-y-3.5">
								{about.facts.map((fact) => (
									<div
										key={fact.label}
										className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3.5 last:border-0 last:pb-0"
									>
										<dt className="text-[13px] text-slate-500">{fact.label}</dt>
										<dd className="text-right text-[13.5px] font-medium text-slate-200">
											{fact.value}
										</dd>
									</div>
								))}
							</dl>
						</SpotlightCard>
					</Reveal>

					<Reveal delay={200}>
						<SpotlightCard className="overflow-hidden p-0">
							<img
								src="/climbing_holds.jpg"
								alt="Indoor climbing wall with colored holds"
								loading="lazy"
								decoding="async"
								className="h-44 w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
							<p className="absolute bottom-4 left-5 right-5 text-[13px] text-slate-300">
								<span className="font-medium text-white">Off the clock:</span>{' '}
								climbing — which is how the hold-detection model started.
							</p>
						</SpotlightCard>
					</Reveal>
				</div>
			</div>
		</div>
	</section>
);

export default About;
