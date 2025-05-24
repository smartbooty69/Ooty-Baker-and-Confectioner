document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var usernameInput = document.getElementById("username");//get all the values from form
        var passwordInput = document.getElementById("password");
        var errorMessage = document.getElementById("error-message");
  
        if (usernameInput && passwordInput && errorMessage) {
            var username = usernameInput.value.toLowerCase();//to convert the username and passwords into lower case
            var password = passwordInput.value.toLowerCase();
  
            // Immediately check credentials without IP verification
            if (username === "admin" && password === "admin") {
                // Redirect to the desired page after successful login
                window.location.href = "dashboard.php";
            } else {
                // Display error message below the submit button
                errorMessage.textContent = "Invalid username or password.";
            }
        } else {
            console.error('One or more elements not found.');
        }
    });
  });
  