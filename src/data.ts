export type Language = 'en' | 'fr';

export const languages: Language[] = ['en', 'fr'];

export const profileLinks = {
  github: 'https://github.com/younessherraka-root',
  linkedin: 'https://www.linkedin.com/in/youness-herraka-420889342/',
  credly: 'https://www.credly.com/users/youness-herraka',
} as const;

const publicBase = import.meta.env.BASE_URL;

export const assetPaths = {
  portrait: `${publicBase}assets/youness-photo.webp`,
} as const;

export const cvHrefs = {
  en: `${publicBase}assets/youness-herraka-cv-en.pdf`,
  fr: `${publicBase}assets/youness-herraka-cv-fr.pdf`,
} as const;
export const hasCv = true;

export const navItems = [
  { id: 'home', labelKey: 'home' },
  { id: 'about', labelKey: 'about' },
  { id: 'skills', labelKey: 'skills' },
  { id: 'projects', labelKey: 'projects' },
  { id: 'experience', labelKey: 'experience' },
  { id: 'education', labelKey: 'education' },
  { id: 'certifications', labelKey: 'certifications' },
  { id: 'contact', labelKey: 'contact' },
] as const;

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      certifications: 'Certifications',
      contact: 'Contact',
      downloadCv: 'Download CV',
      cvEnglish: 'CV English',
      cvFrench: 'CV French',
      menu: 'Open navigation menu',
      close: 'Close navigation menu',
      skipToContent: 'Skip to content',
    },
    accessibility: {
      mainNavigation: 'Main navigation',
      languageSwitch: 'Language switch',
      primaryActions: 'Primary actions',
      professionalLinks: 'Professional links',
      focusAreas: 'Focus areas',
      home: 'Youness Herraka home',
      portrait: 'Portrait of Youness Herraka',
    },
    opening: {
      eyebrow: 'Digital infrastructure portfolio',
      disciplines: ['Infrastructure', 'Networking', 'Cloud', 'DevOps'],
      scenes: 'Infrastructure and network services connected to cloud resources and a DevOps deployment pipeline',
      skip: 'Enter portfolio',
      replay: 'Replay introduction',
      announcement: 'Opening Youness Herraka portfolio',
      location: 'Agadir / Morocco',
    },
    hero: {
      role: 'Infrastructure & cloud profile',
      support: 'Specialized Technician in Systems, Networks & Cloud',
      title: 'Virtualization • Windows/Linux Administration • Automation',
      headline: '',
      availability: 'Open to junior infrastructure opportunities',
      location: 'Agadir, Morocco — Available for relocation',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      scroll: 'Scroll',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    about: {
      eyebrow: 'About',
      watermark: 'About',
      title: 'A technical profile built around systems, networks, and cloud environments.',
      paragraphs: [
        'I am a specialized technician in digital infrastructure with practical experience in systems administration, computer networks, virtualization, cloud computing, and infrastructure automation.',
        'My work focuses on Windows and Linux environments, with practical projects using Proxmox, VMware, OpenStack, Azure, Terraform, Docker, Python, Bash, and n8n.',
        'I am especially interested in systems and networks, cloud platforms, private-cloud labs, and automation workflows that make infrastructure easier to deploy, monitor, and maintain.',
      ],
      focus: ['Systems administration', 'Networks', 'Virtualization', 'Cloud', 'Databases', 'Automation'],
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Infrastructure skills and programming languages.',
      intro:
        'A technical base for systems, networks, cloud, databases, automation, and the languages used in my projects.',
      communicationTitle: 'Communication languages',
      communicationIntro: 'Languages used for collaboration, support, documentation, and technical communication.',
    },
    projects: {
      eyebrow: 'Featured projects',
      title: 'Infrastructure projects with real deployment logic.',
      intro:
        'Selected public work and project publications across Azure, hybrid cloud, OpenStack, orchestration, and automation.',
      proofLabel: 'Project proof points',
      viewProject: 'View Project',
      viewPublication: 'View Publication',
      github: 'GitHub repository',
      linkedin: 'LinkedIn publication',
      secondary: 'Programming side project',
    },
    education: {
      eyebrow: 'Education',
      title: 'Technical training.',
    },
    certifications: {
      eyebrow: 'Certifications',
      title: 'Certifications and badges that support the technical profile.',
      intro:
        'Vendor learning and badges connected to cloud, networking, security, Python, and Microsoft Azure administration.',
      viewCredly: 'View Credly profile',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Hands-on experience in IT support and infrastructure operations.',
      intro: 'Professional experience in user support, systems, networks, and infrastructure practice.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Available for IT support, systems, networks, cloud, and junior infrastructure opportunities.',
      body:
        'You can contact me directly by email, connect on LinkedIn, or review my public projects and badges.',
      linkedin: 'Contact on LinkedIn',
      github: 'View GitHub',
      credly: 'View Credly',
    },
    footer: {
      built: 'Designed with care for systems, networks and cloud.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      experience: 'Expériences',
      education: 'Formation',
      certifications: 'Certifications',
      contact: 'Contact',
      downloadCv: 'Télécharger CV',
      cvEnglish: 'CV anglais',
      cvFrench: 'CV français',
      menu: 'Ouvrir le menu de navigation',
      close: 'Fermer le menu de navigation',
      skipToContent: 'Aller au contenu',
    },
    accessibility: {
      mainNavigation: 'Navigation principale',
      languageSwitch: 'Choix de la langue',
      primaryActions: 'Actions principales',
      professionalLinks: 'Liens professionnels',
      focusAreas: 'Domaines de spécialisation',
      home: 'Accueil de Youness Herraka',
      portrait: 'Portrait de Youness Herraka',
    },
    opening: {
      eyebrow: 'Portfolio infrastructure digitale',
      disciplines: ['Infrastructure', 'Réseau', 'Cloud', 'DevOps'],
      scenes: 'Infrastructure et services réseau connectés aux ressources cloud et à un pipeline de déploiement DevOps',
      skip: 'Accéder au portfolio',
      replay: "Revoir l'introduction",
      announcement: 'Ouverture du portfolio de Youness Herraka',
      location: 'Agadir / Maroc',
    },
    hero: {
      role: 'Profil infrastructure & cloud',
      support: 'Technicien Spécialisé en Systèmes, Réseaux & Cloud',
      title: 'Virtualisation • Administration Windows/Linux • Automatisation',
      headline: '',
      availability: 'Disponible pour des opportunités junior en infrastructure',
      location: 'Agadir, Maroc — Disponible pour mobilité',
      viewProjects: 'Voir les projets',
      contactMe: 'Me contacter',
      scroll: 'Défiler',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    about: {
      eyebrow: 'À propos',
      watermark: 'À propos',
      title: 'Un profil technique orienté systèmes, réseaux et environnements cloud.',
      paragraphs: [
        'Je suis technicien spécialisé en infrastructure digitale, avec une expérience pratique en administration systèmes, réseaux informatiques, virtualisation, cloud computing et automatisation d’infrastructure.',
        'Je travaille sur des environnements Windows et Linux, avec des projets pratiques autour de Proxmox, VMware, OpenStack, Azure, Terraform, Docker, Python, Bash et n8n.',
        'Je m’intéresse particulièrement aux systèmes et réseaux, aux plateformes cloud, aux laboratoires de cloud privé et aux workflows d’automatisation qui rendent l’infrastructure plus simple à déployer, surveiller et maintenir.',
      ],
      focus: ['Administration systèmes', 'Réseaux', 'Virtualisation', 'Cloud', 'Bases de données', 'Automatisation'],
    },
    skills: {
      eyebrow: 'Compétences',
      title: 'Compétences infrastructure et langages de programmation.',
      intro:
        'Un socle technique pour les systèmes, les réseaux, le cloud, les bases de données, l’automatisation et les langages utilisés dans mes projets.',
      communicationTitle: 'Langues de communication',
      communicationIntro: 'Langues utilisées pour collaborer, assister les utilisateurs, documenter et communiquer techniquement.',
    },
    projects: {
      eyebrow: 'Projets sélectionnés',
      title: 'Projets infrastructure avec une vraie logique de déploiement.',
      intro:
        'Travaux publics et publications autour d’Azure, du cloud hybride, d’OpenStack, de l’orchestration et de l’automatisation.',
      proofLabel: 'Points techniques du projet',
      viewProject: 'Voir le projet',
      viewPublication: 'Voir la publication',
      github: 'Dépôt GitHub',
      linkedin: 'Publication LinkedIn',
      secondary: 'Projet de programmation secondaire',
    },
    education: {
      eyebrow: 'Formation',
      title: 'Formation technique.',
    },
    certifications: {
      eyebrow: 'Certifications',
      title: 'Certifications et badges qui renforcent le profil technique.',
      intro:
        'Apprentissage et badges liés au cloud, aux réseaux, à la sécurité, à Python et à l’administration Microsoft Azure.',
      viewCredly: 'Voir le profil Credly',
    },
    experience: {
      eyebrow: 'Expériences',
      title: 'Expériences pratiques en support IT et opérations infrastructure.',
      intro: 'Expérience professionnelle liée au support utilisateur, aux systèmes, aux réseaux et à la pratique infrastructure.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Disponible pour le support IT, les systèmes, les réseaux, le cloud et les opportunités infrastructure junior.',
      body:
        'Vous pouvez me contacter directement par email, me joindre sur LinkedIn, ou consulter mes projets publics et badges.',
      linkedin: 'Me contacter sur LinkedIn',
      github: 'Voir GitHub',
      credly: 'Voir Credly',
    },
    footer: {
      built: 'Conçu avec soin pour les systèmes, les réseaux et le cloud.',
    },
  },
} as const;

