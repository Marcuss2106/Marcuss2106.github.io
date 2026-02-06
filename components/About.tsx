import React from 'react';

const About: React.FC = () => {
	return (
		<section id="about" className="scroll-mt-24">
			<div className="flex flex-col lg:flex-row mt-12 items-start lg:items-center gap-12">
				<div className="w-full lg:w-2/3">
					<h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
						Hi, I'm Marcus Sostak
					</h1>
					<h2 className="mt-2 text-lg sm:text-xl font-medium text-purple-400 tracking-tight">
						Undergraduate Research Assistant
					</h2>
					<h3 className="text-md font-semibold text-purple-300 tracking-tight">
						University of South Carolina, Columbia
					</h3>
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
			<p className="mt-12 text-left tracking-tight">
				<span className="text-purple-200 text-lg text-center font-bold">
					I build scalable web applications and enjoy solving systems
					problems.
				</span>
				<br />
				<br />
				I'm currently pursuing my Bachelor's degree in Computer Science
				at the University of South Carolina, where I work as an
				Undergraduate Research Assistant for a word-learning platform used by elementary students.
				My research focuses on enhancing user engagement and optimizing
				system performance through innovative web technologies.
				<br />
				<br />
				When I'm not coding, I love climbing, meeting new people, and exploring new
				technologies!
			</p>
		</section>
	);
};

export default About;
