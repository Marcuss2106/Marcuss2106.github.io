import React, { useMemo, useState } from 'react';
import type { Project } from '../types';
import { projects } from '../data/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import DetectionVisual from './DetectionVisual';
import GithubIcon from './icons/GithubIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import TrophyIcon from './icons/TrophyIcon';
import ArrowIcon from './icons/ArrowIcon';

const FILTERS = ['All', 'AI / ML', 'Full-stack', 'Systems'] as const;
type Filter = (typeof FILTERS)[number];

const MATCHERS: Record<Exclude<Filter, 'All'>, string[]> = {
	'AI / ML': ['PyTorch', 'YOLOv26', 'YOLOv11', 'PaddleOCR', 'pandas', 'NumPy', 'Azure AI Vision'],
	'Full-stack': ['React', 'Next.js', 'FastAPI', 'Flask', 'Supabase', 'Docker', 'Postgres'],
	Systems: ['C++17', 'POSIX', 'mmap', 'CUDA', 'Make'],
};

const matches = (project: Project, filter: Filter) =>
	filter === 'All' || project.tags.some((t) => MATCHERS[filter].includes(t));

const Links: React.FC<{ project: Project; className?: string }> = ({
	project,
	className = '',
}) => (
	<div className={`flex items-center gap-2 ${className}`}>
		{project.githubUrl && (
			<a
				href={project.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${project.title} source on GitHub`}
				className="grid h-9 w-9 place-items-center rounded-full border border-white/8 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-iris-400/40 hover:text-iris-400"
			>
				<GithubIcon className="h-4 w-4" />
			</a>
		)}
		{project.liveUrl && (
			<a
				href={project.liveUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${project.title} live link`}
				className="grid h-9 w-9 place-items-center rounded-full border border-white/8 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua-400/40 hover:text-aqua-300"
			>
				<ExternalLinkIcon className="h-4 w-4" />
			</a>
		)}
	</div>
);

const Metrics: React.FC<{ project: Project }> = ({ project }) =>
	project.metrics ? (
		<dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
			{project.metrics.map((m) => (
				<div key={m.label}>
					<dt className="font-display text-xl font-bold text-white">
						{m.value}
					</dt>
					<dd className="mt-0.5 font-mono text-[10.5px] uppercase tracking-wider text-slate-500">
						{m.label}
					</dd>
				</div>
			))}
		</dl>
	) : null;

const Tags: React.FC<{ tags: string[] }> = ({ tags }) => (
	<ul className="mt-6 flex flex-wrap gap-2">
		{tags.map((tag) => (
			<li
				key={tag}
				className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-400"
			>
				{tag}
			</li>
		))}
	</ul>
);

const Snippet: React.FC<{ snippet: NonNullable<Project['snippet']> }> = ({
	snippet,
}) => (
	<div className="mt-5 overflow-hidden rounded-lg border border-white/8 bg-ink-900/70">
		<p className="border-b border-white/6 bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
			{snippet.caption}
		</p>
		<pre className="overflow-x-auto px-3 py-3 font-mono text-[11px] leading-[1.7] text-slate-400">
			{snippet.lines.join('\n')}
		</pre>
	</div>
);

const FeaturedCard: React.FC<{ project: Project }> = ({ project }) => (
	<SpotlightCard className="p-6 sm:p-8" spotlight={620}>
		<div className="grid gap-8 lg:grid-cols-2 lg:items-center">
			<div>
				{project.accolade && (
					<span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300">
						<TrophyIcon className="h-3.5 w-3.5" />
						{project.accolade}
					</span>
				)}

				<h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
					{project.title}
				</h3>
				<p className="mt-2 text-[15px] font-medium text-iris-400">
					{project.blurb}
				</p>
				<p className="mt-5 text-[14.5px] leading-relaxed text-slate-400">
					{project.description}
				</p>

				<Metrics project={project} />
				<Tags tags={project.tags} />

				<div className="mt-7 flex items-center gap-3">
					{project.githubUrl && (
						<a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="group/btn inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-2.5 text-[13px] font-semibold text-white ring-1 ring-inset ring-white/12 transition-all duration-300 hover:bg-white/14"
						>
							<GithubIcon className="h-4 w-4" />
							View source
							<ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
						</a>
					)}
					{project.liveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-aqua-300 transition-colors duration-300 hover:text-aqua-400"
						>
							Live demo
							<ExternalLinkIcon className="h-3.5 w-3.5" />
						</a>
					)}
				</div>
			</div>

			<div className="relative">
				{project.imageUrl ? (
					<div className="overflow-hidden rounded-xl border border-white/8">
						<img
							src={project.imageUrl}
							alt={project.title}
							loading="lazy"
							decoding="async"
							className="h-full max-h-[320px] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
						/>
					</div>
				) : (
					<DetectionVisual />
				)}
			</div>
		</div>
	</SpotlightCard>
);

