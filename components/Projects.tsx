
import React from 'react';
import type { Project } from '../types';
import GithubIcon from './icons/GithubIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import GlowCard from './GlowCard';

const projectData: Project[] = [
	{
		title: 'Climbing Gym Hold Detection',
		description:
			'Developed a computer vision model to identify and classify climbing holds in gym images. Utilized YOLOv11 for object detection and Python for image processing, achieving high accuracy in diverse lighting and angle conditions.',
		imageUrl: '/climbing_holds.jpg',
		tags: ['PyTorch', 'YOLOv11', 'Python', 'Computer Vision', 'Matplotlib'],
		githubUrl:
			'https://github.com/Marcuss2106/indoor-climbing-gym-hold-classification',
		liveUrl:
			'https://www.linkedin.com/posts/marcus-sostak_computervision-deeplearning-machinelearning-activity-7415193765575061504-R3oV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFGvyaMBNmQASborZQ1qmZGZF6O7YtG7IJA',
	},
	{
		title: 'Dialect Classifier App',
		description:
			'Deployed a full-stack web app for real-time dialect classification, capturing microphone input and metadata. Built a data collection pieline supporting 1000+ potential ML training samples, and a modular backend architecture containg preprocessing and feature extraction for future AI integration.',
		imageUrl: '/accentme.png',
		tags: [
			'React',
			'Python',
			'FastAPI',
			'Docker',
			'Supabase',
			'Render',
			'PyTorch',
		],
		githubUrl: 'https://github.com/Marcuss2106/dialect-classification-app',
		liveUrl: 'https://dialect-classification-app.vercel.app/',
	},
	{
		title: 'LocaLM',
		description:
			'Developed a student-led startup in 24 hours for a local language model application enabling users to run and interact with custom models on their own machines without relying on external APIs.',
		imageUrl: '/localm.png',
		tags: ['React', 'PyTorch', 'Tailwind CSS', 'Flask'],
		githubUrl: 'https://github.com/MichStew/locaLM',
		liveUrl: 'https://localm-de7priduj-marcuss2106s-projects.vercel.app/',
	},
    {
        title: 'Common Voice Exploratory Dataset Analysis',
        description:
            'Conducted an exploratory data analysis on Mozilla\'s Common Voice dataset to extract insights on speaker demographics and accent distribution. Utilized data visualization techniques to present findings that inform future data collection strategies for improved model training.',
        imageUrl: '/CV_Logo.png',
        tags: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'Jupyter'],
        githubUrl: 'https://github.com/Marcuss2106/common-voice-eda',
    },
	{
		title: 'GTZAN Binary Classification with Linear Models',
		description:
			'Implemented three linear machine learning classifiers to investigate learning dynamics and convergence behavior. Analayzed 1000+ audio feature samples and produced 7+ visualizations informing insights on model accuracy and boundary precision for future audio classifcation.',
		imageUrl: '/full_figure.png',
		tags: ['Python', 'Pandas', 'Matplotlib', 'Numpy', 'Jupyter'],
		githubUrl: 'https://github.com/Marcuss2106/gtzan-classification',
	},
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="scroll-mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-12">Projects</h2>
        <div className="grid grid-cols-1 gap-8">
            {projectData.map((project, index) => (
                <GlowCard key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-2/5 shrink-0">
                             <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="h-48 w-full object-cover md:h-full" 
                                loading="lazy"
                             />
                        </div>
                        <div className="p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                                <p className="text-slate-400 text-sm">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold text-purple-300 bg-purple-400/10 px-2 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-6">
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 z-20">
                                        <GithubIcon className="w-5 h-5" />
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 z-20">
                                        <ExternalLinkIcon className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </GlowCard>
            ))}
        </div>
    </section>
  );
};

export default Projects;
