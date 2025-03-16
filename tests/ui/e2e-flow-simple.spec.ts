import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFoundPage } from '../pages/order-not-found'
import { CreatedOrderModal } from '../organisms/CreatedOrderModal'
import { StatusModal } from '../organisms/StatusModal'
import { StatusPage } from '../pages/status-page'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkVisible()
  await loginPage.signInButton.checkDisabled(true)
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkDisabled(false);
  await orderCreationPage.nameField.checkVisible();
  await orderCreationPage.phoneField.checkVisible();
  await orderCreationPage.commentField.checkVisible();
})

test('TL-18-1 Check footer on login page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open();
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkFooterAttached();
  await orderPage.langButtonRu.checkVisible();
  await orderPage.langButtonEn.checkVisible();
  await orderPage.privacyPolicyLink.checkVisible();
  await orderPage.cookiePolicyLink.checkVisible();
  await orderPage.tosLink.checkVisible();
})

test('TL-18-2 Check footer on order not found page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const notFoundPage = new OrderNotFoundPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click();
  await orderPage.orderNumberField.fill('22141241515112')
  await orderPage.trackButton.click()
  await notFoundPage.checkNotFoundTitle()
  await notFoundPage.checkFooterAttached();
  await notFoundPage.langButtonRu.checkVisible();
  await notFoundPage.langButtonEn.checkVisible();
  await notFoundPage.privacyPolicyLink.checkVisible();
  await notFoundPage.cookiePolicyLink.checkVisible();
  await notFoundPage.tosLink.checkVisible();
})

test('TL-18-3 Creating an order and obtaining the correct tracking code', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.nameField.fill('123123')
  await orderPage.phoneField.fill('123124')
  await orderPage.trackButton.click()
  const createdOrderModal = new CreatedOrderModal(page)
  await createdOrderModal.orderCreatedButton.checkVisible();
  await createdOrderModal.orderCreatedButton.checkDisabled(false);
  await createdOrderModal.closeButton.checkVisible();
  await createdOrderModal.closeButton.checkDisabled(false);
  await createdOrderModal.checkCreatedOrderText();
  await createdOrderModal.checkTrackingCode();
  await createdOrderModal.orderCreatedButton.click();
})

test('TL-18-4 Tracking an order by correct tracking code', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click()
  const statusModal = new StatusModal(page)
  await statusModal.orderSearchInput.checkVisible()
  await statusModal.orderSearchButton.checkVisible()
  await statusModal.orderSearchButton.checkDisabled(false)
  await statusModal.closeButton.checkVisible()
  await statusModal.closeButton.checkDisabled(false)
  await statusModal.checkOrderSearchText()
  await statusModal.orderSearchInput.fill('6004')
  await statusModal.orderSearchButton.click()
})

test.only('TL-18-5 Check elements on status page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click()
  const statusModal = new StatusModal(page)
  await statusModal.orderSearchInput.fill('6004')
  await statusModal.orderSearchButton.click()
  const statusPage = new StatusPage(page)
  await statusPage.checkLogoVisible()
  await statusPage.checkLogoText()
  await statusPage.checkTitle()
  await statusPage.statusButton.checkVisible()
  await statusPage.statusButton.checkDisabled(false)
  await statusPage.logOutButton.checkVisible()
  await statusPage.logOutButton.checkDisabled(false)
  await statusPage.uselessInput.checkVisible()
  await statusPage.checkOrderTitle()
  await statusPage.checkOrderDescription()
  await statusPage.checkOrderStatusText()
  await statusPage.checkOrderStatusDescription()
  await statusPage.checkFooterAttached()


})