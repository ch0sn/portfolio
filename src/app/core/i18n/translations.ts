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
      'Frontend-Entwickler für Angular und TypeScript im Rhein-Main-Gebiet. Portfolio von Sontek Daniel Cho.',
    kicker: 'Rhein-Main · Frankfurt, Wiesbaden, Mainz',
    role: 'Frontend-Entwickler',
    focus: 'Angular & TypeScript',
    lede: 'Ich baue klare, zugängliche Oberflächen mit Angular und TypeScript und suche eine Festanstellung als Frontend- oder Softwareentwickler in Frankfurt, Wiesbaden oder Mainz.',
    primaryCta: 'Projekte ansehen',
    secondaryCta: 'Kontakt',
    dossierLabel: 'Kurzprofil',
    featuredTitle: 'Ausgewählte Projekte',
    featuredLink: 'Alle Projekte',
  },
  about: {
    metaTitle: 'Über mich · Sontek Daniel Cho',
    metaDescription:
      'Hintergrund, Studium der Wirtschaftsinformatik und Kenntnisse in Angular und TypeScript.',
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
      'Kontakt zu Sontek Daniel Cho für eine Festanstellung als Frontend-Entwickler im Rhein-Main-Gebiet.',
    title: 'Kontakt',
    intro:
      'Für eine Festanstellung als Frontend- oder Softwareentwickler im Rhein-Main-Gebiet.',
    email: 'E-Mail',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'Lebenslauf herunterladen',
    cvNote: 'Platzhalter-PDF. Die finale Datei ersetzt',
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
    blurb: 'Frontend-Entwickler · Angular & TypeScript · Rhein-Main',
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
        'Frontend developer focused on Angular and TypeScript in the Rhein-Main area. Portfolio of Sontek Daniel Cho.',
      kicker: 'Rhein-Main · Frankfurt, Wiesbaden, Mainz',
      role: 'Frontend Developer',
      focus: 'Angular & TypeScript',
      lede: 'I build clear, accessible interfaces with Angular and TypeScript, and I am looking for a permanent frontend or software developer role in Frankfurt, Wiesbaden, or Mainz.',
      primaryCta: 'View projects',
      secondaryCta: 'Contact',
      dossierLabel: 'Profile',
      featuredTitle: 'Selected projects',
      featuredLink: 'All projects',
    },
    about: {
      metaTitle: 'About · Sontek Daniel Cho',
      metaDescription:
        'Background, a bachelor’s degree in Wirtschaftsinformatik, and skills in Angular and TypeScript.',
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
        'Contact Sontek Daniel Cho about a permanent frontend developer role in the Rhein-Main area.',
      title: 'Contact',
      intro: 'For a permanent frontend or software developer role in the Rhein-Main area.',
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      cv: 'Download CV',
      cvNote: 'Placeholder PDF. Replace it with the final file at',
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
      blurb: 'Frontend developer · Angular & TypeScript · Rhein-Main',
    },
  },
} satisfies Record<Locale, typeof de>;

export type Messages = typeof translations.de;
