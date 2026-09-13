import React, { useState } from 'react';
import { profile } from '../data/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import EmailIcon from './icons/EmailIcon';
import ResumeIcon from './icons/ResumeIcon';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';
import ArrowIcon from './icons/ArrowIcon';

const channels = [
	{
		name: 'GitHub',
		handle: profile.githubHandle,
		url: profile.github,
		Icon: GithubIcon,
	},
	{
		name: 'LinkedIn',
		handle: 'marcus-sostak',
		url: profile.linkedin,
		Icon: LinkedinIcon,
	},
	{
		name: 'Résumé',
		handle: 'PDF · September 2026',
		url: profile.resume,
		Icon: ResumeIcon,
	},
];

const Contact: React.FC = () => {
	const [copied, setCopied] = useState(false);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(profile.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			window.location.href = `mailto:${profile.email}`;
		}
	};

	return (
		<section id="contact" className="scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionHeading index="06" title="Let's build something" kicker="Say hi" />

				<Reveal>
					<div className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-iris-600/12 via-white/[0.02] to-aqua-400/10 p-8 sm:p-12">
						<div
							aria-hidden
							className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-iris-500/20 blur-3xl"
						/>
						<div
							aria-hidden
							className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-aqua-400/12 blur-3xl"
						/>

						<div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
							<div>
								<p className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
									I&apos;m looking for{' '}
									<span className="text-gradient-static">Summer 2027</span>{' '}
									software engineering and ML internships.
								</p>
								<p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-400">
									If you have an interesting problem — or you just want to talk
									about computer vision, systems, or climbing — my inbox is
									open. I try to reply within a day.
								</p>

								<div className="mt-8 flex flex-wrap items-center gap-3">
									<a
										href={`mailto:${profile.email}`}
										className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-iris-500 to-aqua-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
									>
										<EmailIcon className="h-4 w-4" />
										Email me
										<ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
									</a>

									<button
										type="button"
										onClick={copyEmail}
										className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 font-mono text-[13px] text-slate-300 transition-all duration-300 hover:border-iris-400/40 hover:text-white"
									>
										{copied ? (
											<CheckIcon className="h-4 w-4 text-emerald-400" />
										) : (
											<CopyIcon className="h-4 w-4" />
										)}
										{copied ? 'Copied!' : profile.email}
									</button>
								</div>
							</div>

							<ul className="space-y-3">
								{channels.map(({ name, handle, url, Icon }) => (
									<li key={name}>
										<a
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-ink-950/60 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-iris-400/35 hover:bg-ink-900/80"
										>
											<span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/6 text-slate-300 transition-colors duration-300 group-hover:bg-iris-500/15 group-hover:text-iris-400">
												<Icon className="h-[18px] w-[18px]" />
											</span>
											<span className="min-w-0 flex-1">
												<span className="block text-sm font-semibold text-white">
													{name}
												</span>
												<span className="block truncate font-mono text-[11.5px] text-slate-500">
													{handle}
												</span>
											</span>
											<ArrowIcon className="h-4 w-4 shrink-0 -rotate-45 text-slate-600 transition-all duration-300 group-hover:rotate-0 group-hover:text-iris-400" />
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
};

export default Contact;
