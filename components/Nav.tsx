import React, { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/content';
import { useActiveSection, useScrolled } from '../hooks/useReveal';

const sectionIds = navLinks.map((l) => l.id);

const Nav: React.FC = () => {
	const active = useActiveSection(sectionIds);
	const scrolled = useScrolled(40);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMenuOpen(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	const go = (id: string) => {
		setMenuOpen(false);
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
				<div
					className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
						scrolled
							? 'glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)]'
							: 'border border-transparent bg-transparent'
					}`}
				>
					<a
						href="#home"
						onClick={(e) => {
							e.preventDefault();
							go('home');
						}}
						className="group flex items-center gap-2.5"
					>
						<span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-iris-500 to-aqua-400 text-sm font-bold text-ink-950 shadow-[0_0_22px_-4px_rgba(139,92,246,0.9)] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
							{profile.initials}
						</span>
						<span className="hidden font-display text-sm font-semibold tracking-tight text-white sm:block">
							{profile.name}
						</span>
					</a>

					<nav className="hidden items-center gap-1 lg:flex">
						{navLinks.map((link) => {
							const isActive = active === link.id;
							return (
								<a
									key={link.id}
									href={`#${link.id}`}
									onClick={(e) => {
										e.preventDefault();
										go(link.id);
									}}
									className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
										isActive
											? 'text-white'
											: 'text-slate-400 hover:text-slate-100'
									}`}
								>
									{isActive && (
										<span className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-inset ring-white/10" />
									)}
									<span className="relative flex items-center gap-1.5">
										<span className="font-mono text-[10px] text-iris-400/70">
											{link.index}
										</span>
										{link.title}
									</span>
								</a>
							);
						})}
					</nav>

					<div className="flex items-center gap-2">
						<a
							href={profile.resume}
							target="_blank"
							rel="noopener noreferrer"
							className="hidden rounded-full bg-white/8 px-4 py-1.5 text-[13px] font-medium text-white ring-1 ring-inset ring-white/12 transition-all duration-300 hover:bg-white/14 hover:ring-iris-400/50 sm:block"
						>
							Résumé
						</a>

						<button
							type="button"
							onClick={() => setMenuOpen((v) => !v)}
							aria-label={menuOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={menuOpen}
							className="grid h-9 w-9 place-items-center rounded-full text-slate-300 ring-1 ring-inset ring-white/10 transition-colors hover:text-white lg:hidden"
						>
							<span className="relative block h-3.5 w-4">
								<span
									className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
										menuOpen ? 'top-1.5 rotate-45' : 'top-0'
									}`}
								/>
								<span
									className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
										menuOpen ? 'opacity-0' : 'opacity-100'
									}`}
								/>
								<span
									className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
										menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
									}`}
								/>
							</span>
						</button>
					</div>
				</div>
			</header>

			{/* Mobile sheet */}
			<div
				className={`fixed inset-0 z-40 lg:hidden ${
					menuOpen ? 'visible' : 'invisible'
				}`}
			>
				<div
					className={`absolute inset-0 bg-ink-950/80 backdrop-blur-xl transition-opacity duration-400 ${
						menuOpen ? 'opacity-100' : 'opacity-0'
					}`}
					onClick={() => setMenuOpen(false)}
				/>
				<nav className="relative flex h-full flex-col justify-center gap-1 px-8">
					{navLinks.map((link, i) => (
						<a
							key={link.id}
							href={`#${link.id}`}
							onClick={(e) => {
								e.preventDefault();
								go(link.id);
							}}
							style={{ transitionDelay: menuOpen ? `${80 + i * 45}ms` : '0ms' }}
							className={`flex items-baseline gap-4 border-b border-white/6 py-4 font-display text-3xl font-semibold tracking-tight transition-all duration-500 ${
								menuOpen
									? 'translate-y-0 opacity-100'
									: 'translate-y-4 opacity-0'
							} ${active === link.id ? 'text-white' : 'text-slate-400'}`}
						>
							<span className="font-mono text-xs text-iris-400">
								{link.index}
							</span>
							{link.title}
						</a>
					))}
					<a
						href={profile.resume}
						target="_blank"
						rel="noopener noreferrer"
						style={{ transitionDelay: menuOpen ? '350ms' : '0ms' }}
						className={`mt-8 rounded-full bg-gradient-to-r from-iris-500 to-aqua-400 py-3 text-center font-semibold text-ink-950 transition-all duration-500 ${
							menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
						}`}
					>
						Download Résumé
					</a>
				</nav>
			</div>
		</>
	);
};

export default Nav;