export const skillGroups = [
  {
    id: 'systems',
    title: { en: 'Systems', fr: 'Systèmes' },
    skills: ['Linux', 'Windows Server', 'System administration', 'Bash'],
  },
  {
    id: 'networking',
    title: { en: 'Networking', fr: 'Réseaux' },
    skills: ['TCP/IP', 'VLAN', 'DHCP', 'DNS', 'Routing', 'NAT', 'Network troubleshooting'],
  },
  {
    id: 'cloud',
    title: { en: 'Virtualization and Cloud', fr: 'Virtualisation et Cloud' },
    skills: ['Proxmox VE', 'VMware', 'OpenStack', 'Microsoft Azure', 'AWS'],
  },
  {
    id: 'databases',
    title: { en: 'Data and Databases', fr: 'Données et bases de données' },
    skills: ['SQL', 'NoSQL', 'PostgreSQL'],
  },
  {
    id: 'automation',
    title: { en: 'Automation and DevOps', fr: 'Automatisation et DevOps' },
    skills: ['Terraform', 'Docker', 'n8n', 'Ansible', 'Python', 'Git and GitHub'],
  },
  {
    id: 'programming',
    title: { en: 'Languages and scripting', fr: 'Langages et scripting' },
    skills: ['Python', 'Bash', 'PowerShell', 'C'],
  },
] as const;

