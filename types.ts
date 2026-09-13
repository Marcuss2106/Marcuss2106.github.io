export interface NavLink {
	id: string;
	title: string;
	index: string;
}

export interface Role {
	period: string;
	title: string;
	org: string;
	location: string;
	summary: string;
	highlights: string[];
	tags: string[];
	url?: string;
	kind: 'research' | 'leadership';
}

export interface Project {
	slug: string;
	title: string;
	blurb: string;
	description: string;
	year: string;
	accolade?: string;
	imageUrl?: string;
	/** Flips a light-background figure to read correctly on the dark theme. */
	invertImage?: boolean;
	/** Mono one-liner shown in place of a screenshot. */
	snippet?: { caption: string; lines: string[] };
	metrics?: { value: string; label: string }[];
	tags: string[];
	githubUrl?: string;
	liveUrl?: string;
	featured?: boolean;
}

export interface SkillGroup {
	name: string;
	hint: string;
	items: string[];
}

export interface Stat {
	value: string;
	label: string;
	detail: string;
}
