import type { NavLink, Project, Role, SkillGroup, Stat } from '../types';

export const profile = {
	name: 'Marcus Sostak',
	initials: 'MS',
	headline: 'Software Engineer & AI Researcher',
	school: 'University of South Carolina',
	degree: 'B.S. Computer Science, AI Concentration · Minor in Mathematics',
	graduation: 'May 2028',
	location: 'Columbia, SC',
	email: 'marcuss2106@gmail.com',
	github: 'https://github.com/Marcuss2106',
	githubHandle: 'Marcuss2106',
	linkedin: 'https://www.linkedin.com/in/marcus-sostak/',
	resume: '/Marcus_Sostak_Resume.pdf',
	clearance: 'Active Secret Clearance',
	availability: 'Open to Summer 2027 SWE / ML internships',
};

export const roleRotation = [
	'AI research intern',
	'full-stack engineer',
	'computer vision tinkerer',
	'systems programmer',
	'hackathon winner',
];

export const navLinks: NavLink[] = [
	{ id: 'home', title: 'Home', index: '01' },
	{ id: 'about', title: 'About', index: '02' },
	{ id: 'experience', title: 'Experience', index: '03' },
	{ id: 'work', title: 'Work', index: '04' },
	{ id: 'stack', title: 'Stack', index: '05' },
	{ id: 'contact', title: 'Contact', index: '06' },
];

export const stats: Stat[] = [
	{ value: '3.92', label: 'GPA', detail: 'CS + Math, class of 2028' },
	{ value: '1st', label: 'GridStorm', detail: 'Hackathon place, 2026' },
	{ value: '$250K+', label: 'Grant project', detail: 'Research platform shipped' },
	{ value: '2', label: 'Exec roles', detail: 'AI/ML Club & KTP' },
];

export const heroTerminal = [
	{ prompt: 'whoami', output: 'marcus — cs @ south carolina, ai concentration' },
	{ prompt: 'cat focus.txt', output: 'computer vision · full-stack · applied ML' },
	{ prompt: 'git log --oneline -1', output: 'feat: 1st place @ gridstorm hackathon' },
	{ prompt: 'clearance --status', output: 'active secret' },
];

export const about = {
	lede: "I like problems where the model is only half the work — the other half is shipping it somewhere real.",
	paragraphs: [
		"I'm a Computer Science student at the University of South Carolina, concentrating in Artificial Intelligence with a Mathematics minor. Most of what I build lives at the seam between machine learning and the systems that have to serve it: detection pipelines that need sub-second latency, research platforms that elementary schoolers actually log into, backends that stay maintainable after the demo is over.",
		"This past summer I was a Research Intern at the Applied Research Laboratory for Intelligence and Security (ARLIS) at the University of Maryland, where I designed an AI-aware enterprise governance framework and a standards-aligned evaluation schema for scoring government models on robustness, OPSEC risk, prompt-injection susceptibility, and bias. Before that I spent a year as an Undergraduate Research Assistant building and refactoring a grant-funded educational platform used by local elementary schools.",
		"Outside of work I'm Vice President of the Gamecock AI/ML Club and Infrastructure Chair for Kappa Theta Pi. When I'm away from a keyboard I'm usually on a climbing wall — which is also how one of my computer vision projects got started.",
	],
	facts: [
		{ label: 'Based in', value: 'Columbia, SC' },
		{ label: 'Studying', value: 'CS (AI) + Math' },
		{ label: 'Graduating', value: 'May 2028' },
		{ label: 'Clearance', value: 'Active Secret' },
		{ label: 'Currently', value: 'Open to 2027 internships' },
		{ label: 'Off-hours', value: 'Bouldering & route setting' },
	],
};

