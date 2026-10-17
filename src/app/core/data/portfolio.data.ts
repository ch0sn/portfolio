import { LocalizedText } from '../i18n/localize';

/**
 * Single source for profile and project facts.
 * UI chrome (navigation, buttons, meta labels) lives in `core/i18n/translations.ts`.
 *
 * TODO(owner): fill the gaps below. Do not invent numbers, dates, or employers.
 * - email
 * - LinkedIn URL
 * - replace public/cv/sontek-daniel-cho-cv.pdf and set cv.isPlaceholder to false
 * - BMW: role, location, and dates
 * - graduation date for the Friedberg bachelor's (degree is confirmed, the date is not)
 * - screenshots in public/projects/ and any live-demo URLs
 * - GTKEO: a public-safe description and your role
 * - your role on the university team project
 * - work arrangement (on-site, hybrid, remote), if you want it stated
 * - canonical site URL, once the domain is known
 */

export type ProjectId = 'kin-graph' | 'kostenplan' | 'gtkeo' | 'uni-web';

export interface Highlight {
  readonly id: string;
  readonly label: LocalizedText;
  readonly value: LocalizedText;
}

export interface Education {
  readonly id: string;
  readonly institution: LocalizedText;
  readonly program: LocalizedText;
  readonly period: LocalizedText;
  readonly note: LocalizedText | null;
}

export interface Experience {
  readonly id: string;
  readonly organization: string;
  readonly role: LocalizedText | null;
  readonly period: LocalizedText | null;
  readonly summary: LocalizedText;
}

export interface SkillGroup {
  readonly id: string;
  readonly label: LocalizedText;
  readonly items: readonly string[];
}

export interface Project {
  readonly id: ProjectId;
  readonly title: string;
  readonly summary: LocalizedText;
  readonly role: LocalizedText | null;
  readonly technologies: readonly string[];
  readonly githubUrl: string | null;
  readonly liveUrl: string | null;
  /** Public path. TODO(owner): add the file under public/ and set this. */
  readonly screenshot: string | null;
  readonly featured: boolean;
}

export interface Portfolio {
  readonly profile: {
    readonly name: string;
    readonly github: string;
    /** TODO(owner): professional email address. */
    readonly email: string | null;
    /** TODO(owner): LinkedIn profile URL. */
    readonly linkedin: string | null;
    readonly cv: {
      readonly href: string;
      readonly file: string;
      /** TODO(owner): replace the placeholder PDF, then set this to false. */
      readonly isPlaceholder: boolean;
    };
    readonly highlights: readonly Highlight[];
    readonly bio: readonly LocalizedText[];
    readonly education: readonly Education[];
    readonly experience: readonly Experience[];
    readonly skills: readonly SkillGroup[];
    readonly practices: readonly LocalizedText[];
    readonly lookingFor: readonly LocalizedText[];
  };
  readonly projects: readonly Project[];
}

