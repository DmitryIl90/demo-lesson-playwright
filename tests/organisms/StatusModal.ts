import { BaseModal } from './BaseModal'
import { expect, Locator, Page } from '@playwright/test'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'

export class StatusModal extends BaseModal {
  orderSearchInput: Input
  orderSearchButton: Button
  orderSearchText: Locator

  constructor(page: Page) {
    super(page)
    this.orderSearchInput = new Input(page, '[data-name="searchOrder-input"]')
    this.orderSearchButton = new Button(page, '[data-name="searchOrder-submitButton"]')
    this.orderSearchText = page.locator('.order-search-popup__label')
  }

  async checkOrderSearchText(): Promise<void> {
    await expect(this.orderSearchText).toHaveText('Enter the tracking code')
  }
}
