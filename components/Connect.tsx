
import React from 'react';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import EmailIcon from './icons/EmailIcon';

const socialLinks = [
	{
		name: 'GitHub',
		url: 'https://github.com/Marcuss2106',
		icon: GithubIcon,
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/marcus-sostak/',
		icon: LinkedinIcon,
	},
	{
		name: 'Email',
		url: 'mailto:marcuss2106@gmail.com',
		icon: EmailIcon,
	},
];

const Connect: React.FC = () => {
  return (
    <section id="connect" className="scroll-mt-24 text-center py-12">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4">
        Connect With Me!
      </h2>
      <p className="max-w-md mx-auto mb-8 text-slate-400">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out!
      </p>
      <div className="flex justify-center items-center space-x-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="text-slate-400 transition-all duration-300 hover:text-purple-400 hover:scale-110"
          >
            <link.icon className="w-8 h-8" />
          </a>
        ))}
      </div>
      <footer className="mt-20 text-sm text-slate-500">
        <p>Built with React & Tailwind CSS.</p>
      </footer>
    </section>
  );
};

export default Connect;
