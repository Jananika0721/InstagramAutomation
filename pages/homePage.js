class HomePage {
    constructor(page) {
        this.page = page;
        this.searchInput = 'input[placeholder="Search"]';
        this.userLink = 'a[role="link"]'; // Adjust the selector to target specific user
    }

    async searchUser(username) {
        await this.page.fill(this.searchInput, username);
        await this.page.waitForTimeout(2000); // Optional: short wait to let the results load
    
        // Wait for the user link to be present
        await this.page.waitForSelector(`a[href="/${username}/"]`, { timeout: 60000 });
        await this.page.click(`a[href="/${username}/"]`);
    }

    async sendMessage(message) {
    const messageButton = 'div[role="button"]:has-text("Message")';
    const textareaSelector = 'div[role="textbox"]';

    await this.page.waitForSelector(messageButton, { timeout: 120000, state: 'visible' });
    await this.page.click(messageButton);
    
    console.log('Waiting for the textarea to be visible...');
    await this.page.waitForSelector(textareaSelector, { timeout: 300000, state: 'visible' });
    
    console.log('Textarea is now visible.');

    // Set the message
    await this.page.evaluate((message) => {
        const textarea = document.querySelector('div[role="textbox"]');
        textarea.focus();
        textarea.innerText = message; // Directly set the message
        textarea.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
    }, message);

    console.log(`Sending message: ${message}`);
    await this.page.keyboard.press('Enter'); // Send the message
    console.log('Message sent.');

    // Wait to ensure the message is sent
    await this.page.waitForTimeout(2000); // Optional wait to confirm the action
}

      
}

module.exports = HomePage;