export const portfolio: Portfolio = {
  profile: {
    name: 'Sontek Daniel Cho',
    github: 'https://github.com/ch0sn',
    email: null,
    linkedin: null,
    cv: {
      href: '/cv/sontek-daniel-cho-cv.pdf',
      file: 'public/cv/sontek-daniel-cho-cv.pdf',
      isPlaceholder: true,
    },
    highlights: [
      {
        id: 'focus',
        label: { de: 'Schwerpunkt', en: 'Focus' },
        value: { de: 'Angular, TypeScript', en: 'Angular, TypeScript' },
      },
      {
        id: 'degree',
        label: { de: 'Abschluss', en: 'Degree' },
        value: { de: 'Wirtschaftsinformatik (B.Sc.)', en: 'Wirtschaftsinformatik (B.Sc.)' },
      },
      {
        id: 'experience',
        label: { de: 'Erfahrung', en: 'Experience' },
        value: { de: 'BMW', en: 'BMW' },
      },
      {
        id: 'languages',
        label: { de: 'Sprachen', en: 'Languages' },
        value: { de: 'Deutsch, Koreanisch', en: 'German, Korean' },
      },
    ],
    bio: [
      {
        de: 'Geboren in Berlin, aufgewachsen in verschiedenen Städten in Deutschland — mit koreanischer und deutscher Kultur, zweisprachig. Die erste Zeile Code entstand 2014 in der Schule, mit HTML und CSS.',
        en: 'Born in Berlin and raised in different cities in Germany, with Korean and German culture, bilingual. My first line of code was in 2014, in school: HTML and CSS.',
      },
      {
        de: '2017 habe ich an der Universität Mannheim Wirtschaftsinformatik begonnen. Ab Oktober 2021 habe ich das Studium an der Hochschule in Friedberg fortgesetzt. Ich habe einen Bachelor in Wirtschaftsinformatik.',
        en: 'In 2017 I started Wirtschaftsinformatik (business computer science) at the University of Mannheim. From October 2021 I continued at the university of applied sciences in Friedberg. I hold a bachelor’s degree in Wirtschaftsinformatik.',
      },
      {
        de: 'Ich habe Berufserfahrung bei BMW. Besonders interessiert mich Software, die Menschen hilft, über das eigene Leben nachzudenken.',
        en: 'I have professional experience at BMW. I am especially interested in software that helps people reflect on their own lives.',
      },
    ],
    education: [
      {
        id: 'friedberg',
        institution: {
          de: 'Technische Hochschule Mittelhessen, Campus Friedberg',
          en: 'Technische Hochschule Mittelhessen, Friedberg campus',
        },
        program: {
          de: 'Wirtschaftsinformatik (B.Sc.)',
          en: 'Business Computer Science, Wirtschaftsinformatik (B.Sc.)',
        },
        period: {
          de: 'ab Oktober 2021',
          en: 'from October 2021',
        },
        // TODO(owner): graduation month and year. The bachelor's degree itself is confirmed.
        note: null,
      },
      {
        id: 'mannheim',
        institution: {
          de: 'Universität Mannheim',
          en: 'University of Mannheim',
        },
        program: {
          de: 'Wirtschaftsinformatik (B.Sc.)',
          en: 'Business Computer Science, Wirtschaftsinformatik (B.Sc.)',
        },
        period: {
          de: 'Oktober 2017 – September 2021',
          en: 'October 2017 – September 2021',
        },
        note: {
          de: 'Studium hier nicht abgeschlossen, Wechsel nach Friedberg.',
          en: 'Degree not completed here; transferred to Friedberg.',
        },
      },
    ],
    experience: [
      {
        id: 'bmw',
        organization: 'BMW',
        // TODO(owner): role title, team or location, and start/end dates.
        role: null,
        period: null,
        summary: {
          de: 'Berufserfahrung bei BMW.',
          en: 'Professional experience at BMW.',
        },
      },
    ],
    skills: [
      {
        id: 'core',
        label: { de: 'Schwerpunkt', en: 'Core' },
        items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
      },
      {
        id: 'university',
        label: { de: 'Aus dem Studium', en: 'From university' },
        items: ['Java'],
      },
      {
        id: 'basics',
        label: { de: 'Grundlagen', en: 'Basics' },
        items: ['PostgreSQL', 'Docker'],
      },
    ],
    practices: [
      {
        de: 'REST-APIs in Frontends angebunden.',
        en: 'Integrated REST APIs into frontends.',
      },
    ],
    lookingFor: [
      {
        de: 'Ich suche eine Festanstellung als Frontend- oder Softwareentwickler im Rhein-Main-Gebiet (Frankfurt, Wiesbaden, Mainz). Angular und TypeScript sind mein Schwerpunkt.',
        en: 'I am looking for a permanent frontend or software developer role in the Rhein-Main area (Frankfurt, Wiesbaden, Mainz). Angular and TypeScript are my core skills.',
      },
    ],
  },
  projects: [
    {
      id: 'kin-graph',
      title: 'kin-graph',
      summary: {
        de: 'Open-Source-Webanwendung für Genealogie mit knotenbasierter Bedienung, Baumansicht, Zeitstrahl und PWA. Das Frontend ist in TypeScript geschrieben (React, Vite); der Stammbaum bleibt lokal auf dem Gerät.',
        en: 'Open-source genealogy web app with node-based interaction, a tree view, a timeline, and PWA support. The frontend is written in TypeScript (React, Vite); the tree stays on the device.',
      },
      role: { de: 'Open-Source-Projekt', en: 'Open-source project' },
      technologies: ['TypeScript', 'React', 'Vite', 'PWA'],
      githubUrl: 'https://github.com/ch0sn/kin-graph',
      // TODO(owner): live demo URL, if there is a public deployment.
      liveUrl: null,
      // TODO(owner): add public/projects/kin-graph.webp and set screenshot to '/projects/kin-graph.webp'.
      screenshot: null,
      featured: true,
    },
    {
      id: 'kostenplan',
      title: 'Kostenplan',
      summary: {
        de: 'Budget-App für Android und das Web, gebaut mit Flutter.',
        en: 'Budget app for Android and the web, built with Flutter.',
      },
      role: { de: 'Eigenes Projekt', en: 'Personal project' },
      technologies: ['Flutter', 'Android', 'Web'],
      githubUrl: 'https://github.com/ch0sn/budget-app',
      // TODO(owner): live demo URL, if the web build is public.
      liveUrl: null,
      // TODO(owner): add public/projects/kostenplan.webp and set screenshot to '/projects/kostenplan.webp'.
      screenshot: null,
      featured: true,
    },
    {
      id: 'gtkeo',
      title: 'GTKEO',
      summary: {
        de: 'Mobile App, umgesetzt mit TypeScript. Das Repository ist privat.',
        en: 'Mobile app built with TypeScript. The repository is private.',
      },
      // TODO(owner): your role, and a public-safe description of what the app does.
      role: null,
      technologies: ['TypeScript'],
      githubUrl: null,
      // TODO(owner): live demo URL, only if a public build exists.
      liveUrl: null,
      // TODO(owner): add public/projects/gtkeo.webp if a screenshot can be shown publicly.
      screenshot: null,
      featured: false,
    },
    {
      id: 'uni-web',
      title: 'Web-Technologien',
      summary: {
        de: 'Teamprojekt aus dem Studium im Bereich Web-Technologien. Enthalten sind Seiten für Start, Anmeldung, Einschreibung und Kurse, umgesetzt mit PHP und CSS.',
        en: 'University team project in web technologies. It includes pages for a start screen, login, enrollment, and courses, built with PHP and CSS.',
      },
      role: { de: 'Teamprojekt', en: 'Team project' },
      technologies: ['PHP', 'CSS'],
      githubUrl: 'https://github.com/ch0sn/Web-App-Uni-Projekt_08',
      // TODO(owner): your role within the team, a live demo URL, and a screenshot if you want them shown.
      liveUrl: null,
      screenshot: null,
      featured: false,
    },
  ],
};