export const roles: Role[] = [
	{
		period: 'May 2026 — Aug 2026',
		title: 'Research Intern',
		org: 'ARLIS, University of Maryland',
		location: 'College Park, MD',
		kind: 'research',
		summary:
			'Applied Research Laboratory for Intelligence and Security. Worked on responsible AI adoption for a federal agency.',
		highlights: [
			'Designed an AI-aware enterprise governance framework integrating AI/ML considerations into decision rights, data governance, and risk management across 8+ domains.',
			'Built a portfolio of 10+ assessed AI use cases, mapping real operational friction points to AI-assisted workflows.',
			'Developed a standards-aligned evaluation schema scoring 3 government models on task performance, robustness, data/OPSEC risk, prompt-injection susceptibility, and bias/harm.',
			'Authored Responsible AI Adoption Recommendations and an implementation roadmap for agency leadership.',
		],
		tags: ['AI Governance', 'Model Evaluation', 'Risk Analysis', 'Technical Writing'],
	},
	{
		period: 'May 2025 — May 2026',
		title: 'Undergraduate Research Assistant',
		org: 'University of South Carolina',
		location: 'Columbia, SC',
		kind: 'research',
		summary:
			'Wordification — an educational web platform used by local elementary schools for interactive word-based learning.',
		highlights: [
			'Developed and maintained the platform on RedwoodJS, React, GraphQL, and PostgreSQL.',
			'Refactored legacy frontend and backend components, removing 1,000+ lines of redundant code and improving stability and deployment reliability.',
			'Implemented automated CI-integrated preview environments, cutting code review turnaround time by ~50% and reducing post-deployment bugs.',
			'Collaborated with a faculty mentor and 4 developers on a $250K+ grant-funded project, running Agile sprints in Trello.',
		],
		tags: ['React', 'TypeScript', 'RedwoodJS', 'GraphQL', 'PostgreSQL', 'CI/CD'],
		url: 'https://wordification.scholastechnology.com/',
	},
	{
		period: '2025 — Present',
		title: 'Vice President',
		org: 'Gamecock AI/ML Club',
		location: 'University of South Carolina',
		kind: 'leadership',
		summary:
			'Leading a student community around applied machine learning — workshops, project teams, and competition prep.',
		highlights: [
			'Organize technical workshops and hands-on ML project groups for students across experience levels.',
			'Also serve as Infrastructure Chair for Kappa Theta Pi, the professional technical fraternity, maintaining the chapter web stack.',
		],
		tags: ['Leadership', 'Workshops', 'Community'],
	},
];

