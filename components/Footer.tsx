import React from 'react';
import { profile } from '../data/content';
import ArrowIcon from './icons/ArrowIcon';

const Footer: React.FC = () => (
	<footer className="border-t border-white/6 px-5 py-8 sm:px-8">
		<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-[12.5px] text-slate-500 sm:flex-row">
			<p>
				© {new Date().getFullYear()} {profile.name}. Built with React, Vite &
				Tailwind.
			</p>

			<div className="flex items-center gap-5">
				<a
					href={profile.github}
					target="_blank"
					rel="noopener noreferrer"
					className="transition-colors hover:text-iris-400"
				>
					Source
				</a>
				<button
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="group inline-flex items-center gap-1.5 transition-colors hover:text-iris-400"
				>
					Back to top
					<ArrowIcon className="h-3.5 w-3.5 -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
				</button>
			</div>
		</div>
	</footer>
);

export default Footer;
