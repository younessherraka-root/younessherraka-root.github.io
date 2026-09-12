import { describe, expect, it } from 'vitest';
import {
  certifications,
  communicationLanguages,
  contactMethods,
  cvHrefs,
  educationItems,
  experienceItems,
  languages,
  navItems,
  profileLinks,
  projects,
  skillGroups,
  translations,
} from '../src/data';

describe('portfolio content', () => {
  it('keeps navigation labels available in every language', () => {
    for (const language of languages) {
      for (const item of navItems) {
        expect(translations[language].nav[item.labelKey]).toBeTruthy();
      }
    }
  });

  it('uses only real external profile and project links', () => {
    expect(profileLinks.github).toBe('https://github.com/younessherraka-root');
    expect(profileLinks.linkedin).toContain('linkedin.com/in/youness-herraka');
    expect(profileLinks.credly).toContain('credly.com/users/youness-herraka');
    expect(cvHrefs.en).toMatch(/youness-herraka-cv-en\.pdf$/);
    expect(cvHrefs.fr).toMatch(/youness-herraka-cv-fr\.pdf$/);

    for (const project of projects) {
      expect(project.url).toMatch(/^https:\/\//);
      expect(project.description.en).not.toMatch(/lorem ipsum/i);
      expect(project.description.fr).not.toMatch(/lorem ipsum/i);
    }

  });

  it('keeps infrastructure skills and adds programming languages', () => {
    const skills = skillGroups.flatMap((group) => group.skills);
    const programming = skillGroups.find((group) => group.id === 'programming');

    expect(skills).toEqual(expect.arrayContaining(['SQL', 'NoSQL', 'PostgreSQL', 'Terraform', 'Docker']));
    expect(skills).not.toEqual(expect.arrayContaining(['Excel avancé', 'Prisma']));
    expect(programming?.title.fr).toBe('Langages et scripting');
    expect(programming?.skills).toEqual(['Python', 'Bash', 'PowerShell', 'C']);
  });

  it('adds communication languages without replacing technical skills', () => {
    expect(communicationLanguages.map((item) => item.id)).toEqual(['tamazight', 'arabic', 'english', 'french']);
    expect(communicationLanguages.find((item) => item.id === 'tamazight')?.level.fr).toBe('Langue maternelle');
    expect(communicationLanguages.find((item) => item.id === 'arabic')?.level.en).toBe('Native language');
    expect(communicationLanguages.find((item) => item.id === 'english')?.level.fr).toBe('Intermédiaire');
    expect(communicationLanguages.find((item) => item.id === 'french')?.level.en).toBe('Intermediate');
  });

  it('adds professional proof for projects, certifications, and contact', () => {
    expect(projects.every((project) => project.highlights.en.length >= 3)).toBe(true);
    expect(projects.every((project) => project.highlights.fr.length >= 3)).toBe(true);
    expect(certifications).toHaveLength(4);
    expect(certifications.map((item) => item.issuer)).toEqual(['Microsoft', 'Cisco', 'LinkedIn Learning', 'AWS']);
    expect(contactMethods.map((method) => method.id)).toEqual(['email', 'location']);
  });

  it('includes Bac Pro MIR formation and internship content', () => {
    expect(educationItems.some((item) => item.diploma.fr === 'Bac Pro MIR - Maintenance Informatique et Réseau')).toBe(true);
    expect(experienceItems.some((item) => item.organization.includes('Inezgane-Aït Melloul'))).toBe(true);
    expect(experienceItems.some((item) => item.organization.includes('Commune d’Azilal'))).toBe(true);
    expect(experienceItems.find((item) => item.id === 'dpm-inezgane')?.period.fr).toBe('1 mois');
    expect(experienceItems.every((item) => item.bullets.en.length > 0 && item.bullets.fr.length > 0)).toBe(true);
    expect(translations.fr.experience.title).not.toContain('LinkedIn');
    expect(translations.en.experience.title).not.toContain('LinkedIn');
  });
});
