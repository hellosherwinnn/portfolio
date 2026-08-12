import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../../src/pages/index.astro', import.meta.url), 'utf8');
const caseStudySource = readFileSync(new URL('../../src/pages/work/[slug].astro', import.meta.url), 'utf8');

describe('rebuilt portfolio source', () => {
  it('uses Zhengjie as the only displayed personal name', () => {
    expect(source).toContain('<h1>Zhengjie</h1>');
    expect(source).not.toMatch(/Zhengjie\s+Yuan/i);
  });

  it('uses a top navigation and stacked timeline dates', () => {
    expect(source).toContain('<header class="topbar">');
    expect(source).not.toContain('class="sidebar"');
    expect(source).not.toContain('class="timeline-index"');
    expect(source.match(/class="timeline-date"/g)).toHaveLength(6);
  });

  it('links all three projects to detailed case studies', () => {
    expect(source.match(/class="project-link"/g)).toHaveLength(3);
    expect(source).toContain('./work/bakery-ai-analytics/index.html');
    expect(source).toContain('./work/road-traffic-auralization/index.html');
    expect(source).toContain('./work/spoken-digit-cnn/index.html');
  });

  it('keeps project visuals and copy in the responsive content column', () => {
    expect(source).toContain('.project-visual,.project-text{grid-column:2}');
  });
});

describe('case study navigation source', () => {
  it('keeps hosted links and rewrites homepage links for local file browsing', () => {
    expect(caseStudySource).toContain("const home = '../../index.html';");
    expect(caseStudySource).toContain("window.location.protocol === 'file:'");
    expect(caseStudySource).toContain("const localHome = '../../zhengjie_portfolio_final_current.html';");
    expect(caseStudySource.match(/data-home-link=/g)?.length).toBeGreaterThanOrEqual(8);
  });
});
