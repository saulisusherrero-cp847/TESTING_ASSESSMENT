import { Page, expect } from '@playwright/test';

/**
 * Waits for the application to be in a "stable" state.
 * Useful after navigation or actions that trigger async network calls.
 */
export async function waitForAppToBeStable(page: Page, timeoutMs = 5000) {
  // Wait for DOM and resources to be loaded
  await page.waitForLoadState('load', { timeout: timeoutMs });
  // Wait for network to be idle (no ongoing requests)
  await page.waitForLoadState('networkidle', { timeout: timeoutMs });
}

/**
 * Logs a test step in a consistent, visible format.
 * This can later be redirected to a logger or reporting system if needed.
 */
export function logStep(message: string) {
  // You can enhance this later with timestamps, colors, etc.
  console.log(`[STEP] ${message}`);
}

/**
 * Asserts that the current page URL ends with the expected path.
 * Good for validating navigation without hardcoding the full URL.
 */
export async function expectUrlEndsWith(page: Page, expectedPath: string) {
  const currentUrl = page.url();
  const message = `Expected URL to end with "${expectedPath}", but was "${currentUrl}"`;
  expect(currentUrl.endsWith(expectedPath), message).toBe(true);
}

/**
 * Generic helper to assert that some text contains an expected substring,
 * with an optional contextual message.
 *
 * Can accept either a string or a Promise<string>,
 * so it works well with locator.textContent() and similar APIs.
 */
export async function expectTextContains(
  actual: string | Promise<string | null>,
  expected: string,
  contextMessage?: string
) {
  const value = await actual;

  const safeValue = value ?? '';
  const defaultMessage = `Expected "${safeValue}" to contain "${expected}"`;
  const finalMessage = contextMessage
    ? `${contextMessage} | ${defaultMessage}`
    : defaultMessage;

  expect(
    safeValue.includes(expected),
    finalMessage
  ).toBe(true);
}