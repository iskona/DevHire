$(document).ready(function () {

    var clientFname = $("#clientFname");
    var clientLname = $("#clientLname");
    var clientEmail = $("#clientEmail");
    var clientContact = $("#clientContact");
    var clientCompany = $("#clientCompany");
    var clientDesc = $("#clientDesc");
    var clientSave = $("#clientSave");
    var signUpForm = $("form.signup-form");

    // When the form is submitted, we validate there's an email and password entered
    signUpForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            firstName: clientFname.val().trim(),
            lastName: clientLname.val().trim(),
            email: clientEmail.val().trim(),
            contact: clientContact.val(),
            company: clientCompany.val().trim(),
            description: clientDesc.val().trim(),
        };
        console.log(userData);
        if (!userData.firstName || !userData.lastName || !userData.email || !userData.contact) {
            console.log("Please fill out all the neccessary details");
            return;
        }
        saveClientDetails(userData)
    });
    function saveClientDetails(userData) {
        $.post("/api/client", userData)
            .then(function () {
                window.location.replace("/clientProfile")
            })
            .catch(function (err) {
                console.log(err);
            });
    }
});

// to Load profile page on load 
$(window).on("load", function () {
    displayClient()
});

function displayClient() {
    $.get("/api/client")
        .then(function (data) {
            $(".member-name").text(data.firstName);
            $("#clientProfileContainer").append(
                `  <div class="card">
            <div class="row">
                <div class=" col-md-8 pl-3 m-5 " id="content">
                <h4>Personal Details :</h4>
                <br>
                    <p><b>FirstName :</b>  ${data.firstName}</p>
                    <p><b>LastName : </b>  ${data.lastName}</p>
                    <p><b>Email_ID : </b>  ${data.email}</p>
                    <p><b>Contact-No: </b> ${data.contact}</p>
                    <p></b>Company.:  </b>   ${data.company}</p>
                    <p><b>Description: </b>${data.description}</p>
                </div>
            </div>
        </div>`
            )
        })
}


