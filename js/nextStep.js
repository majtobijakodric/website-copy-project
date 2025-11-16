function initNextStep() {
    const nextButton = document.querySelector(".first-part .continue-button");
    const passwordInput = document.querySelector(".js-password-get");

    const firstPart = document.querySelector(".first-part");
    const secondPart = document.querySelector(".second-part");

    if (!nextButton || !passwordInput || !firstPart || !secondPart) return;

    // Prevent double initialization
    if (nextButton.dataset.initNextStep === "true") return;
    nextButton.dataset.initNextStep = "true";

    nextButton.addEventListener("click", (e) => {
        e.preventDefault();

        const value = passwordInput.value;

        const validLetter = /[A-Za-z]/.test(value);
        const validNumberOrSpecial = /[\d\W]/.test(value);
        const validTenChars = value.length >= 10;

        const isValid = validLetter && validNumberOrSpecial && validTenChars;

        if (!isValid) {
            passwordInput.classList.add("touched");
            firstPart.classList.add("shake");

            setTimeout(() => firstPart.classList.remove("shake"), 400); // Optional animation
            return;
        }

        // If valid → hide first part, show second part
        firstPart.classList.add("hidden");
        secondPart.classList.remove("hidden");

        // Update step UI if needed
        const stepText = document.getElementById("step");
        const taskText = document.getElementById("task");
        const progressBar = document.getElementById("green-progress");

        if (stepText) stepText.textContent = "Step 2 of 3";
        if (taskText) taskText.textContent = "Tell us about yourself";

        if (progressBar) progressBar.style.width = "66%";
    });
}

window.initNextStep = initNextStep;
document.addEventListener("DOMContentLoaded", initNextStep);