export const projects: Project[] = [
	{
		slug: 'polepad',
		title: 'Polepad AI',
		blurb: 'Utility pole inspection platform — 1st place, GridStorm Hackathon.',
		description:
			'An end-to-end field inspection system: a Godot Android client captures pole photos and posts them to a FastAPI backend that fuses three models in a single request. PaddleOCR (PP-OCRv5) reads the pole ID plate across original and CLAHE-enhanced variants with per-character confidence voting, a fine-tuned YOLOv26 detector identifies pole type and hardware, and a segmentation model measures vegetation encroachment by mask-overlap ratio against each pole bounding box. Outputs become structured JSON asset records with uncertainty surfaced field by field.',
		year: '2026',
		accolade: '1st Place · GridStorm Hackathon',
		metrics: [
			{ value: '0.84', label: 'mAP@0.5' },
			{ value: '<1s', label: 'inference latency' },
			{ value: '−65%', label: 'cold start' },
			{ value: '1.5K+', label: 'labeled images' },
		],
		tags: ['Python', 'YOLOv26', 'PaddleOCR', 'FastAPI', 'Godot', 'Android'],
		githubUrl: 'https://github.com/Marcuss2106/gridstorm-polepad-ai',
		featured: true,
	},
	{
		slug: 'dialect',
		title: 'Dialect Classifier App',
		blurb: 'Full-stack pipeline collecting labeled speech for a dialect-aware TTS model.',
		description:
			'A React frontend on Vercel paired with a Dockerized FastAPI backend on Render. Captures microphone audio plus speaker metadata, persists it through Supabase, and exposes REST services designed to slot in preprocessing and inference later. Built to support 1,000+ labeled training samples with explicit user consent disclosures.',
		year: '2026',
		imageUrl: '/accentme.png',
		metrics: [
			{ value: '1K+', label: 'sample capacity' },
			{ value: '2', label: 'deploy targets' },
		],
		tags: ['React', 'FastAPI', 'Docker', 'Supabase', 'Render', 'Vercel'],
		githubUrl: 'https://github.com/Marcuss2106/dialect-classification-app',
		liveUrl: 'https://dialect-classification-app.vercel.app/',
		featured: true,
	},
	{
		slug: 'holds',
		title: 'Climbing Hold Detection',
		blurb: 'CNN + YOLO pipeline that finds and classifies indoor climbing holds.',
		description:
			'A PyTorch CNN classifies 6 indoor hold types, trained on 60,000 samples produced by an end-to-end pipeline that downloads route footage, crops holds from YOLO annotations, and pads them to 128×128. A YOLOv11 detector handles localization at 30 FPS, with confusion matrices and epoch plots used to check robustness across gym lighting and angles.',
		year: '2026',
		imageUrl: '/climbing_holds.jpg',
		metrics: [
			{ value: '92%', label: 'detection accuracy' },
			{ value: '30 FPS', label: 'video throughput' },
			{ value: '60K', label: 'training samples' },
		],
		tags: ['PyTorch', 'YOLOv11', 'CUDA', 'Computer Vision', 'Matplotlib'],
		githubUrl:
			'https://github.com/Marcuss2106/indoor-climbing-gym-hold-classification',
		liveUrl:
			'https://www.linkedin.com/posts/marcus-sostak_computervision-deeplearning-machinelearning-activity-7415193765575061504-R3oV',
	},
	{
		slug: 'insureflow',
		title: 'InsureFlow AI',
		blurb: 'Damage triage prototype built at Palmetto Hacks.',
		description:
			'A Next.js app backed by Vercel Postgres and a FastAPI service that runs Azure AI Vision over claim photos, then applies transparent rule-based heuristics to produce a damage type, severity band, and triage path — deliberately explainable rather than a black-box decision engine. Includes PDF policy parsing and Leaflet mapping for claim geography.',
		year: '2026',
		snippet: {
			caption: 'POST /analyze',
			lines: [
				'damage_type   : "hail_impact"',
				'severity_band : "moderate"',
				'triage_path   : "adjuster_review"',
				'confidence    : 0.71',
			],
		},
		tags: ['Next.js', 'TypeScript', 'FastAPI', 'Azure AI Vision', 'Postgres', 'Leaflet'],
		githubUrl: 'https://github.com/Marcuss2106/palmetto-hacks-insure-flow-ai',
		liveUrl: 'https://palmetto-hacks-insure-flow-ai.vercel.app',
	},
	{
		slug: 'mmap',
		title: 'mmap_util',
		blurb: 'C++ utility for memory-mapped file surgery.',
		description:
			'A compact POSIX systems project: create and fill files, insert bytes at an arbitrary offset with correct shifting, and append from stdin — all through mmap, ftruncate, and msync. Binary-safe, large-file friendly, and built around careful resource cleanup and offset arithmetic.',
		year: '2026',
		snippet: {
			caption: 'bash',
			lines: [
				'$ bin/mmap_util create data.bin A 1024',
				'$ echo -n "hell" | bin/mmap_util \\',
				'      insert data.bin 100 4',
				'$ hexdump -C data.bin | head -1',
			],
		},
		tags: ['C++17', 'POSIX', 'mmap', 'Make', 'Systems'],
		githubUrl: 'https://github.com/Marcuss2106/memory-mapped-file-manipulation',
	},
	{
		slug: 'localm',
		title: 'LocaLM',
		blurb: 'Run and chat with local language models — built in 24 hours.',
		description:
			'A student-led startup sprint: a desktop-friendly interface for running custom language models entirely on your own machine, with no external API dependency. Built end to end in a single 24-hour push.',
		year: '2025',
		imageUrl: '/localm.png',
		tags: ['React', 'Flask', 'PyTorch', 'Tailwind CSS'],
		githubUrl: 'https://github.com/MichStew/locaLM',
		liveUrl: 'https://localm-de7priduj-marcuss2106s-projects.vercel.app/',
	},
	{
		slug: 'common-voice',
		title: 'Common Voice EDA',
		blurb: 'What a million speech samples actually look like.',
		description:
			"An exploratory analysis of Mozilla's Common Voice dataset covering 1,010,000+ English samples across 251 accents. Surfaced heavy representation skew — the top 3 accents account for 72.65% of samples — and produced visualizations of age, gender, accent, and sentence-length distributions to inform balancing before anyone treats the set as representative.",
		year: '2025',
		snippet: {
			caption: 'accent representation',
			lines: [
				'samples          1,010,000+',
				'accents                 251',
				'top 3 accents  ██████████████  72.65%',
				'other 248      █████            27.35%',
			],
		},
		metrics: [
			{ value: '1.01M', label: 'samples analyzed' },
			{ value: '251', label: 'accents' },
			{ value: '72.65%', label: 'top-3 skew' },
		],
		tags: ['Python', 'pandas', 'Seaborn', 'Jupyter'],
		githubUrl: 'https://github.com/Marcuss2106/common-voice-eda',
	},
	{
		slug: 'gtzan',
		title: 'GTZAN Linear Classifiers',
		blurb: 'Perceptron and Adaline from scratch on audio features.',
		description:
			'Three linear classifiers implemented by hand to study learning dynamics and convergence behavior on 1,000+ audio feature samples, with 7+ visualizations comparing accuracy and decision-boundary precision.',
		year: '2025',
		imageUrl: '/full_figure.png',
		invertImage: true,
		tags: ['Python', 'NumPy', 'pandas', 'Matplotlib', 'Jupyter'],
		githubUrl: 'https://github.com/Marcuss2106/gtzan-classification',
	},
];

