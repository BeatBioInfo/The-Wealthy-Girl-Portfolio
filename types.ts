
export interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Project {
  title: string;
  description: string;
  link: string;
  techStack: string[];
  type: 'github' | 'bitbucket' | 'n8n';
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: 'code' | 'tool' | 'bug' | 'chart';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: 'linkedin' | 'github' | 'email' | 'phone';
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
}
