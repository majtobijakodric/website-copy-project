// Select the <form> element on the page and add an event listener for the "submit" event
window.initRegistrationAlert = function () {
    document.querySelector("form").addEventListener("submit", function (e) {

        e.preventDefault(); // Normally the page reloads when you submit the form; this prevents it

        // Select the input field with the id "username"
        // const input = document.querySelector("#username");

        // Get the trimmed (no extra spaces) value from the input field
        // const value = input.value.trim();

        // Create a new regular expression (RegExp) object using the pattern attribute from the input
        // This allows us to test if the input matches the required format (email or username)
        // const pattern = new RegExp(input.pattern);

        Swal.fire({
            background: "#201f1fff",
            icon: "success",
            title: "Registration successful",
            color: "white",
            confirmButtonColor: "#1DB954"
        });
    });
}