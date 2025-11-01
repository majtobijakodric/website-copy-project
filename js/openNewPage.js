const form = document.querySelector('form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (emailInput.checkValidity()) {
        // Fetch the HTML content of the new page
        const response = await fetch('../sites/createAcc.html');

        // Get the text content of the fetched page
        const newPage = await response.text();

        // Replace the current document body with the new page content
        document.body.innerHTML = newPage;
    } else {
        // Show validation message if email is invalid
        emailInput.reportValidity();
    }
});