export const communicationLanguages = [
  {
    id: 'tamazight',
    name: { en: 'Tamazight', fr: 'Tamazight' },
    level: { en: 'Native language', fr: 'Langue maternelle' },
  },
  {
    id: 'arabic',
    name: { en: 'Arabic', fr: 'Arabe' },
    level: { en: 'Native language', fr: 'Langue maternelle' },
  },
  {
    id: 'english',
    name: { en: 'English', fr: 'Anglais' },
    level: { en: 'Intermediate', fr: 'Intermédiaire' },
  },
  {
    id: 'french',
    name: { en: 'French', fr: 'Français' },
    level: { en: 'Intermediate', fr: 'Intermédiaire' },
  },
] as const;

export const certifications = [
  {
    id: 'microsoft-fundamentals',
    issuer: 'Microsoft',
    title: {
      en: 'Azure AI Fundamentals and Microsoft Security Fundamentals',
      fr: 'Les essentiels de Azure AI et les essentiels de Microsoft Security',
    },
    focus: {
      en: 'Cloud fundamentals, AI services, and security concepts',
      fr: 'Bases du cloud, services IA et concepts de sécurité',
    },
  },
  {
    id: 'cisco-networking-python',
    issuer: 'Cisco',
    title: {
      en: 'CCNA 1, 2, 3 and Python Essentials 1 & 2',
      fr: 'CCNA 1, 2, 3 et Python Essentials 1 & 2',
    },
    focus: {
      en: 'Networking fundamentals, routing, switching, and Python basics',
      fr: 'Bases réseau, routage, commutation et bases Python',
    },
  },
  {
    id: 'linkedin-azure-admin',
    issuer: 'LinkedIn Learning',
    title: {
      en: 'Become a Microsoft Azure Administrator pathway',
      fr: 'Parcours Devenir Administrateur Microsoft Azure',
    },
    focus: {
      en: 'Azure administration, cloud resources, and operational practice',
      fr: 'Administration Azure, ressources cloud et pratique opérationnelle',
    },
  },
  {
    id: 'aws-cloud-quest',
    issuer: 'AWS',
    title: {
      en: 'AWS Cloud Quest: Cloud Practitioner',
      fr: 'AWS Cloud Quest: Cloud Practitioner',
    },
    focus: {
      en: 'AWS cloud concepts and practitioner-level services',
      fr: 'Concepts cloud AWS et services niveau practitioner',
    },
  },
] as const;

