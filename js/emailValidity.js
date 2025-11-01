const input = document.querySelector('.input-div');
const input2 = document.querySelector('.hidden');

// Add event listener for when the input loses focus (user clicks away)
input.addEventListener('blur', () => {
    // Mark the input as touched to enable validation styling
    input.classList.add('touched');
    if (!input.checkValidity()) {
        // Show the warning message by adding 'warning' class and removing 'hidden'
        input2.classList.add('warning');
        input2.classList.remove('hidden');
    }
});

// Add event listener for when the user types in the input
input.addEventListener('input', () => {
    if (input.checkValidity()) {
        // Hide the warning message
        input2.classList.add('hidden');
        input2.classList.remove('warning');
    }
});

