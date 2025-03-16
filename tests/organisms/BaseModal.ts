import { Page } from '@playwright/test'
import { Button } from '../atoms/Button'

export class BaseModal {
  readonly page: Page
  readonly closeButton: Button

  protected constructor(page: Page) {
    this.page = page
    this.closeButton = new Button(page, '[data-name="orderSuccessfullyCreated-popup-close-button"]')
  }
}
