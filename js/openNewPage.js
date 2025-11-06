// openNewPage.js

const form = document.querySelector('form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
    }

    // Fetch the full HTML of the password step
    const response = await fetch('../sites/registration-password.html');
    const newPageHtml = await response.text();

    // Parse it as a real HTML document
    const parser = new DOMParser();
    const doc = parser.parseFromString(newPageHtml, 'text/html');

    // Replace *only* the body content with the fetched body's content
    document.body.innerHTML = doc.body.innerHTML;

    // Re-initialise the password toggle on the newly inserted DOM
    if (window.initTogglePassword) {
        window.initTogglePassword();
    }

    // If you later have a similar init for password rules, call it here:
    // if (window.initPasswordValidity) {
    //   window.initPasswordValidity();
    // }
});
