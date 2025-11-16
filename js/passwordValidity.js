window.initPasswordValidation = function () {
    const passwordInput = document.querySelector(".js-password-get");
    if (!passwordInput) return;

    // REQUIREMENT SPANS
    const hasLetter = document.querySelector("#first-req .text");
    const hasNumberOrSpecial = document.querySelector("#second-req .text");
    const hasTenChars = document.querySelector("#third-req .text");

    // SVGS
    const hasLetterSvgCorrect = document.querySelector("#first-req svg.small-svg");
    const hasLetterSvgIncorrect = document.querySelector("#first-req svg:not(.small-svg)");

    const hasNumberOrSpecialSvgCorrect = document.querySelector("#second-req svg.small-svg");
    const hasNumberOrSpecialSvgIncorrect = document.querySelector("#second-req svg:not(.small-svg)");

    const hasTenCharsSvgCorrect = document.querySelector("#third-req svg.small-svg");
    const hasTenCharsSvgIncorrect = document.querySelector("#third-req svg:not(.small-svg)");


    passwordInput.addEventListener("blur", () => {
        const value = passwordInput.value;

        const validLetter = /[A-Za-z]/.test(value);
        const validNumberOrSpecial = /[\d\W]/.test(value);
        const validTenChars = value.length >= 10;

        // Red outline
        if (!validLetter || !validNumberOrSpecial || !validTenChars) {
            passwordInput.classList.add("touched");
        } else {
            passwordInput.classList.remove("touched");
        }
    });

    passwordInput.addEventListener("input", () => {
        const value = passwordInput.value;

        const validLetter = /[A-Za-z]/.test(value);
        const validNumberOrSpecial = /[\d\W]/.test(value);
        const validTenChars = value.length >= 10;

        if (validLetter) {
            hasLetter.classList.remove("is-red");
            hasLetterSvgCorrect.classList.remove("hidden");
            hasLetterSvgIncorrect.classList.add("hidden");
        } else {
            hasLetter.classList.add("is-red");
            hasLetterSvgCorrect.classList.add("hidden");
            hasLetterSvgIncorrect.classList.remove("hidden");
        }

        if (validNumberOrSpecial) {
            hasNumberOrSpecial.classList.remove("is-red");
            hasNumberOrSpecialSvgCorrect.classList.remove("hidden");
            hasNumberOrSpecialSvgIncorrect.classList.add("hidden");
        } else {
            hasNumberOrSpecial.classList.add("is-red");
            hasNumberOrSpecialSvgCorrect.classList.add("hidden");
            hasNumberOrSpecialSvgIncorrect.classList.remove("hidden");
        }

        if (validTenChars) {
            hasTenChars.classList.remove("is-red");
            hasTenCharsSvgCorrect.classList.remove("hidden");
            hasTenCharsSvgIncorrect.classList.add("hidden");
        } else {
            hasTenChars.classList.add("is-red");
            hasTenCharsSvgCorrect.classList.add("hidden");
            hasTenCharsSvgIncorrect.classList.remove("hidden");
        }

        // Red outline
        if (!validLetter || !validNumberOrSpecial || !validTenChars) {
            passwordInput.classList.add("touched");
        } else {
            passwordInput.classList.remove("touched");
        }
    });
};
