import React from 'react';
import type { ExperienceItem } from '../types';
import GlowCard from './GlowCard';

const experienceData: ExperienceItem[] = [
	{
		date: 'May 2025 - Present',
		title: 'Research Assistant',
		company: 'Wordification',
		description:
			'Developed an interactive word-learning platform using RedwoodJS, React, GraphQL, and Rive animations. Collaborated with a team to optimise usability, design, and data workflows. Authored documentation and proposed roadmap for AI-driven personalization, enabling dialect-aware features.',
		tags: ['React', 'TypeScript', 'RedwoodJS', 'Tailwind CSS', 'Storybook', 'GraphQL', 'Rive'],
	},
];

const Experience: React.FC = () => {
	return (
		<section id="experience" className="scroll-mt-24">
			<h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-12">
				Experience
			</h2>
			<div className="flex flex-col space-y-6">
				{experienceData.map((item, index) => (
					<GlowCard key={index} className="p-6 sm:p-8">
						<div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
							<header className="sm:w-1/4 shrink-0">
								<span className="text-xs font-semibold uppercase tracking-wide text-slate-500 block mt-1">
									{item.date}
								</span>
							</header>
							<div className="sm:w-3/4">
								<h3 className="text-lg font-medium text-slate-200 group-hover:text-purple-400 transition-colors duration-300">
									{item.title} · {item.company}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-slate-400">
									{item.description}
								</p>
								<ul
									className="mt-4 flex flex-wrap gap-2"
									aria-label="Technologies used"
								>
									{item.tags.map((tag, tagIndex) => (
										<li key={tagIndex}>
											<div className="flex items-center rounded-full bg-purple-400/10 px-3 py-1 text-xs font-medium leading-5 text-purple-300">
												{tag}
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</GlowCard>
				))}
			</div>
		</section>
	);
};

export default Experience;
