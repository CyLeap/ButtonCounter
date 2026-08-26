import { expect, test } from '@playwright/test'

test('counter increments when the button is clicked', async ({ page }) => {
	await page.goto('/')

	const countDisplay = page.locator('span.tabular-nums')
	const initial = Number(await countDisplay.textContent())

	await page.getByRole('button', { name: 'クリック' }).click()

	await expect(countDisplay).toHaveText(String(initial + 1))
})

test('counter resets to zero via the reset dialog', async ({ page }) => {
	await page.goto('/')

	const countDisplay = page.locator('span.tabular-nums')

	await page.getByRole('button', { name: 'クリック' }).click()
	await page.getByRole('button', { name: 'クリック' }).click()
	await expect(countDisplay).not.toHaveText('0')

	await page.getByRole('button', { name: 'リセット' }).click()
	await page.locator('dialog').getByRole('button', { name: 'リセット' }).click()

	await expect(countDisplay).toHaveText('0')
	await expect(page.locator('dialog')).not.toBeVisible()
})
