import { Locator, Page } from '@playwright/test'
import { Input} from '../atoms/Input'
import { Button } from '../atoms/Button'
import { BasePage } from './base-page'

export class OrderPage extends BasePage {
  readonly nameField: Input;
  readonly phoneField: Input;
  readonly commentField: Input;
  readonly statusModal: Locator;
  readonly orderNumberField: Input;
  readonly trackButton: Button;

  constructor(page: Page) {
    super(page)

    this.nameField = new Input(page, '#name')
    this.phoneField = new Input(page, '#phone')
    this.commentField = new Input(page, '#comment')
    this.statusModal = page.getByTestId('searchOrder-popup')
    this.orderNumberField = new Input(page, '[data-name="searchOrder-popup"] input')
    this.trackButton = new Button(page, '[data-name="searchOrder-submitButton"]')
  }
}