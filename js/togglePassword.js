// togglePassword.js

function initTogglePassword() {
    const passwordInput = document.getElementById('password');
    const showIcon = document.querySelector('.password-toggle.show');
    const hideIcon = document.querySelector('.password-toggle.hide');

    // If these elements don't exist, don't do anything.
    if (!passwordInput || !showIcon || !hideIcon) return;

    // Avoid double-initialisation if this gets called more than once
    if (passwordInput.dataset.toggleInitialized === 'true') {
        return;
    }
    passwordInput.dataset.toggleInitialized = 'true';

    const setState = (visible) => {
        passwordInput.type = visible ? 'text' : 'password';
        // visible = password visible → showIcon (open eye) visible, hideIcon (slashed) visible or vice versa?
        // I'll use: visible=true → slashed-eye icon visible (click to hide), open-eye hidden.
        showIcon.classList.toggle('hidden', visible);   // open eye visible when password hidden
        hideIcon.classList.toggle('hidden', !visible);  // slashed eye visible when password visible
    };

    // Initial state: password hidden
    setState(false);

    // Click open-eye → show password
    showIcon.addEventListener('click', () => setState(true));

    // Click slashed-eye → hide password
    hideIcon.addEventListener('click', () => setState(false));
}

// Make it callable from other scripts (like openNewPage.js)
window.initTogglePassword = initTogglePassword;

// If this file is included directly on a page that already
// has the password field (e.g. when opening registration-password.html directly):
document.addEventListener('DOMContentLoaded', initTogglePassword);
