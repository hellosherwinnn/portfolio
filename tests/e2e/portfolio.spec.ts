import { expect, test } from '@playwright/test';

test('renders the rebuilt portfolio with a top navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Zhengjie - AI & Data Engineer');
  await expect(page.getByRole('heading', { level: 1, name: 'Zhengjie' })).toBeVisible();
  await expect(page.getByText(/\bZhengjie\s+Yuan\b/i)).toHaveCount(0);
  await expect(page.locator('.sidebar')).toHaveCount(0);
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', './favicon.svg');
});

test('shows the header name only after the hero name leaves the viewport', async ({ page }) => {
  await page.goto('/');

  const headerName = page.locator('.home-identity');
  await expect(headerName).toHaveAttribute('aria-hidden', 'true');
  await expect(headerName).not.toHaveClass(/is-visible/);

  await page.locator('#work').scrollIntoViewIfNeeded();
  await expect(headerName).toHaveAttribute('aria-hidden', 'false');
  await expect(headerName).toHaveClass(/is-visible/);

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(headerName).toHaveAttribute('aria-hidden', 'true');
  await expect(headerName).not.toHaveClass(/is-visible/);

  await page.goto('/#work');
  await expect(headerName).toHaveAttribute('aria-hidden', 'false');
  await expect(headerName).toHaveClass(/is-visible/);
});

test('moves timeline dates into the former index column and keeps rows centered', async ({ page }) => {
  await page.goto('/#experience');

  await expect(page.locator('#experience .timeline-index')).toHaveCount(0);
  await expect(page.locator('#experience .timeline-date')).toHaveCount(6);
  await expect(page.locator('#experience .timeline-date').first()).toHaveText(/03\/2025\s*12\/2025/);

  const centers = await page.locator('#experience .timeline-row').first().evaluate((row) => {
    const center = (selector: string) => {
      const rect = row.querySelector(selector)!.getBoundingClientRect();
      return rect.y + rect.height / 2;
    };
    return { date: center('.timeline-date'), body: center('.timeline-body'), type: center('.timeline-type') };
  });
  expect(Math.abs(centers.date - centers.body)).toBeLessThan(2);
  expect(Math.abs(centers.type - centers.body)).toBeLessThan(2);
});

test('keeps project names in title case and anchor navigation working', async ({ page }) => {
  await page.goto('/');

  const firstProject = page.locator('.project-text h3').first();
  await expect(firstProject).toHaveText('Bakery AI Analytics Platform');
  expect(await firstProject.evaluate((element) => getComputedStyle(element).textTransform)).toBe('none');

  await page.getByRole('link', { name: /Work/ }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator('#work')).toBeInViewport();
});

test('labels the case study link without a numeric prefix', async ({ page }) => {
  await page.goto('/#work');

  const caseStudiesLink = page.getByRole('link', { name: 'CASE STUDIES ↗' });
  await expect(caseStudiesLink).toBeVisible();
  await expect(page.getByRole('link', { name: '03 CASE STUDIES ↗' })).toHaveCount(0);
  await caseStudiesLink.click();
  await expect(page).toHaveURL(/\/work\/bakery-ai-analytics\/index\.html$/);
});

test('keeps the contact block free of direct personal addresses', async ({ page }) => {
  await page.goto('/#contact');

  await expect(page.locator('#contact')).not.toContainText('fiendyuan@gmail.com');
  await expect(page.locator('#contact')).not.toContainText('mailto:');
  await expect(page.locator('#contact')).not.toContainText('tel:');
});

test('keeps the rebuilt layout usable on a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.locator('.topbar')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Zhengjie' })).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasHorizontalOverflow).toBe(false);
});

test('keeps project copy in the content column in a narrow window', async ({ page }) => {
  await page.setViewportSize({ width: 652, height: 698 });
  await page.goto('/#work');

  const layout = await page.locator('.project').first().evaluate((project) => {
    const visual = project.querySelector('.project-visual')!.getBoundingClientRect();
    const copy = project.querySelector('.project-text')!.getBoundingClientRect();
    return {
      copyWidth: copy.width,
      leftDifference: Math.abs(copy.left - visual.left),
      copyStartsAfterVisual: copy.top >= visual.bottom,
    };
  });

  expect(layout.copyWidth).toBeGreaterThan(300);
  expect(layout.leftDifference).toBeLessThan(1);
  expect(layout.copyStartsAfterVisual).toBe(true);
});
