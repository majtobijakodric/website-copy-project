// Select the first element with class 'input-div' from the DOM and store it in a constant
const input = document.querySelector('.input-div');

// Add an event listener to the input element that listens for the 'blur' event
// The 'blur' event fires when the element loses focus (user clicks away or tabs out)
input.addEventListener('blur', () => {
    // Add the CSS class 'touched' to the input element
    input.classList.add('touched');
});