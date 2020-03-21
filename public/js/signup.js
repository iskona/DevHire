$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var roleInput = $("select option:selected").attr("class");
    console.log(roleInput);
    
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, roleInput);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, role) {

    $.post("/api/signup", {
      email: email,
      password: password,
      role: role
    })
      .then(function (data) {
        if ($("select option:selected").attr("class") === "client") {
          window.location.replace("/client");
        }
        else if ($("select option:selected").attr("class") === "developer") {
          window.location.replace("/developer");
        }
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(`Error. Please try again, ${err.responseJSON.errors[0].message}.`);
    $("#alert").fadeIn(500);
  }
});
