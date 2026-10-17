import { Locale } from './localize';

const de = {
  nav: {
    skip: 'Zum Inhalt',
    primary: 'Hauptnavigation',
    home: 'Start',
    projects: 'Projekte',
    about: 'Über mich',
    contact: 'Kontakt',
    language: 'Sprache',
    german: 'Deutsch',
    english: 'English',
    menu: 'Menü',
    themeToDark: 'Dunkles Design aktivieren',
    themeToLight: 'Helles Design aktivieren',
  },
  home: {
    metaTitle: 'Sontek Daniel Cho · Frontend-Entwickler',
    metaDescription:
      'Frontend-Entwickler und Softwareentwickler für Angular und TypeScript in Mainz-Kastel. Portfolio von Sontek Daniel Cho.',
    kicker: 'Mainz-Kastel · Rhein-Main',
    role: 'Frontend-Entwickler / Softwareentwickler',
    focus: 'Angular & TypeScript',
    lede: 'Ich entwickle mit Angular und TypeScript, wohne in Mainz-Kastel und suche eine Festanstellung im Rhein-Main-Gebiet.',
    primaryCta: 'Projekte ansehen',
    secondaryCta: 'Kontakt',
    dossierLabel: 'Kurzprofil',
    featuredTitle: 'Ausgewählte Projekte',
    featuredLink: 'Alle Projekte',
  },
  about: {
    metaTitle: 'Über mich · Sontek Daniel Cho',
    metaDescription:
      'Wirtschaftsinformatik (B.Sc.), BMW Group, Nintendo Europe und Angular mit TypeScript.',
    title: 'Über mich',
    backgroundTitle: 'Hintergrund',
    educationTitle: 'Studium',
    experienceTitle: 'Berufserfahrung',
    skillsTitle: 'Kenntnisse',
    practiceTitle: 'Praxis',
    lookingTitle: 'Was ich suche',
  },
  projects: {
    metaTitle: 'Projekte · Sontek Daniel Cho',
    metaDescription:
      'kin-graph, Kostenplan, GTKEO und ein Web-Technologien-Projekt aus dem Studium.',
    title: 'Projekte',
    intro: 'Eine Auswahl an Arbeiten. Beschrieben ist nur, was sich belegen lässt.',
    github: 'GitHub',
    live: 'Live-Demo',
    privateRepo: 'Privates Repository',
    newTab: 'öffnet in neuem Tab',
    shotAlt: 'Abbildung von {title}',
    techLabel: 'Technologien',
  },
  contact: {
    metaTitle: 'Kontakt · Sontek Daniel Cho',
    metaDescription:
      'E-Mail und LinkedIn von Sontek Daniel Cho, Frontend-Entwickler in Mainz-Kastel.',
    title: 'Kontakt',
    intro: 'Am besten per E-Mail oder LinkedIn.',
    email: 'E-Mail',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  notFound: {
    metaTitle: 'Seite nicht gefunden · Sontek Daniel Cho',
    metaDescription: 'Diese Adresse gibt es auf der Website nicht.',
    title: 'Seite nicht gefunden',
    body: 'Diese Adresse gibt es auf der Website nicht.',
    back: 'Zur Startseite',
  },
  footer: {
    navLabel: 'Fußnavigation',
    blurb: 'Frontend-Entwickler · Angular & TypeScript · Mainz-Kastel',
  },
};

export const translations = {
  de,
  en: {
    nav: {
      skip: 'Skip to content',
      primary: 'Primary',
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      language: 'Language',
      german: 'Deutsch',
      english: 'English',
      menu: 'Menu',
      themeToDark: 'Activate dark theme',
      themeToLight: 'Activate light theme',
    },
    home: {
      metaTitle: 'Sontek Daniel Cho · Frontend Developer',
      metaDescription:
        'Frontend and software developer for Angular and TypeScript, based in Mainz-Kastel. Portfolio of Sontek Daniel Cho.',
      kicker: 'Mainz-Kastel · Rhein-Main',
      role: 'Frontend Developer / Software Developer',
      focus: 'Angular & TypeScript',
      lede: 'I build with Angular and TypeScript, live in Mainz-Kastel, and I am looking for a permanent role in the Rhein-Main area.',
      primaryCta: 'View projects',
      secondaryCta: 'Contact',
      dossierLabel: 'Profile',
      featuredTitle: 'Selected projects',
      featuredLink: 'All projects',
    },
    about: {
      metaTitle: 'About · Sontek Daniel Cho',
      metaDescription:
        'B.Sc. Wirtschaftsinformatik, BMW Group, Nintendo Europe, and Angular with TypeScript.',
      title: 'About',
      backgroundTitle: 'Background',
      educationTitle: 'Education',
      experienceTitle: 'Experience',
      skillsTitle: 'Skills',
      practiceTitle: 'In practice',
      lookingTitle: 'What I am looking for',
    },
    projects: {
      metaTitle: 'Projects · Sontek Daniel Cho',
      metaDescription:
        'kin-graph, Kostenplan, GTKEO, and a university web-technologies team project.',
      title: 'Projects',
      intro: 'A selection of work. Descriptions stay with what can be verified.',
      github: 'GitHub',
      live: 'Live demo',
      privateRepo: 'Private repository',
      newTab: 'opens in a new tab',
      shotAlt: 'Screenshot of {title}',
      techLabel: 'Technologies',
    },
    contact: {
      metaTitle: 'Contact · Sontek Daniel Cho',
      metaDescription:
        'Email and LinkedIn for Sontek Daniel Cho, frontend developer in Mainz-Kastel.',
      title: 'Contact',
      intro: 'Email or LinkedIn is the best way to reach me.',
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    notFound: {
      metaTitle: 'Page not found · Sontek Daniel Cho',
      metaDescription: 'This address is not on the site.',
      title: 'Page not found',
      body: 'This address is not on the site.',
      back: 'Back to home',
    },
    footer: {
      navLabel: 'Footer',
      blurb: 'Frontend developer · Angular & TypeScript · Mainz-Kastel',
    },
  },
} satisfies Record<Locale, typeof de>;

export type Messages = typeof translations.de;
