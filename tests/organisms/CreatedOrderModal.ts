import { BaseModal } from './BaseModal'
import { expect, Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'

export class CreatedOrderModal extends BaseModal {
  orderCreatedButton: Button
  createdOrderText: Locator
  trackingCodeText: Locator
  constructor(page: Page) {
    super(page)
    this.orderCreatedButton = new Button(
      page,
      '[data-name="orderSuccessfullyCreated-popup-ok-button"]',
    )
    this.createdOrderText = page.locator('h3.notification-popup__text')
    this.trackingCodeText = page.locator('.notification-popup__text', {
      hasText: /Tracking code: \d{4}$/,
    })
  }

  async checkCreatedOrderText(): Promise<void> {
    await expect(this.createdOrderText).toHaveText('Order has been created!')
  }

  async checkTrackingCode(): Promise<void> {
    await expect(this.trackingCodeText).toHaveText(/Tracking code: \d{4}$/)
  }
}
