import { expect, Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'
import { Link } from '../atoms/Link'

export class BasePage {
  readonly page: Page
  readonly footer: Locator
  readonly langButtonRu: Button
  readonly langButtonEn: Button
  readonly privacyPolicyLink: Link
  readonly cookiePolicyLink: Link
  readonly tosLink: Link
  readonly title: Locator
  readonly logo: Locator
  readonly logoText: Locator
  readonly statusButton: Button
  readonly logOutButton: Button

  protected constructor(page: Page) {
    this.page = page
    this.footer = this.page.locator('.Footer')
    this.langButtonRu = new Button(this.page, '.language__button:has-text("RU")')
    this.langButtonEn = new Button(this.page, '.language__button:has-text("EN")')
    this.privacyPolicyLink = new Link(this.page, '[href="/pdf/politics.pdf"]')
    this.cookiePolicyLink = new Link(this.page, '[href="/pdf/cookie.pdf"]')
    this.tosLink = new Link(this.page, '[href="/pdf/conditions.pdf"]')
    this.title = this.page.locator('.title')
    this.logo = this.page.locator('[href="/"]')
    this.logoText = this.page.locator('.logo_main__text.logo_main__text_shown', {
      hasText: 'Trainer',
    })
    this.statusButton = new Button(page, '[data-name="openStatusPopup-button"]')
    this.logOutButton = new Button(page, '[href="/signin"]')
  }

  async checkFooterAttached(): Promise<void> {
    await expect(this.footer).toBeAttached()
  }

  async checkTitle(): Promise<void> {
    await expect(this.title).toBeVisible()
    await expect(this.title).toHaveText('Tallinn Delivery')
  }

  async checkLogoVisible(): Promise<void> {
    await expect(this.logo).toBeVisible()
  }

  async checkLogoText(): Promise<void> {
    await expect(this.logoText).toBeVisible()
    await expect(this.logoText).toHaveText('Trainer')
  }
}
