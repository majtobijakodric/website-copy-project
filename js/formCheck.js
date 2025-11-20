// js/formCheck.js

function initFormCheck() {
    const secondPart = document.querySelector(".second-part");
    const thirdPart = document.querySelector(".third-part");
    const step2Button = document.getElementById("step2-next");

    if (!secondPart || !step2Button) return;

    // Avoid double init if openNewPage calls this multiple times
    if (step2Button.dataset.initFormCheck === "true") return;
    step2Button.dataset.initFormCheck = "true";

    // ---- INPUTS ----
    const nameInput = document.getElementById("name");
    const dayInput = document.getElementById("day");
    const monthSelect = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const genderRadios = document.querySelectorAll('input[name="gender"]');

    if (!nameInput || !dayInput || !monthSelect || !yearInput || genderRadios.length === 0) {
        return;
    }

    // ---- WARNINGS ----
    // Name warning: <form-div> (with input) then next sibling .warning
    const nameWarning = nameInput.closest(".form-div")?.nextElementSibling;

    // DOB warnings are inside .form-div-date in this order:
    // 0: day 1–31
    // 1: year 4 digits
    // 2: year >= 1900
    // 3: generic "Please enter your date of birth."
    const dobWarnings = secondPart.querySelectorAll(".form-div-date .warning");
    const dayWarning = dobWarnings[0];
    const yearDigitsWarning = dobWarnings[1];
    const yearRangeWarning = dobWarnings[2];
    const missingDobWarning = dobWarnings[3];

    // Gender warning is the element right after .form-div-gender
    const genderWarning = secondPart.querySelector(".form-div-gender + .warning");

    // Progress UI (already in registration-password.html)
    const stepText = document.getElementById("step");
    const taskText = document.getElementById("task");
    const progressBar = document.getElementById("green-progress");

    // Flag: we only start showing warnings after user tried to go Next once
    let allowLiveValidation = false;

    // ---- HELPERS ----
    function showWarning(el) {
        if (!el) return;
        el.classList.remove("hidden");
        // keep .warning / .warning-extra so style stays
    }

    function hideWarning(el) {
        if (!el) return;
        el.classList.add("hidden");
    }

    function markTouched(el) {
        if (!el) return;
        el.classList.add("touched");
    }

    function clearTouched(el) {
        if (!el) return;
        el.classList.remove("touched");
    }

    // ---- VALIDATORS ----

    function validateName(touch = false) {
        const value = nameInput.value.trim();
        let isValid = true;

        if (!value) {
            isValid = false;
            if (touch) {
                showWarning(nameWarning);
                markTouched(nameInput);
            }
        } else {
            hideWarning(nameWarning);
            if (touch) {
                clearTouched(nameInput);
            }
        }

        return isValid;
    }

    function validateDob(touch = false) {
        const day = dayInput.value.trim();
        const month = monthSelect.value.trim();
        const year = yearInput.value.trim();

        let isValid = true;

        // Always clear all DOB warnings first
        hideWarning(dayWarning);
        hideWarning(yearDigitsWarning);
        hideWarning(yearRangeWarning);
        hideWarning(missingDobWarning);

        // Completely empty DOB → show generic if we're allowed to show warnings
        if (!day && !month && !year) {
            if (touch) {
                showWarning(missingDobWarning);
                markTouched(dayInput);
                markTouched(monthSelect);
                markTouched(yearInput);
            }
            return false;
        }

        // Some part empty → generic "Please enter your date of birth."
        if (!day || !month || !year) {
            if (touch) {
                showWarning(missingDobWarning);
                if (!day) markTouched(dayInput);
                if (!month) markTouched(monthSelect);
                if (!year) markTouched(yearInput);
            }
            return false;
        }

        // If we reach here: all three are filled → detailed checks.

        // DAY: must be 1–31
        const dayNum = parseInt(day, 10);
        if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
            isValid = false;
            if (touch) {
                showWarning(dayWarning);
                markTouched(dayInput);
            }
        } else {
            hideWarning(dayWarning);
            if (touch) clearTouched(dayInput);
        }

        // YEAR: 4 digits, then >= 1900
        const yearNum = parseInt(year, 10);
        const yearDigitsOk = /^\d{4}$/.test(year);

        if (!yearDigitsOk) {
            isValid = false;
            if (touch) {
                showWarning(yearDigitsWarning);
                hideWarning(yearRangeWarning);
                markTouched(yearInput);
            }
        } else if (yearNum < 1900) {
            isValid = false;
            if (touch) {
                hideWarning(yearDigitsWarning);
                showWarning(yearRangeWarning);
                markTouched(yearInput);
            }
        } else {
            hideWarning(yearDigitsWarning);
            hideWarning(yearRangeWarning);
            if (touch) clearTouched(yearInput);
        }

        // Month: we only require that it's not empty (already checked above)
        if (touch) clearTouched(monthSelect);

        return isValid;
    }

    function validateGender(touch = false) {
        const anyChecked = Array.from(genderRadios).some(r => r.checked);
        let isValid = true;

        if (!anyChecked) {
            isValid = false;
            if (touch) {
                showWarning(genderWarning);
                genderRadios.forEach(r => markTouched(r));
            }
        } else {
            hideWarning(genderWarning);
            if (touch) {
                genderRadios.forEach(r => clearTouched(r));
            }
        }

        return isValid;
    }

    // ---- LIVE VALIDATION (after first "Next" click) ----

    // Name
    nameInput.addEventListener("input", () => {
        if (!allowLiveValidation) return;
        validateName(true);
    });

    // DOB
    dayInput.addEventListener("input", () => {
        if (!allowLiveValidation) return;
        validateDob(true);
    });

    monthSelect.addEventListener("change", () => {
        if (!allowLiveValidation) return;
        validateDob(true);
    });

    yearInput.addEventListener("input", () => {
        if (!allowLiveValidation) return;
        validateDob(true);
    });

    // Gender
    genderRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (!allowLiveValidation) return;
            validateGender(true);
        });
    });

    // ---- STEP 2 "NEXT" BUTTON ----

    step2Button.addEventListener("click", (e) => {
        e.preventDefault();

        // Now we want to start showing warnings on every change
        allowLiveValidation = true;

        const nameOk = validateName(true);
        const dobOk = validateDob(true);
        const genderOk = validateGender(true);

        if (!nameOk || !dobOk || !genderOk) {
            // Optional shake animation like step 1
            secondPart.classList.add("shake");
            setTimeout(() => secondPart.classList.remove("shake"), 400);
            return;
        }


        Swal.fire({
            background: "#201f1fff",
            icon: "success",
            title: "Registration successful",
            color: "white",
            confirmButtonColor: "#1DB954"
        }).then(() => {
            window.location.href = "login.html";
        });

        // All fields are valid → go to step 3
        secondPart.classList.add("hidden");
        if (thirdPart) {
            thirdPart.classList.remove("hidden");
        }

        if (stepText) {
            stepText.textContent = "";
        }
        if (taskText) {
            taskText.textContent = "Your account is registerd";
        }
        if (progressBar) {
            progressBar.style.width = "100%";
        }
    });
}

// Make callable from openNewPage.js after body swap
window.initFormCheck = initFormCheck;

// Also work if registration-password.html is opened directly (and this file is included there)
document.addEventListener("DOMContentLoaded", initFormCheck);
