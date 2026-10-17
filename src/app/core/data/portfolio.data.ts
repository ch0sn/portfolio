import { LocalizedText } from '../i18n/localize';

/**
 * Single source for profile and project facts.
 * UI chrome (navigation, buttons, meta labels) lives in `core/i18n/translations.ts`.
 *
 * TODO(owner): still unknown. Do not invent these.
 * - canonical site URL, once the domain is known
 */

export type ProjectId = 'kin-graph' | 'kostenplan' | 'realqa';

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
  readonly location: LocalizedText | null;
  readonly role: LocalizedText | null;
  readonly period: LocalizedText | null;
  readonly summary: LocalizedText;
  readonly points: readonly LocalizedText[];
}

export interface SkillGroup {
  readonly id: string;
  readonly label: LocalizedText;
  readonly items: readonly string[];
}

export interface ProjectShot {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: LocalizedText;
}

export interface Project {
  readonly id: ProjectId;
  readonly title: string;
  readonly summary: LocalizedText;
  readonly role: LocalizedText | null;
  /** Short status badge. Null when the project has no status to show. */
  readonly status: LocalizedText | null;
  readonly technologies: readonly string[];
  readonly githubUrl: string | null;
  /** Public demo. Omitted from the card when null. */
  readonly liveUrl: string | null;
  /**
   * Screenshots in gallery order. The first image is the card cover.
   * An empty list keeps the drawn cover.
   */
  readonly shots: readonly ProjectShot[];
  readonly featured: boolean;
}

