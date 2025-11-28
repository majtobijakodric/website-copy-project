// Select the <form> element on the page and add an event listener for the "submit" event
const usernames = ["maj", "nik", "bacar", "maj@gmail.com", "nik@gmail.com"];
const passwords = ["123", "Lovro12345!", "123", "123", "123"];

document.querySelector("form").addEventListener("submit", function (e) {

    e.preventDefault(); // Normally the page reloads when you submit the form; this prevents it

    // Select the input field with the id "username"
    const inputUser = document.querySelector("#username");
    const inputPass = document.querySelector("#password");

    // Get the trimmed (no extra spaces) value from the input field
    const valueUser = inputUser.value.trim();
    const valuePass = inputPass.value.trim();

    const matchedIndex = usernames.findIndex((name) => name === valueUser);
    const isValidCredentials = matchedIndex !== -1 && passwords[matchedIndex] === valuePass;

    if (isValidCredentials) {
        Swal.fire({
            background: "#201f1fff",
            icon: "success",
            title: "Login successful",
            color: "white",
            confirmButtonColor: "#1DB954"
        }).then(() => {
            window.location.href = "https://open.spotify.com/";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "The credentials you entered are incorrect. Please try again.",
            background: "#201f1fff",
        });
    }


});
