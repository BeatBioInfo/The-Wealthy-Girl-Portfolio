

import { Job, Project, SkillCategory, SocialLink, EducationItem } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
  { platform: 'GitHub', url: '#', icon: 'github' },
  { platform: 'Email', url: 'mailto:oshanimioluwakemi@gmail.com', icon: 'email' },
  { platform: 'Phone', url: 'tel:+2347043269241', icon: 'phone' },
];

export const PROFILE = {
  name: "Oluwakemisola Beatrice Oshanimi",
  role: "Quality Assurance Engineer",
  tagline: "Exterminating bugs & optimizing performance before production.",
  summary: "Results-driven Software Quality Assurance Engineer with a strong record of enhancing software quality and user satisfaction by reducing defects and strengthening reliability. Experienced in designing and implementing robust test plans and automation frameworks (Cypress) to streamline processes and ensure early bug detection.",
  avatar: "https://pbs.twimg.com/profile_images/1708729712481050626/hlYrj8xY_400x400.jpg",
  // TODO: Replace this with your actual Google Drive PDF link (ensure the file is set to "Anyone with the link" can view)
  resumeUrl: "https://drive.google.com/file/d/1mWRPmh5XrLU27ieVpBAYEXtyH9VtP5qn/view?usp=sharing",
};

export const FUN_FACTS = [
  {
    topic: "Literary Interest",
    title: "Thriller Enthusiast",
    description: "I haven't read much yet, but I am falling in love with thriller novels. I absolutely adore the mental gymnastics required to solve the mystery before the detective does.",
    icon: "book" as const
  },
  {
    topic: "Creative Outlet",
    title: "Nature & Art",
    description: "I enjoy taking walks on good days to clear my mind, and I've recently started painting to capture those moments.",
    meta: "Artwork display available on request",
    icon: "palette" as const
  },
  {
    topic: "Tech Curiosity",
    title: "Podcasts & AI",
    description: "I'm constantly tuning into podcasts and exploring the evolving world of AI, staying curious about what's next in tech.",
    icon: "headphones" as const
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Appium Mobile Automation",
    description: "Developed a comprehensive mobile test automation framework using Java and Appium to validate functionality across Android and iOS devices.",
    link: "https://github.com/BeatBioInfo", // Fallback link if specific repo isn't known yet
    techStack: ["Appium", "Java", "TestNG", "Android", "iOS"],
    type: "github",
    stats: [
        { label: "Devices", value: "12+" },
        { label: "Coverage", value: "85%" }
    ]
  },
  {
      title: "Test Plan Documentation",
      description: "Designed detailed test strategy and plan documentation ensuring 100% requirement traceability and streamlined QA processes for cross-functional teams.",
      link: "#",
      techStack: ["Jira", "TestRail", "Confluence", "Strategy"],
      type: "n8n", // Using a generic icon type for docs
      stats: [
          { label: "Docs", value: "50+" },
          { label: "Clarity", value: "100%" }
      ]
  },
  {
    title: "Cypress Book Appointment Test",
    description: "Automated end-to-end testing suite for appointment scheduling workflows using Cypress to ensure seamless user booking experiences.",
    link: "https://github.com/BeatBioInfo/cypress_bookAnappointmentTest",
    techStack: ["Cypress", "JavaScript", "E2E Testing"],
    type: "github",
    stats: [
        { label: "Test Cases", value: "45+" },
        { label: "Pass Rate", value: "99%" }
    ]
  },
  {
    title: "Playwright Appointment Suite",
    description: "Robust browser automation framework leveraging Playwright to validate booking functionality across multiple browser environments.",
    link: "https://github.com/BeatBioInfo/playwright_bookAnappointmentTestSuite",
    techStack: ["Playwright", "TypeScript", "Cross-browser"],
    type: "github",
    stats: [
        { label: "Browsers", value: "3" },
        { label: "Execution", value: "< 4m" }
    ]
  },
  {
    title: "Mima BDD Project",
    description: "Behavior-Driven Development framework implementation using Cucumber to align technical tests with business requirements.",
    link: "https://bitbucket.org/beatrice_qa/mimabddproject/src",
    techStack: ["Cucumber", "BDD", "Java"],
    type: "bitbucket",
    stats: [
        { label: "Scenarios", value: "30+" },
        { label: "Coverage", value: "95%" }
    ]
  },
  {
    title: "n8n Workflow Automation",
    description: "Custom automated workflow integrations using n8n to streamline data synchronization and operational processes.",
    link: "#", // Placeholder as no link was provided
    techStack: ["n8n", "Task Workflow Automation"],
    type: "n8n",
    stats: [
        { label: "Workflows", value: "8" },
        { label: "Integrations", value: "5" }
    ]
  }
];