export const contactMethods = [
  {
    id: 'email',
    label: { en: 'Email', fr: 'Email' },
    value: 'younessherraka@gmail.com',
    href: 'mailto:younessherraka@gmail.com',
  },
  {
    id: 'location',
    label: { en: 'Location', fr: 'Localisation' },
    value: { en: 'Agadir, Morocco', fr: 'Agadir, Maroc' },
  },
] as const;

export const educationItems = [
  {
    id: 'cmc-infrastructure',
    school: { en: 'CMC Souss-Massa - Agadir', fr: 'CMC Souss-Massa - Agadir' },
    diploma: {
      en: 'Technicien Spécialisé en Infrastructure Digitale',
      fr: 'Technicien Spécialisé en Infrastructure Digitale',
    },
    option: { en: 'Option Cloud Computing', fr: 'Option Cloud Computing' },
    period: { en: '2024 - Present', fr: '2024 - aujourd’hui' },
    body: {
      en: 'Training focused on systems, networks, cloud computing, virtualization, and practical infrastructure administration.',
      fr: 'Formation axée sur les systèmes, les réseaux, le cloud computing, la virtualisation et l’administration pratique d’infrastructure.',
    },
  },
  {
    id: 'bac-pro',
    school: { en: 'Professional baccalaureate track', fr: 'Parcours Bac Professionnel' },
    diploma: {
      en: 'Bac Pro MIR - Maintenance Informatique et Réseau',
      fr: 'Bac Pro MIR - Maintenance Informatique et Réseau',
    },
    option: {
      en: 'Maintenance Informatique et Réseau',
      fr: 'Maintenance Informatique et Réseau',
    },
    period: { en: '2022 - 2024', fr: '2022 - 2024' },
    body: {
      en: 'Professional baccalaureate focused on IT maintenance, networking fundamentals, and technical support.',
      fr: 'Bac professionnel axé sur la maintenance informatique, les bases réseau et le support technique.',
    },
  },
] as const;

export const experienceItems = [
  {
    id: 'dpm-inezgane',
    organization: 'Direction Provinciale du Ministère de l’Éducation Nationale - Inezgane-Aït Melloul',
    role: { en: 'Cloud & Infrastructure Intern', fr: 'Stagiaire en Cloud & Infrastructure' },
    location: { en: 'Inezgane-Aït Melloul, Morocco', fr: 'Inezgane-Aït Melloul, Maroc' },
    period: { en: '1 month', fr: '1 mois' },
    summary: {
      en: 'During my internship at the Provincial Directorate, I actively contribute to managing, optimizing, and modernizing digital infrastructure.',
      fr: "Dans le cadre de mon stage au sein de la Direction Provinciale, je participe activement à la gestion, à l'optimisation et à la modernisation des infrastructures numériques.",
    },
    bullets: {
      en: [
        'Contribute to the deployment and administration of infrastructure solutions.',
        'Provide technical support, network maintenance, and system incident resolution.',
        'Participate in analyzing virtualization needs and cloud evolution opportunities.',
      ],
      fr: [
        "Contribution au déploiement et à l'administration des solutions d'infrastructure.",
        'Support technique, maintenance réseau et résolution des incidents systèmes.',
        "Participation à l'analyse des besoins de virtualisation et d'évolution vers le cloud.",
      ],
    },
    tags: ['Linux', 'Administration Réseau', 'Systèmes', "Protocoles d'infrastructure"],
  },
  {
    id: 'commune-azilal',
    organization: 'Commune d’Azilal - Province d’Azilal',
    role: { en: 'IT Support Intern', fr: 'Stagiaire Support IT' },
    location: { en: 'Azilal, Morocco', fr: 'Azilal, Maroc' },
    period: { en: '2023 - 1 month', fr: '2023 - 1 mois' },
    summary: {
      en: 'On-site support experience for public-sector users, focused on hardware, software, and basic IT maintenance.',
      fr: 'Expérience de support de proximité pour des utilisateurs du secteur public, axée sur le matériel, les logiciels et la maintenance IT de base.',
    },
    bullets: {
      en: [
        'Assisted users with level 1/2 technical support.',
        'Helped resolve hardware and software issues on workstations.',
        'Supported daily maintenance of the computer equipment fleet.',
      ],
      fr: [
        'Assistance aux utilisateurs en support technique N1/N2.',
        'Résolution de problèmes matériels et logiciels sur les postes.',
        'Participation à la maintenance quotidienne du parc informatique.',
      ],
    },
    tags: ['Support IT', 'Maintenance', 'Postes utilisateurs'],
  },
] as const;

