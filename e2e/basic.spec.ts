import { test, expect } from '@playwright/test';

test.describe('ChunkLab Application', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('ChunkLab');
  });

  test('should display chunking strategy options', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Recursive Character')).toBeVisible();
    await expect(page.getByText('Character Splitter')).toBeVisible();
    await expect(page.getByText('Sentence Splitter')).toBeVisible();
  });

  test('should allow text input', async ({ page }) => {
    await page.goto('/');
    const textarea = page.locator('textarea').first();
    await textarea.fill('Test text for chunking');
    await expect(textarea).toHaveValue('Test text for chunking');
  });

  test('should display chunk visualization when text is entered', async ({ page }) => {
    await page.goto('/');
    const textarea = page.locator('textarea').first();
    await textarea.fill('The quick brown fox jumps over the lazy dog');
    
    // Wait for chunks to be computed
    await page.waitForTimeout(500);
    
    // Check if chunk visualization is displayed
    await expect(page.getByText('Interactive Chunk Map')).toBeVisible();
  });

  test('should change chunking strategy', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Sentence Splitter').click();
    await expect(page.getByText('Sentence Splitter')).toBeVisible();
  });

  test('should adjust chunk size', async ({ page }) => {
    await page.goto('/');
    const chunkSizeInput = page.getByLabel('Chunk Size').or(page.locator('input[type="number"]').first());
    await chunkSizeInput.fill('50');
    await expect(chunkSizeInput).toHaveValue('50');
  });
});
