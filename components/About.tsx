
import React from 'react';

const About: React.FC = () => {
  return (
		<section id="about" className="scroll-mt-24">
			<div className="flex flex-col lg:flex-row mt-8 items-start lg:items-center gap-12">
				<div className="w-full lg:w-2/3">
					<h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
						Hi, I'm Marcus Sostak
					</h1>
					<h2 className="mt-2 text-lg sm:text-xl font-medium text-purple-400 tracking-tight">
						Full-Stack Developer & Aspiring AI Engineer
					</h2>
					<p className="mt-6 text-slate-400">
						I'm currently an undergraduate Computer Science student
						at the University of South Carolina, Columbia interested
						in learning software development, web development, and
						artificial intelligence. I have a passion for creating
						innovative solutions and enhancing user experiences
						through technology. My goal is to become a proficient
						full-stack developer with a strong foundation in AI to
						become ready to improve the digital world by working
						with others.
					</p>
				</div>
				<div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
					<div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full p-1.5 bg-gradient-to-br from-purple-600 to-indigo-800 glow-shadow">
						<img
							src="/me.jpg"
							alt="Marcus Sostak"
							className="w-full h-full rounded-full object-cover object-top border-4 border-slate-900"
						/>
					</div>
				</div>
			</div>
		</section>
  );
};

export default About;