const Card: React.FC<{ project: Project }> = ({ project }) => (
	<SpotlightCard className="flex flex-col p-6" tilt>
		<div className="flex items-start justify-between gap-4">
			<div>
				<h3 className="font-display text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-iris-400">
					{project.title}
				</h3>
				<p className="mt-1 font-mono text-[11px] text-slate-500">
					{project.year}
				</p>
			</div>
			<Links project={project} />
		</div>

		{project.imageUrl ? (
			<div className="mt-5 overflow-hidden rounded-lg border border-white/6">
				<img
					src={project.imageUrl}
					alt={project.title}
					loading="lazy"
					decoding="async"
					style={
						project.invertImage
							? { filter: 'invert(1) hue-rotate(180deg)' }
							: undefined
					}
					className="h-36 w-full object-cover object-top opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
				/>
			</div>
		) : (
			project.snippet && <Snippet snippet={project.snippet} />
		)}

		<p className="mt-5 text-[14px] font-medium text-slate-300">
			{project.blurb}
		</p>
		<p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-500">
			{project.description}
		</p>

		{project.metrics && (
			<dl className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
				{project.metrics.map((m) => (
					<div key={m.label}>
						<dt className="font-display text-base font-bold text-iris-400">
							{m.value}
						</dt>
						<dd className="font-mono text-[10px] uppercase tracking-wider text-slate-600">
							{m.label}
						</dd>
					</div>
				))}
			</dl>
		)}

		<Tags tags={project.tags} />
	</SpotlightCard>
);

const Projects: React.FC = () => {
	const [filter, setFilter] = useState<Filter>('All');

	const { featured, rest } = useMemo(() => {
		const visible = projects.filter((p) => matches(p, filter));
		return {
			featured: visible.filter((p) => p.featured),
			rest: visible.filter((p) => !p.featured),
		};
	}, [filter]);

	return (
		<section id="work" className="scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32">
			<div className="mx-auto max-w-6xl">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<SectionHeading
						index="04"
						title="Selected work"
						kicker="Things I've shipped"
					/>

					<Reveal className="mb-12 sm:mb-16" delay={120}>
						<div className="flex flex-wrap gap-1.5 rounded-full border border-white/8 bg-white/[0.04] p-1">
							{FILTERS.map((f) => (
								<button
									key={f}
									type="button"
									onClick={() => setFilter(f)}
									className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-300 ${
										filter === f
											? 'bg-white/10 text-white ring-1 ring-inset ring-white/12'
											: 'text-slate-400 hover:text-slate-100'
									}`}
								>
									{f}
								</button>
							))}
						</div>
					</Reveal>
				</div>

				<div className="space-y-6">
					{featured.map((project, i) => (
						<Reveal key={project.slug} delay={i * 100}>
							<FeaturedCard project={project} />
						</Reveal>
					))}

					{rest.length > 0 && (
						/* Masonry columns keep cards at their natural height so
						   text-only entries don't leave dead space. */
						<div className="gap-6 md:columns-2">
							{rest.map((project, i) => (
								<Reveal
									key={project.slug}
									delay={i * 80}
									className="mb-6 break-inside-avoid"
								>
									<Card project={project} />
								</Reveal>
							))}
						</div>
					)}

					{featured.length === 0 && rest.length === 0 && (
						<p className="py-16 text-center font-mono text-sm text-slate-500">
							Nothing here yet — try another filter.
						</p>
					)}
				</div>

				<Reveal delay={140}>
					<a
						href="https://github.com/Marcuss2106?tab=repositories"
						target="_blank"
						rel="noopener noreferrer"
						className="group mt-10 flex items-center justify-center gap-2.5 rounded-2xl border border-dashed border-white/12 py-6 text-sm font-medium text-slate-400 transition-all duration-300 hover:border-iris-400/40 hover:bg-white/[0.02] hover:text-white"
					>
						<GithubIcon className="h-4 w-4" />
						Everything else lives on GitHub
						<ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
					</a>
				</Reveal>
			</div>
		</section>
	);
};

export default Projects;
