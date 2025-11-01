// Get the password input and toggle icons
const passwordInput = document.getElementById('password');
const showIcon = document.querySelector('.password-toggle.show'); // open eye
const hideIcon = document.querySelector('.password-toggle.hide'); // crossed eye

// Only run if all elements exist
if (passwordInput && showIcon && hideIcon) {
    /**
     * Toggle between showing and hiding the password
     */
    function togglePassword() {
        if (passwordInput.type === 'password') {
            // Show password as plain text
            passwordInput.type = 'text';
            // Display open eye icon
            showIcon.classList.remove('hidden');
            // Hide crossed eye icon
            hideIcon.classList.add('hidden');
        } else {
            // Hide password (show as dots)
            passwordInput.type = 'password';
            // Hide open eye icon
            showIcon.classList.add('hidden');
            // Display crossed eye icon
            hideIcon.classList.remove('hidden');
        }
    }

    // Set initial state: password hidden
    passwordInput.type = 'password';
    // Hide the open eye icon initially
    showIcon.classList.add('hidden');
    // Show the crossed eye icon initially
    hideIcon.classList.remove('hidden');

    // Add click handlers to both icons to toggle password visibility
    showIcon.addEventListener('click', togglePassword);
    hideIcon.addEventListener('click', togglePassword);
}