export interface Portfolio {
  readonly profile: {
    readonly name: string;
    readonly location: LocalizedText;
    readonly github: string;
    readonly email: string;
    readonly linkedin: string;
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
    location: { de: 'Mainz-Kastel', en: 'Mainz-Kastel' },
    github: 'https://github.com/ch0sn',
    email: 'sontekdaniel@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/sontek-daniel-cho-548243149',
    highlights: [
      {
        id: 'place',
        label: { de: 'Standort', en: 'Based in' },
        value: { de: 'Mainz-Kastel', en: 'Mainz-Kastel' },
      },
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
        value: { de: 'BMW Group, Nintendo Europe', en: 'BMW Group, Nintendo Europe' },
      },
      {
        id: 'languages',
        label: { de: 'Sprachen', en: 'Languages' },
        value: {
          de: 'Deutsch, Koreanisch, Englisch (B2)',
          en: 'German, Korean, English (B2)',
        },
      },
    ],
    bio: [
      {
        de: 'Geboren in Berlin, aufgewachsen in verschiedenen Städten in Deutschland — mit koreanischer und deutscher Kultur. Deutsch und Koreanisch sind Muttersprachen, Englisch spreche ich auf Niveau B2. Die erste Zeile Code entstand 2014 in der Schule, mit HTML und CSS. Ich wohne in Mainz-Kastel.',
        en: 'Born in Berlin and raised in different cities in Germany, with Korean and German culture. German and Korean are my native languages, and I speak English at B2. My first line of code was in 2014, in school: HTML and CSS. I live in Mainz-Kastel.',
      },
      {
        de: 'Wirtschaftsinformatik habe ich ab 2017 an der Universität Mannheim studiert, ohne Abschluss dort. Den Bachelor (B.Sc.) habe ich an der Technischen Hochschule Mittelhessen in Friedberg gemacht, von Oktober 2021 bis September 2026. Das Abitur habe ich 2016 am Gymnasium Theresianum Mainz abgelegt.',
        en: 'I studied Wirtschaftsinformatik at the University of Mannheim from 2017, without a degree there. I completed the bachelor’s degree (B.Sc.) at Technische Hochschule Mittelhessen in Friedberg, from October 2021 to September 2026. I passed the Abitur in 2016 at Gymnasium Theresianum Mainz.',
      },
      {
        de: 'Bei der BMW Group in München war ich Praktikant und Bachelorand in der Softwareentwicklung. Bei Nintendo Europe in Frankfurt am Main habe ich Software auf Kompatibilität getestet. Besonders interessiert mich Software, die Menschen hilft, über das eigene Leben nachzudenken.',
        en: 'At BMW Group in Munich I was an intern and bachelor’s thesis student in software development. At Nintendo Europe in Frankfurt am Main I tested software for compatibility. I am especially interested in software that helps people reflect on their own lives.',
      },
    ],
    education: [
      {
        id: 'friedberg',
        institution: {
          de: 'Technische Hochschule Mittelhessen (THM), Friedberg',
          en: 'Technische Hochschule Mittelhessen (THM), Friedberg',
        },
        program: {
          de: 'Wirtschaftsinformatik (B.Sc.)',
          en: 'Business Computer Science, Wirtschaftsinformatik (B.Sc.)',
        },
        period: { de: '10/2021 – 09/2026', en: '10/2021 – 09/2026' },
        note: null,
      },
      {
        id: 'mannheim',
        institution: { de: 'Universität Mannheim', en: 'University of Mannheim' },
        program: { de: 'Wirtschaftsinformatik', en: 'Business Computer Science, Wirtschaftsinformatik' },
        period: { de: '2017 – 2021', en: '2017 – 2021' },
        note: { de: 'Studium ohne Abschluss.', en: 'Studies, no degree.' },
      },
      {
        id: 'abitur',
        institution: { de: 'Gymnasium Theresianum Mainz', en: 'Gymnasium Theresianum Mainz' },
        program: { de: 'Abitur', en: 'Abitur' },
        period: { de: '2016', en: '2016' },
        note: null,
      },
    ],
    experience: [
      {
        id: 'bmw',
        organization: 'BMW Group',
        location: { de: 'München', en: 'Munich' },
        role: {
          de: 'Praktikant / Bachelorand Software Development',
          en: 'Intern / bachelor’s thesis student, Software Development',
        },
        period: { de: '02/2025 – 04/2026', en: '02/2025 – 04/2026' },
        summary: {
          de: 'Interne Webanwendungen mit Angular und TypeScript, um Geschäftsprozesse zu automatisieren.',
          en: 'Internal web apps with Angular and TypeScript, to automate business processes.',
        },
        points: [
          {
            de: 'REST-APIs in die Frontends angebunden.',
            en: 'Integrated REST APIs into the frontends.',
          },
          {
            de: 'Mit Stakeholdern und Business Ownern gearbeitet. Scrum, Schätzungen und technische Konzepte.',
            en: 'Worked with stakeholders and business owners. Scrum, estimates, and technical concepts.',
          },
          {
            de: 'Bestehende Anwendungen weiterentwickelt, Projektmanagement-Aufgaben übernommen und neue Teammitglieder eingearbeitet. GitHub Copilot eingesetzt.',
            en: 'Developed existing applications further, took on project-management tasks, and onboarded new team members. Used GitHub Copilot.',
          },
          {
            de: 'Bachelorarbeit: eine Anwendung zur Mitarbeiterschulung von Low-Code in eine Webanwendung überführt. Der SUS-Wert stieg von 63,8 auf 91,2, die Bearbeitungszeit sank um etwa 20 %.',
            en: 'Bachelor’s thesis: moved an employee training app from low-code to a web app. The SUS score rose from 63.8 to 91.2, and processing time fell by about 20%.',
          },
        ],
      },
      {
        id: 'nintendo',
        organization: 'Nintendo Europe',
        location: { de: 'Frankfurt am Main', en: 'Frankfurt am Main' },
        role: {
          de: 'Software Compatibility Tester',
          en: 'Software Compatibility Tester',
        },
        period: {
          de: '09/2022 – 05/2023 · 04/2024 – 12/2024',
          en: '09/2022 – 05/2023 · 04/2024 – 12/2024',
        },
        summary: {
          de: 'Kompatibilitätstests, Qualitätssicherung und Dokumentation von Fehlern.',
          en: 'Compatibility testing, quality assurance, and bug documentation.',
        },
        points: [],
      },
    ],
    skills: [
      {
        id: 'core',
        label: { de: 'Schwerpunkt', en: 'Core' },
        items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'REST APIs'],
      },
      {
        id: 'university',
        label: { de: 'Aus dem Studium', en: 'From university' },
        items: ['Java'],
      },
      {
        id: 'basics',
        label: { de: 'Grundlagen', en: 'Basics' },
        items: ['SQL', 'PostgreSQL', 'Docker'],
      },
      {
        id: 'tools',
        label: { de: 'Werkzeuge', en: 'Tools' },
        items: ['Git', 'GitHub', 'Jira', 'Confluence', 'Figma'],
      },
      {
        id: 'ai',
        label: { de: 'KI-Werkzeuge', en: 'AI tools' },
        items: ['GitHub Copilot', 'Grok', 'Claude Code'],
      },
    ],
    practices: [
      {
        de: 'REST-APIs in Frontends angebunden, unter anderem bei der BMW Group.',
        en: 'Integrated REST APIs into frontends, including at BMW Group.',
      },
    ],
    lookingFor: [
      {
        de: 'Ich suche eine Festanstellung als Frontend- oder Softwareentwickler im Rhein-Main-Gebiet. Angular und TypeScript sind mein Schwerpunkt.',
        en: 'I am looking for a permanent frontend or software developer role in the Rhein-Main area. Angular and TypeScript are my core skills.',
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
      status: null,
      technologies: ['TypeScript', 'React', 'Vite', 'PWA'],
      githubUrl: 'https://github.com/ch0sn/kin-graph',
      liveUrl: null,
      shots: [
        {
          src: '/projects/kin-graph/kin-graph-1.webp',
          width: 1440,
          height: 900,
          alt: {
            de: 'kin-graph auf dem Desktop: Stammbaum über vier Generationen in der Baumansicht. Die angezeigten Personen sind Beispieldaten.',
            en: 'kin-graph on desktop: a four-generation family tree in the tree view. The people shown are sample data.',
          },
        },
        {
          src: '/projects/kin-graph/kin-graph-2.webp',
          width: 1440,
          height: 900,
          alt: {
            de: 'kin-graph auf dem Desktop: Detailansicht einer Person mit Zeitstrahl der Lebensereignisse. Die Angaben sind Beispieldaten.',
            en: 'kin-graph on desktop: a person detail sheet with a timeline of life events. The details are sample data.',
          },
        },
        {
          src: '/projects/kin-graph/kin-graph-3.webp',
          width: 1440,
          height: 900,
          alt: {
            de: 'kin-graph auf dem Desktop: Formular zum Bearbeiten der Personendaten. Die Einträge sind Beispieldaten.',
            en: 'kin-graph on desktop: the form for editing a person’s details. The entries are sample data.',
          },
        },
        {
          src: '/projects/kin-graph/kin-graph-4.webp',
          width: 390,
          height: 844,
          alt: {
            de: 'kin-graph auf dem Smartphone: Baumansicht eines Stammbaums. Die angezeigten Personen sind Beispieldaten.',
            en: 'kin-graph on a phone: the tree view of a family tree. The people shown are sample data.',
          },
        },
      ],
      featured: true,
    },
    {
      id: 'kostenplan',
      title: 'Kostenplan',
      summary: {
        de: 'Budget-Web-App, gebaut mit Flutter. Die Web-Version ist die weiter entwickelte Fassung; die Android-App ist noch in Entwicklung.',
        en: 'Budget web app built with Flutter. The web version is the more developed one; the Android app is still in development.',
      },
      role: { de: 'Eigenes Projekt', en: 'Personal project' },
      status: { de: 'Mobile-App in Entwicklung', en: 'Mobile app in development' },
      technologies: ['Flutter', 'Web'],
      githubUrl: 'https://github.com/ch0sn/budget-app',
      liveUrl: null,
      shots: [
        {
          src: '/projects/kostenplan/kostenplan-4.webp',
          width: 1440,
          height: 900,
          alt: {
            de: 'Kostenplan im Web auf dem Desktop: Monatsübersicht mit Seitenmenü, Donut für Einnahmen und Ausgaben und Balkendiagramm. Die Haushaltszahlen sind Beispieldaten.',
            en: 'Kostenplan in the web app on desktop: monthly overview with a side menu, an income and expense donut, and a bar chart. The household figures are sample data.',
          },
        },
        {
          src: '/projects/kostenplan/kostenplan-1.webp',
          width: 390,
          height: 844,
          alt: {
            de: 'Kostenplan im Web auf einem schmalen Bildschirm: Monatsübersicht mit Donut für Einnahmen und Ausgaben und Balken zur Bilanz. Die Haushaltszahlen sind Beispieldaten.',
            en: 'Kostenplan in the web app on a narrow screen: monthly overview with an income and expense donut and balance bars. The household figures are sample data.',
          },
        },
        {
          src: '/projects/kostenplan/kostenplan-2.webp',
          width: 390,
          height: 844,
          alt: {
            de: 'Kostenplan im Web auf einem schmalen Bildschirm: Dialog zum Bearbeiten einer wiederkehrenden Ausgabe. Die Einträge sind Beispieldaten.',
            en: 'Kostenplan in the web app on a narrow screen: dialog for editing a recurring expense. The entries are sample data.',
          },
        },
        {
          src: '/projects/kostenplan/kostenplan-3.webp',
          width: 390,
          height: 844,
          alt: {
            de: 'Kostenplan im Web auf einem schmalen Bildschirm: Monatsrückblick mit der Verteilung nach Kategorien. Die Haushaltszahlen sind Beispieldaten.',
            en: 'Kostenplan in the web app on a narrow screen: monthly recap with the mix by category. The household figures are sample data.',
          },
        },
      ],
      featured: true,
    },
    {
      id: 'realqa',
      title: 'realQ&A',
      summary: {
        de: 'realQ&A ist eine iOS-App, in der Menschen durchdachte Fragen beantworten: allein, mit Freundinnen und Freunden oder als Paar, über verschiedene Tiefenstufen hinweg, um sich besser kennenzulernen.',
        en: 'realQ&A is an iOS app where people answer thoughtful questions together: solo, with friends, or as a couple, across different depth levels, to get to know each other better.',
      },
      role: {
        de: 'Eigenes Projekt, alleine konzipiert und entwickelt',
        en: 'Solo project, designed and built on my own',
      },
      status: null,
      technologies: ['TypeScript', 'React Native', 'Expo', 'iOS'],
      githubUrl: null,
      liveUrl: null,
      shots: [
        {
          src: '/projects/realqa/realqa-1.webp',
          width: 390,
          height: 844,
          alt: {
            de: 'realQ&A auf dem iPhone: Startbildschirm mit den Räumen Solo, Friends und Couple. Die angezeigten Inhalte sind Beispieldaten.',
            en: 'realQ&A on iPhone: the home screen with the Solo, Friends, and Couple rooms. The content shown is sample data.',
          },
        },
        {
          src: '/projects/realqa/realqa-2.webp',
          width: 390,
          height: 844,
          alt: {
            de: 'realQ&A auf dem iPhone: Auswahl von Tiefe und Kategorie im Couple-Raum, darunter Light, Everyday, Story, Us, Faith und Random. Die Einträge sind Beispieldaten.',
            en: 'realQ&A on iPhone: depth and category selection in the Couple room, including Light, Everyday, Story, Us, Faith, and Random. The entries are sample data.',
          },
        },
        {
          src: '/projects/realqa/realqa-3.webp',
          width: 390,
          height: 844,
          alt: {
            de: 'realQ&A auf dem iPhone: eine Fragekarte während des Spiels. Die angezeigte Frage besteht aus Beispieldaten.',
            en: 'realQ&A on iPhone: a question card in play. The question is sample data.',
          },
        },
        {
          src: '/projects/realqa/realqa-4.webp',
          width: 390,
          height: 844,
          alt: {
            de: 'realQ&A auf dem iPhone: Rückblick mit aufgeschriebenen Antworten. Die Antworten sind Beispieldaten.',
            en: 'realQ&A on iPhone: the review screen with written answers. The answers are sample data.',
          },
        },
      ],
      featured: false,
    },
  ],
};