export const skillGroups: SkillGroup[] = [
	{
		name: 'Languages',
		hint: 'What I write in',
		items: ['Python', 'TypeScript', 'C++', 'Java', 'JavaScript', 'SQL', 'C'],
	},
	{
		name: 'AI / ML',
		hint: 'Training and serving models',
		items: [
			'PyTorch',
			'Ultralytics YOLO',
			'PaddleOCR',
			'scikit-learn',
			'NumPy',
			'pandas',
			'Matplotlib',
			'Seaborn',
		],
	},
	{
		name: 'Web & APIs',
		hint: 'Getting it in front of people',
		items: [
			'React',
			'Next.js',
			'RedwoodJS',
			'FastAPI',
			'Flask',
			'GraphQL',
			'REST',
			'Tailwind CSS',
		],
	},
	{
		name: 'Data',
		hint: 'Where it all lives',
		items: ['PostgreSQL', 'MySQL', 'Supabase', 'Vercel Postgres'],
	},
	{
		name: 'Infra & Tools',
		hint: 'How it ships',
		items: ['Docker', 'Git', 'Linux', 'CI/CD', 'AWS S3', 'Render', 'Vercel', 'Jupyter'],
	},
	{
		name: 'Coursework',
		hint: 'Formal grounding',
		items: [
			'Data Structures & Algorithms',
			'Operating Systems',
			'Computer Architecture',
			'Software Engineering',
			'Advanced Programming (C++)',
		],
	},
];

export const marqueeItems = [
	'Python',
	'PyTorch',
	'React',
	'TypeScript',
	'FastAPI',
	'YOLO',
	'C++',
	'Docker',
	'PostgreSQL',
	'GraphQL',
	'Next.js',
	'Linux',
	'AWS',
	'PaddleOCR',
	'Tailwind',
	'Supabase',
];