export const projects = [
  {
    id: 'azure-n8n',
    name: 'Azure n8n Provisioner',
    prominence: 'primary',
    linkType: 'github',
    url: 'https://github.com/younessherraka-root/azure-n8n-provisioner',
    description: {
      en: 'A production-oriented Azure provisioning and orchestration platform combining Terraform, n8n workflows, an Express API, a React dashboard, PostgreSQL, Prisma, WebSockets, Azure SDK, and Docker Compose.',
      fr: 'Une plateforme orientée production pour le provisionnement et l’orchestration Azure, combinant Terraform, des workflows n8n, une API Express, un dashboard React, PostgreSQL, Prisma, WebSockets, Azure SDK et Docker Compose.',
    },
    highlights: {
      en: [
        'Automates Azure resource creation with Terraform and workflow orchestration.',
        'Connects API, dashboard, database, and real-time status updates.',
        'Shows full-stack infrastructure logic from request to deployment feedback.',
      ],
      fr: [
        'Automatise la création de ressources Azure avec Terraform et l’orchestration de workflows.',
        'Relie API, dashboard, base de données et suivi en temps réel.',
        'Montre une logique infrastructure complète, de la demande au retour de déploiement.',
      ],
    },
    tags: ['Azure', 'Terraform', 'n8n', 'Docker', 'Node.js', 'Express', 'React', 'PostgreSQL', 'Prisma', 'WebSockets'],
    visual: 'azure',
  },
  {
    id: 'hybrid-cloud',
    name: 'Hybrid Cloud Orchestration Platform',
    prominence: 'primary',
    linkType: 'github',
    url: 'https://github.com/younessherraka-root/hybrid-cloud-platform',
    description: {
      en: 'A hybrid infrastructure monitoring and command-orchestration platform using an AWS-backed architecture, a Python agent, AWS CDK infrastructure, n8n automation, a React dashboard, and Docker.',
      fr: 'Une plateforme de supervision d’infrastructure hybride et d’orchestration de commandes, avec une architecture basée sur AWS, un agent Python, une infrastructure AWS CDK, n8n, un dashboard React et Docker.',
    },
    highlights: {
      en: [
        'Uses a Python agent to connect local infrastructure with a cloud control plane.',
        'Combines AWS CDK, n8n, Docker, and React for monitoring and operations.',
        'Demonstrates hybrid-cloud thinking for support and infrastructure tasks.',
      ],
      fr: [
        'Utilise un agent Python pour connecter l’infrastructure locale à un plan de contrôle cloud.',
        'Combine AWS CDK, n8n, Docker et React pour la supervision et les opérations.',
        'Démontre une approche cloud hybride adaptée au support et à l’infrastructure.',
      ],
    },
    tags: ['AWS', 'Python', 'AWS CDK', 'n8n', 'React', 'Docker', 'Hybrid cloud', 'Infrastructure automation'],
    visual: 'hybrid',
  },
  {
    id: 'azure-vm',
    name: 'Automated Azure VM Deployment',
    prominence: 'primary',
    linkType: 'github',
    url: 'https://github.com/younessherraka-root/azure-vm-cli-deploy',
    description: {
      en: 'Automated deployment of a Linux infrastructure on Microsoft Azure using Azure CLI, Bash, and cloud-init, provisioning a Resource Group, VNet, Subnet, NSG, public IP, network interface, Ubuntu virtual machine, and Nginx.',
      fr: 'Déploiement automatisé d’une infrastructure Linux sur Microsoft Azure avec Azure CLI, Bash et cloud-init, incluant Resource Group, VNet, Subnet, NSG, IP publique, interface réseau, machine virtuelle Ubuntu et Nginx.',
    },
    highlights: {
      en: [
        'Builds a complete Azure VM environment with network and security resources.',
        'Uses Bash and cloud-init to make deployment repeatable.',
        'Documents infrastructure steps useful for junior cloud and systems roles.',
      ],
      fr: [
        'Construit un environnement VM Azure complet avec réseau et sécurité.',
        'Utilise Bash et cloud-init pour rendre le déploiement reproductible.',
        'Documente des étapes infrastructure utiles pour des rôles cloud et systèmes junior.',
      ],
    },
    tags: ['Azure CLI', 'Bash', 'Ubuntu Server', 'cloud-init', 'VNet', 'Subnet', 'NSG', 'Networking', 'Nginx'],
    visual: 'vm',
  },
  {
    id: 'opencloudlab',
    name: 'OpenCloudLab',
    prominence: 'primary',
    linkType: 'linkedin',
    url: 'https://fr.linkedin.com/posts/youness-herraka-420889342_openstack-cloudpriv%C3%A9-kollaansible-activity-7405588521232621569-aRiG',
    description: {
      en: 'Deployment of an OpenStack All-in-One private cloud using Kolla-Ansible on Ubuntu Server, with VMware, Proxmox VE, Docker, NAT, and bridged networking.',
      fr: 'Déploiement d’un cloud privé OpenStack All-in-One avec Kolla-Ansible sur Ubuntu Server, en utilisant VMware, Proxmox VE, Docker, NAT et du réseau bridgé.',
    },
    highlights: {
      en: [
        'Deploys a private-cloud lab with OpenStack and Kolla-Ansible.',
        'Uses virtualization, Docker, NAT, and bridge networking in one lab.',
        'Shows practical understanding of cloud components and network constraints.',
      ],
      fr: [
        'Déploie un laboratoire cloud privé avec OpenStack et Kolla-Ansible.',
        'Utilise virtualisation, Docker, NAT et réseau bridgé dans un même lab.',
        'Montre une compréhension pratique des composants cloud et contraintes réseau.',
      ],
    },
    tags: ['OpenStack', 'Kolla-Ansible', 'Proxmox VE', 'VMware', 'Ubuntu Server', 'Docker', 'Ansible', 'NAT', 'Bridge networking'],
    visual: 'openstack',
  },
  {
    id: 'snake-deluxe',
    name: 'Snake Deluxe Python',
    prominence: 'secondary',
    linkType: 'github',
    url: 'https://github.com/younessherraka-root/snake-deluxe-python',
    description: {
      en: 'A smaller Tkinter programming project: a Snake game with a graphical interface, welcome, pause and game-over screens, score, best score, levels, progressive speed, and keyboard controls.',
      fr: 'Un projet de programmation plus léger en Tkinter : un jeu Snake avec interface graphique, écrans d’accueil, pause et game over, score, meilleur score, niveaux, vitesse progressive et contrôles clavier.',
    },
    highlights: {
      en: [
        'Uses Python event handling, state management, and a graphical interface.',
        'Includes score, levels, pause, and game-over flows.',
        'Supports the programming-language section with a concrete Python project.',
      ],
      fr: [
        'Utilise la gestion d’événements Python, l’état applicatif et une interface graphique.',
        'Inclut score, niveaux, pause et parcours de fin de partie.',
        'Appuie la section langages de programmation avec un projet Python concret.',
      ],
    },
    tags: ['Python', 'Tkinter', 'Game UI', 'Keyboard controls'],
    visual: 'snake',
  },
] as const;
