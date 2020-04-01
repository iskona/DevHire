$(document).ready(function() {
  var clientFname = $("#clientFname");
  var clientLname = $("#clientLname");
  var clientEmail = $("#clientEmail");
  var clientContact = $("#clientContact");
  var clientCompany = $("#clientCompany");
  var clientDesc = $("#clientDesc");
  var signUpForm = $("form.signup-form");
  var clientAlreadyExists = false;

  $.get("/api/user_data").then(function(data) {
    console.log(data);
    clientEmail.val(data.email);
    clientEmail.attr("disabled", "true");
  });

  $.get("/api/client")
    .then(function(data) {
      clientFname.val(data.firstName);
      clientLname.val(data.lastName);
      clientContact.val(data.contact);
      clientCompany.val(data.company);
      clientDesc.val(data.description);
      clientAlreadyExists = true;
    })
    .catch(function() {});

  // When the form is submitted, we validate there's an email and password entered
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: clientFname.val().trim(),
      lastName: clientLname.val().trim(),
      email: clientEmail.val().trim(),
      contact: clientContact.val(),
      company: clientCompany.val().trim(),
      description: clientDesc.val().trim()
    };
    console.log(userData);
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.contact
    ) {
      console.log("Please fill out all the neccessary details");
      return;
    }
    saveClientDetails(userData);
  });
  function saveClientDetails(userData) {
    if (clientAlreadyExists === false) {
      $.post("/api/client", userData)
        .then(function() {
          window.location.replace("/clientProfile");
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      $.ajax({
        method: "PUT",
        url: "/api/client",
        data: userData
      })
        .then(function() {
          window.location.replace("/clientProfile");
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
});
