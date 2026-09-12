// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { StrictMode } from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { projects } from '../src/data';
import { openingAnimationDuration, openingRevealStart } from '../src/hooks';

function mockMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>();
  const media = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: vi.fn((_event: string, listener: () => void) => listeners.add(listener)),
    removeEventListener: vi.fn((_event: string, listener: () => void) => listeners.delete(listener)),
    dispatchEvent: vi.fn(),
  };
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockReturnValue(media),
  });
  return (next: boolean) => {
    media.matches = next;
    listeners.forEach((listener) => listener());
  };
}

beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });
});

beforeEach(() => {
  mockMatchMedia(true);
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  window.sessionStorage.clear();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('portfolio app', () => {
  it('renders core sections and switches to French', async () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Youness HERRAKA/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Infrastructure projects/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Download CV/i }));
    expect(screen.getByRole('link', { name: /CV English/i })).toHaveAttribute('download');
    expect(screen.getByRole('link', { name: /CV French/i })).toHaveAttribute('download');
    expect(screen.getByText('Communication languages')).toBeInTheDocument();
    expect(screen.getByText('Tamazight')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Certifications and badges/i })).toBeInTheDocument();
    expect(screen.getByText('younessherraka@gmail.com')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'FR' })[0]);

    expect(document.documentElement.lang).toBe('fr');
    expect(await screen.findByRole('link', { name: /CV anglais/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CV français/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Projets infrastructure/i })).toBeInTheDocument();
    expect(screen.getByText('Langues de communication')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Certifications et badges/i })).toBeInTheDocument();
  });

  it('uses the requested French hero hierarchy and compact CV control', async () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole('button', { name: 'FR' })[0]);

    expect(await screen.findByText('Technicien Spécialisé en Systèmes, Réseaux & Cloud')).toBeInTheDocument();
    expect(screen.getByText('Disponible pour des opportunités junior en infrastructure')).toBeInTheDocument();
    expect(screen.getByAltText('Portrait de Youness Herraka')).toBeInTheDocument();
    expect(screen.getByText('À propos', { selector: '.section-word' })).toBeInTheDocument();
    expect(screen.getByText('Virtualisation • Administration Windows/Linux • Automatisation')).toBeInTheDocument();
    expect(screen.getByText('Agadir, Maroc — Disponible pour mobilité')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Voir les projets/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /Expériences/i })).toHaveAttribute('href', '#experience');

    fireEvent.click(screen.getByRole('button', { name: /Télécharger CV/i }));

    expect(screen.getByRole('link', { name: /CV français/i })).toHaveAttribute(
      'href',
      expect.stringContaining('youness-herraka-cv-fr.pdf'),
    );
    expect(screen.getByRole('link', { name: /CV anglais/i })).toHaveAttribute(
      'href',
      expect.stringContaining('youness-herraka-cv-en.pdf'),
    );
  });

  it('opens mobile navigation with the compact CV chooser', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 390,
    });

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Open navigation menu/i }));

    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
    expect(within(mobileMenu!).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(within(mobileMenu!).getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');

    fireEvent.click(within(mobileMenu!).getByRole('button', { name: /Download CV/i }));

    expect(within(mobileMenu!).getByRole('link', { name: /CV French/i })).toHaveAttribute(
      'href',
      expect.stringContaining('youness-herraka-cv-fr.pdf'),
    );
    expect(within(mobileMenu!).getByRole('link', { name: /CV English/i })).toHaveAttribute(
      'href',
      expect.stringContaining('youness-herraka-cv-en.pdf'),
    );
  });

  it('sets external links to open safely in a new tab', () => {
    render(<App />);

    const externalLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));
    expect(externalLinks.length).toBeGreaterThanOrEqual(8);

    for (const link of externalLinks) {
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
      expect(link.href).toMatch(/^https:\/\//);
    }
  });

  it('points internal navigation and CTA links at existing sections', () => {
    render(<App />);

    const internalLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    expect(internalLinks.length).toBeGreaterThanOrEqual(8);

    for (const link of internalLinks) {
      const target = link.getAttribute('href');
      expect(target).toBeTruthy();
      expect(document.querySelector(target!)).toBeInTheDocument();
    }
  });

  it('renders one contained diagram for every project card', () => {
    render(<App />);

    const projectCards = Array.from(document.querySelectorAll<HTMLElement>('.project-card[role="article"]'));
    expect(projectCards).toHaveLength(projects.length);

    for (const card of projectCards) {
      const visual = card.querySelector<SVGSVGElement>('.project-visual svg');

      expect(visual).toBeInTheDocument();
      expect(visual).toHaveAttribute('viewBox', '0 0 480 300');
      expect(visual).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
    }

    expect(document.querySelector('.project-card.is-secondary')).toBeInTheDocument();
  });

  it('reveals the portfolio after the opening and plays only once per session', () => {
    vi.useFakeTimers();
    mockMatchMedia(false);

    const { unmount } = render(<App />);
    expect(screen.getByRole('status', { name: /opening youness herraka portfolio/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Youness Herraka')).toBeInTheDocument();
    expect(screen.getByText('Digital infrastructure portfolio')).toBeInTheDocument();
    expect(within(screen.getByRole('status')).getByRole('img', { name: /IT servers connected to cloud resources and a DevOps/i })).toBeInTheDocument();
    expect(document.body).toHaveAttribute('data-intro-playing', 'true');
    expect(document.querySelector('.site-content')).toHaveAttribute('inert');

    act(() => {
      vi.advanceTimersByTime(openingRevealStart - 1);
    });

    expect(document.body).not.toHaveAttribute('data-intro-revealing');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(document.body).toHaveAttribute('data-intro-revealing', 'true');

    act(() => {
      vi.advanceTimersByTime(openingAnimationDuration - openingRevealStart - 1);
    });

    expect(screen.getByRole('status', { name: /opening youness herraka portfolio/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.queryByRole('status', { name: /opening youness herraka portfolio/i })).not.toBeInTheDocument();
    expect(document.body).not.toHaveAttribute('data-intro-playing');
    expect(document.body).not.toHaveAttribute('data-intro-revealing');
    expect(document.querySelector('.site-content')).not.toHaveAttribute('inert');
    expect(document.getElementById('main')).toHaveFocus();

    unmount();
    render(<App />);

    expect(screen.queryByRole('status', { name: /opening youness herraka portfolio/i })).not.toBeInTheDocument();
  });

  it.each(['button', 'Escape'])('allows skipping the intro with %s and restores access to the site', (method) => {
    vi.useFakeTimers();
    mockMatchMedia(false);
    window.localStorage.setItem('portfolio-language', 'fr');
    render(<App />);

    expect(screen.getByRole('status', { name: 'Ouverture du portfolio de Youness Herraka' })).toBeInTheDocument();
    expect(screen.getByText('Portfolio infrastructure digitale')).toBeInTheDocument();
    expect(within(screen.getByRole('status')).getByRole('img', { name: /Serveurs IT connectés/i })).toBeInTheDocument();
    const enterButton = screen.getByRole('button', { name: 'Accéder au portfolio' });
    expect(enterButton).toHaveFocus();
    expect(enterButton.textContent).toBe('');
    expect(enterButton.querySelector('.opening-tooltip')).toBeNull();
    expect(screen.queryByText("Passer l'introduction")).not.toBeInTheDocument();

    if (method === 'button') {
      fireEvent.click(enterButton);
    } else {
      fireEvent.keyDown(window, { key: 'Escape' });
    }

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(document.querySelector('.site-content')).not.toHaveAttribute('inert');
    expect(document.body).not.toHaveAttribute('data-intro-playing');
    expect(document.getElementById('main')).toHaveFocus();

    act(() => {
      vi.advanceTimersByTime(openingAnimationDuration);
    });

    expect(document.body).not.toHaveAttribute('data-intro-revealing');
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(document.documentElement.lang).toBe('en');
  });

  it('shows the site immediately when reduced motion is preferred', () => {
    render(<App />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(document.querySelector('.site-content')).not.toHaveAttribute('inert');
    expect(document.body).not.toHaveAttribute('data-intro-playing');
    expect(screen.getByRole('heading', { name: /Youness HERRAKA/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Replay introduction' })).not.toBeInTheDocument();
  });

  it('can replay after completion and restores focus to the replay button', () => {
    vi.useFakeTimers();
    mockMatchMedia(false);
    render(<StrictMode><App /></StrictMode>);

    act(() => vi.advanceTimersByTime(openingAnimationDuration));
    const replay = screen.getByRole('button', { name: 'Replay introduction' });
    replay.focus();
    fireEvent.click(replay);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enter portfolio' })).toHaveFocus();
    expect(document.querySelector('.site-content')).toHaveAttribute('inert');

    act(() => vi.advanceTimersByTime(openingAnimationDuration));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(replay).toHaveFocus();
    expect(document.querySelector('.site-content')).not.toHaveAttribute('inert');
    expect(document.body).not.toHaveAttribute('data-intro-playing');
  });

  it('ends an active opening immediately when reduced motion is enabled', () => {
    vi.useFakeTimers();
    const updatePreference = mockMatchMedia(false);
    render(<App />);
    act(() => {
      vi.advanceTimersByTime(500);
      updatePreference(true);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(document.querySelector('.site-content')).not.toHaveAttribute('inert');
    expect(document.body).not.toHaveAttribute('data-intro-playing');
    act(() => vi.advanceTimersByTime(openingAnimationDuration));
    expect(document.body).not.toHaveAttribute('data-intro-revealing');
  });

  it('still finishes the opening when session storage is unavailable', () => {
    vi.useFakeTimers();
    mockMatchMedia(false);
    const originalGet = Storage.prototype.getItem;
    const originalSet = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(function (this: Storage, key) {
      if (this === window.sessionStorage) throw new Error('Storage blocked');
      return originalGet.call(this, key);
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (this: Storage, key, value) {
      if (this === window.sessionStorage) throw new Error('Storage blocked');
      return originalSet.call(this, key, value);
    });
    render(<App />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(openingAnimationDuration));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(document.querySelector('.site-content')).not.toHaveAttribute('inert');
  });

  it('cleans up the intro scroll lock and pending reveal when unmounted early', () => {
    vi.useFakeTimers();
    mockMatchMedia(false);
    const { unmount } = render(<App />);

    unmount();
    act(() => {
      vi.advanceTimersByTime(openingAnimationDuration);
    });

    expect(document.body).not.toHaveAttribute('data-intro-playing');
    expect(document.body).not.toHaveAttribute('data-intro-revealing');
  });
});
