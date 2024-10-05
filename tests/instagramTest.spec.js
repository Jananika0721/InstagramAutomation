const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

test('Instagram Automation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto('https://www.instagram.com/accounts/login/');
    await loginPage.login('username', 'password');

    // Navigate to the home page after login
    await page.waitForSelector('input[placeholder="Search"]', { timeout: 30000 });
    await homePage.searchUser('jananika_damodharan');
    await homePage.sendMessage('Hello, this is Jaan');
});


