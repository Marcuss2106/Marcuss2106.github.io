
export interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  liveUrl?: string;
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
}