export const EXPERIENCE: Job[] = [
  {
    company: "OZE",
    role: "Quality Assurance Engineer",
    location: "Ghana",
    period: "03/2024 – Present",
    description: "Expertise in mobile app (Android & iOS) and website testing reducing bug resolution time by 30%.",
    achievements: [
      "Partnered with developers to resolve bugs, reducing average resolution time by 30%.",
      "Designed automation scripts for web and API layers, cutting manual testing cycles by 40%.",
      "Tested AI-powered payment scraping and analytics solutions ensuring accuracy and compliance.",
      "Updated Java-based Appium framework for mobile test automation, improving efficiency by 25%.",
      "Executed rigorous testing of new features across Oze website and mobile applications."
    ],
    techStack: ["Appium", "Java", "Android", "iOS", "API Testing"]
  },
  {
    company: "Amdari",
    role: "Quality Assurance Engineer (Contract)",
    location: "USA",
    period: "05/2024 – 06/2024",
    description: "Led the testing of the Amdari website, identifying and reporting 90% of critical bugs pre-release.",
    achievements: [
      "Spearheaded end-to-end automation with Cypress & BDD, cutting pre-release defects by 35%.",
      "Conducted performance testing using JMeter and K6 Grafana, enhancing response time by 30%.",
      "Integrated test execution into CI/CD pipelines via GitHub Actions.",
      "Provided detailed test reports leading to a 15% improvement in system performance."
    ],
    techStack: ["Cypress", "BDD", "JMeter", "K6", "GitHub Actions"]
  },
  {
    company: "Lendsqr",
    role: "Product Quality Assurance Engineer",
    location: "Nigeria",
    period: "01/2023 – 02/2024",
    description: "Demonstrated exceptional quality performance by consistently achieving >90% on unique metrics.",
    achievements: [
      "Spearheaded QA process improvements for Lendsqr Pecunia admin console.",
      "Executed end-to-end testing on Direct Debit (eMandate), validating integrations with NIBSS.",
      "Achieved >90% reduction in regression defects through a thorough regression testing plan.",
      "Completed over 100+ functional testing cycles for front-end assets using AWS CloudWatch.",
      "Transitioned QA from 'manual only' to Agile Testing techniques."
    ],
    techStack: ["SQL", "Postman", "AWS CloudWatch", "Scrum", "Regression"]
  },
  {
    company: "Quantori",
    role: "Quality Assurance Trainee",
    location: "USA",
    period: "04/2022 – 10/2022",
    description: "Collaborated with the QA team testing a new R&D web product.",
    achievements: [
      "Designed and developed 100+ test cases and acceptance sheets.",
      "Completed multiple projects with strict deadlines: smoke tests, execution, and bug reporting.",
      "Identified and raised bugs to improve clients’ experience."
    ],
    techStack: ["Test Design", "Smoke Testing", "Bug Tracking"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Automation & Frameworks",
    icon: 'code',
    skills: ["Cypress", "Selenium", "Appium", "Playwright", "TestNG", "BDD", "Java", "JavaScript"]
  },
  {
    title: "Testing & Performance",
    icon: 'chart',
    skills: ["Manual Testing", "API Testing", "JMeter", "K6 Grafana", "Postman", "Functional Testing", "Regression", "Smoke Testing"]
  },
  {
    title: "Tools",
    icon: 'tool',
    skills: ["Git", "Jira", "AWS CloudWatch", "SQL (PostgreSQL)", "Visual Studio Code", "Android Studio", "ClickUp", "Maestro"]
  },
  {
    title: "Core Competencies",
    icon: 'bug',
    skills: ["Root Cause Analysis", "Test Strategy", "SDLC/STLC", "Agile/Scrum", "Defect Lifecycle"]
  }
];

export const STATS = [
  { label: "Bug Reduction", value: 30, unit: "%" },
  { label: "Test Efficiency", value: 25, unit: "%" },
  { label: "Critical Bugs Found", value: 90, unit: "%" },
  { label: "Regression Drop", value: 90, unit: "%" },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "B.Sc. Computer Science",
    institution: "University of Lagos",
    location: "Lagos, Nigeria",
    year: "2016 - 2021"
  }
];
