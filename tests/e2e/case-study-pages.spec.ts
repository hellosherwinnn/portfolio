import { expect, test } from '@playwright/test';

const caseStudies = [
  { slug: 'bakery-ai-analytics', title: 'Bakery AI Analytics Platform' },
  { slug: 'road-traffic-auralization', title: 'Plausible Road Traffic Auralization' },
  { slug: 'spoken-digit-cnn', title: 'Spoken Digit Classification with CNNs' },
];

test('opens a detailed case study from the homepage and returns to work', async ({ page }) => {
  await page.goto('/#work');
  await expect(page.locator('.project-link')).toHaveCount(3);

  await page.getByRole('link', { name: 'View case study: Bakery AI Analytics Platform' }).click();
  await expect(page).toHaveURL(/\/work\/bakery-ai-analytics\/index\.html$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Bakery AI Analytics Platform' })).toBeVisible();

  await page.getByRole('link', { name: /Back to selected work/ }).click();
  await expect(page).toHaveURL(/\/index\.html#work$/);
});

for (const caseStudy of caseStudies) {
  test(`renders ${caseStudy.title} in the rebuilt visual system`, async ({ page }) => {
    const response = await page.goto(`/work/${caseStudy.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(`${caseStudy.title} — Zhengjie`);
    await expect(page.getByRole('heading', { level: 1, name: caseStudy.title })).toBeVisible();
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.locator('.metrics > div')).toHaveCount(3);
    await expect(page.getByRole('heading', { level: 2, name: 'Summary' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'My role' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Results' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Reflection' })).toBeVisible();
    await expect(page.locator('.system-view')).toBeVisible();
  });
}

test('keeps a case study readable on mobile without page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/work/spoken-digit-cnn');

  await expect(page.getByRole('heading', { level: 1, name: 'Spoken Digit Classification with CNNs' })).toBeVisible();
  await expect(page.getByRole('link', { name: /View GitHub repository/ })).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasHorizontalOverflow).toBe(false);
});

test('returns from the final case study to selected work', async ({ page }) => {
  await page.goto('/work/spoken-digit-cnn');

  const returnLink = page.getByRole('link', { name: /Return to portfolio.*Selected work/i });
  await expect(returnLink).toHaveAttribute('href', '../../index.html#work');
  await returnLink.click();
  await expect(page).toHaveURL(/\/index\.html#work$/);
  await expect(page.getByRole('heading', { level: 2, name: 'Selected work' })).toBeVisible();
});

test('shows the complete bakery dashboard preview and public workflow repository', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/work/bakery-ai-analytics');

  const repository = page.getByRole('link', { name: /View public workflow repository/ });
  await expect(repository).toBeVisible();
  await expect(repository).toHaveAttribute('href', 'https://github.com/hellosherwinnn/bakery-graph');
  await expect(page.getByRole('heading', { level: 2, name: 'Public repository and privacy' })).toBeVisible();

  const preview = await page.locator('.bakery-preview').evaluate((element) => {
    const container = element.getBoundingClientRect();
    const chart = element.querySelector('svg')!.getBoundingClientRect();
    return {
      chartBottom: chart.bottom,
      containerBottom: container.bottom,
      overflowHeight: element.scrollHeight - element.clientHeight,
    };
  });

  expect(preview.chartBottom).toBeLessThanOrEqual(preview.containerBottom);
  expect(preview.overflowHeight).toBe(0);
});

test('reuses the complete homepage auralization top view in the case study', async ({ page }) => {
  await page.goto('/work/road-traffic-auralization');

  const schematic = page.locator('.traffic-preview .auralization-svg');
  await expect(schematic).toBeVisible();
  await expect(schematic).toHaveAttribute('viewBox', '0 0 1000 560');
  await expect(schematic.locator('[data-auralization-source]')).toHaveCount(1);
  await expect(schematic.locator('[data-auralization-receiver]')).toHaveCount(1);
  await expect(schematic.locator('.direct-acoustic-path')).toHaveAttribute('d', 'M285 305 L645 360');
  await expect(schematic.locator('.reflection-paths path')).toHaveCount(2);
});
