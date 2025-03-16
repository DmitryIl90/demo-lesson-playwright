import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'
import { Input } from '../atoms/Input'
import { SERVICE_URL } from '../../config/env-data'

const orderPath = '/order/6004'
const orderStatusOpenText = 'OPEN'
const orderStatusAcceptedText = 'ACCEPTED'
const orderStatusInprogressText = 'INPROGRESS'
const orderStatusDeliveredText = 'DELIVERED'
const orderNameTitle = 'Name'
const orderPhoneTitle = 'Phone'
const orderCommentTitle = 'Comment'

export class StatusPage extends BasePage {
  readonly url: string = SERVICE_URL
  readonly uselessInput: Input
  readonly orderNameTItle: Locator
  readonly orderPhoneTitle: Locator
  readonly orderCommentTitle: Locator
  readonly orderStatusOpen: Locator
  readonly orderStatusAccepted: Locator
  readonly orderStatusInprogress: Locator
  readonly orderStatusDelivered: Locator
  readonly orderStatusOpenDescription: Locator
  readonly orderStatusAcceptedDescription: Locator
  readonly orderStatusInprogressDescription: Locator
  readonly orderStatusDeliveredDescription: Locator
  readonly orderNameDescription: Locator
  readonly orderPhoneDescription: Locator
  readonly orderCommentDescription: Locator

  constructor(page: Page) {
    super(page)
    this.uselessInput = new Input(page, '[data-name="useless-input"]')
    this.orderNameTItle = this.page.locator('.order-list__title', {hasText: /Name/})
    this.orderPhoneTitle = this.page.locator('.order-list__title', {hasText: /Phone/})
    this.orderCommentTitle = this.page.locator('.order-list__title', {hasText: /Comment/})
    this.orderStatusOpen = this.page.locator('span.status-list__status', { hasText: /OPEN/})
    this.orderStatusAccepted = this.page.locator('span.status-list__status', { hasText: /ACCEPTED/})
    this.orderStatusInprogress = this.page.locator('span.status-list__status', { hasText: /INPROGRESS/})
    this.orderStatusDelivered = this.page.locator('span.status-list__status', { hasText: /DELIVERED/})
    this.orderStatusOpenDescription = this.page.locator('.status-list__description', { hasText: /Order has been created/})
    this.orderStatusAcceptedDescription = this.page.locator('.status-list__description', { hasText: /Order picked up by courier/})
    this.orderStatusInprogressDescription = this.page.locator('.status-list__description', { hasText: /Order is being delivered/})
    this.orderStatusDeliveredDescription = this.page.locator('.status-list__description', { hasText: /Order has been delivered/})
    this.orderNameDescription = this.page.locator('.order-list__description', {hasText: /123123/})
    this.orderPhoneDescription = this.page.locator('.order-list__description', {hasText: /000000/})
    this.orderCommentDescription = this.page.locator('.order-list__description', {hasText: /111/})
  }

  async checkOrderStatusText(): Promise<void> {
    await expect(this.orderStatusOpen).toHaveText('OPEN')
    await expect(this.orderStatusAccepted).toHaveText('ACCEPTED')
    await expect(this.orderStatusInprogress).toHaveText('INPROGRESS')
    await expect(this.orderStatusDelivered).toHaveText('DELIVERED')
  }

  async checkOrderStatusDescription(): Promise<void> {
    await expect(this.orderStatusOpenDescription).toHaveText('Order has been created')
    await expect(this.orderStatusAcceptedDescription).toHaveText('Order picked up by courier')
    await expect(this.orderStatusInprogressDescription).toHaveText('Order is being delivered')
    await expect(this.orderStatusDeliveredDescription).toHaveText('Order has been delivered')
  }

  async checkOrderTitle(): Promise<void> {
    await expect(this.orderNameTItle).toBeVisible()
    await expect(this.orderNameTItle).toHaveText('Name')
    await expect(this.orderPhoneTitle).toBeVisible()
    await expect(this.orderPhoneTitle).toHaveText('Phone')
    await expect(this.orderCommentTitle).toBeVisible()
    await expect(this.orderCommentTitle).toHaveText('Comment')
  }

  async checkOrderDescription(): Promise<void> {
    await expect(this.orderNameDescription).toBeVisible()
    await expect(this.orderNameDescription).toHaveText('123123')
    await expect(this.orderPhoneDescription).toBeVisible()
    await expect(this.orderPhoneDescription).toHaveText('000000')
    await expect(this.orderCommentDescription).toBeVisible()
    await expect(this.orderCommentDescription).toHaveText('111')
  }
}