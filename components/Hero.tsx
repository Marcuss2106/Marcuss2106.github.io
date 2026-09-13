import React, { useEffect, useState } from 'react';
import { heroTerminal, profile, roleRotation, stats } from '../data/content';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import EmailIcon from './icons/EmailIcon';
import ArrowIcon from './icons/ArrowIcon';

/** Types a phrase out, holds, deletes, then moves to the next one. */
const Typewriter: React.FC<{ phrases: string[] }> = ({ phrases }) => {
	// This re-renders roughly 20 times a second for as long as the page is
	// open, so it is skipped entirely when effects are dialled down.
	const [reduced] = useState(
		() =>
			typeof document !== 'undefined' &&
			(document.documentElement.dataset.lowPower === 'true' ||
				window.matchMedia('(prefers-reduced-motion: reduce)').matches)
	);

	const [index, setIndex] = useState(0);
	const [text, setText] = useState('');
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (reduced) return;

		const current = phrases[index % phrases.length];
		const done = !deleting && text === current;
		const cleared = deleting && text === '';

		const delay = done ? 1900 : cleared ? 220 : deleting ? 34 : 62;

		const timer = setTimeout(() => {
			if (done) return setDeleting(true);
			if (cleared) {
				setDeleting(false);
				setIndex((i) => i + 1);
				return;
			}
			setText(
				deleting
					? current.slice(0, text.length - 1)
					: current.slice(0, text.length + 1)
			);
		}, delay);

		return () => clearTimeout(timer);
	}, [text, deleting, index, phrases, reduced]);

	if (reduced) {
		return <span className="text-gradient-static">{phrases[0]}</span>;
	}

	return (
		<span className="text-gradient-static">
			{text}
			<span className="animate-caret ml-0.5 font-light text-aqua-300">|</span>
		</span>
	);
};

const Terminal: React.FC = () => (
	<div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 font-mono text-[12.5px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.95)] sm:text-[13px]">
		<div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-2.5">
			<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
			<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
			<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
			<span className="ml-2 text-[11px] text-slate-500">
				marcus@portfolio — zsh
			</span>
		</div>
		<div className="space-y-2.5 px-4 py-4">
			{heroTerminal.map((line) => (
				<div key={line.prompt}>
					<p className="flex gap-2">
						<span className="text-aqua-400">➜</span>
						<span className="text-iris-400">~</span>
						<span className="text-slate-200">{line.prompt}</span>
					</p>
					<p className="pl-6 text-slate-500">{line.output}</p>
				</div>
			))}
			<p className="flex gap-2">
				<span className="text-aqua-400">➜</span>
				<span className="text-iris-400">~</span>
				<span className="animate-caret text-slate-200">▊</span>
			</p>
		</div>
	</div>
);

const Hero: React.FC = () => {
	return (
		<section
			id="home"
			className="relative flex min-h-[100svh] scroll-mt-24 items-center px-5 pb-16 pt-28 sm:px-8"
		>
			<div className="mx-auto w-full max-w-6xl">
				<div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
					{/* ---- copy ---- */}
					<div>
						<div className="reveal reveal-visible inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-2 pr-4 text-[12.5px] text-slate-300">
							<span className="relative grid h-4 w-4 place-items-center">
								<span className="animate-pulse-ring absolute h-2 w-2 rounded-full bg-emerald-400" />
								<span className="h-2 w-2 rounded-full bg-emerald-400" />
							</span>
							{profile.availability}
						</div>

						<h1 className="mt-6 font-display text-[13vw] font-bold leading-[0.92] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.6rem]">
							<span className="block text-gradient">Marcus</span>
							<span className="block text-gradient">Sostak</span>
						</h1>

						<p className="mt-5 font-mono text-sm text-slate-400 sm:text-base">
							<span className="text-slate-600">&gt;</span> I&apos;m a{' '}
							<Typewriter phrases={roleRotation} />
						</p>

						<p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base">
							CS + Math at the{' '}
							<span className="text-slate-200">University of South Carolina</span>,
							concentrating in AI. I build computer vision pipelines, research
							platforms, and the unglamorous infrastructure that keeps them
							running in production.
						</p>

						<div className="mt-9 flex flex-wrap items-center gap-3">
							<a
								href="#work"
								onClick={(e) => {
									e.preventDefault();
									document
										.getElementById('work')
										?.scrollIntoView({ behavior: 'smooth' });
								}}
								className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-iris-500 to-aqua-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
							>
								<span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
								<span className="relative">See my work</span>
								<ArrowIcon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
							</a>

							<a
								href={`mailto:${profile.email}`}
								className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-iris-400/50 hover:bg-white/[0.08] hover:text-white"
							>
								Get in touch
							</a>

							<div className="ml-1 flex items-center gap-1">
								{[
									{ href: profile.github, Icon: GithubIcon, label: 'GitHub' },
									{
										href: profile.linkedin,
										Icon: LinkedinIcon,
										label: 'LinkedIn',
									},
									{
										href: `mailto:${profile.email}`,
										Icon: EmailIcon,
										label: 'Email',
									},
								].map(({ href, Icon, label }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="grid h-10 w-10 place-items-center rounded-full text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/6 hover:text-iris-400"
									>
										<Icon className="h-[18px] w-[18px]" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* ---- portrait + terminal ---- */}
					<div className="relative mx-auto w-full max-w-sm lg:max-w-none">
						<div className="relative mx-auto w-fit animate-float-slow">
							<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-iris-500/40 via-transparent to-aqua-400/40 blur-2xl" />
							<div className="relative h-40 w-40 rounded-full bg-gradient-to-br from-iris-500 via-flare-400/60 to-aqua-400 p-[2px] sm:h-48 sm:w-48">
								<img
									src="/me.jpg"
									alt="Marcus Sostak"
									width={192}
									height={192}
									decoding="async"
									className="h-full w-full rounded-full border-4 border-ink-950 object-cover object-top"
								/>
							</div>
							<span className="absolute -bottom-1 -right-1 rounded-full border border-white/10 bg-ink-900 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-aqua-300">
								{profile.location}
							</span>
						</div>

						<div className="mt-8">
							<Terminal />
						</div>
					</div>
				</div>

				{/* ---- stats strip ---- */}
				<dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.06] sm:grid-cols-4">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="group bg-ink-950/85 px-5 py-5 transition-colors duration-300 hover:bg-ink-900/90"
						>
							<dt className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-iris-400 sm:text-3xl">
								{stat.value}
							</dt>
							<dd className="mt-1 text-[13px] font-medium text-slate-300">
								{stat.label}
							</dd>
							<dd className="mt-0.5 text-[11.5px] text-slate-500">
								{stat.detail}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
};

export default Hero;
