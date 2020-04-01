$(document).ready(function() {
  var firstName = $("#first-name");
  var lastName = $("#last-name");
  var emailId = $("#email-id");
  var contactEl = $("#contact");
  var experienceEl = $("#experience");
  var portfolioEl = $("#portfolio-link");
    var skills_array = [];
   // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    console.log(data);
    fillPageData(data);
  });

function fillPageData(data) {
  var email = data.email;
  $.get("/api/developer_data/" + email).then(function(developerData) {
    console.log(developerData);
    //use this data to auto populate the page
    var name = developerData.fullName.split(" ");
    firstName.val(name[0]);
    lastName.val(name[1]);
    emailId.val(developerData.email).attr("disabled","true");
    contactEl.val(developerData.contact);
    experienceEl.val(developerData.experience);
    portfolioEl.val(developerData.portfolioLink);
    createSkillButtons(developerData);
  });
}

  //makeSkillButton function makes a button for each skill after clicking on the Add button beside the skill input
  function makeSkillButton() {
    var skill = $("#skill-name")
      .val()
      .trim();
   
    if(skill !== ""){
      console.log(skills_array);
      if(skills_array.indexOf(skill) === -1){
        skills_array.push(skill);
        var skillBtn = $("<button type='button' class='skill-btn btn btn-secondary mb-2'>").text(skill);
        $("#skill-button-group").append(skillBtn);
        $("#skill-name").val("");
      }
    }
  }

//createSkillButtons function creates the skill buttons, while populating data from database
function createSkillButtons(developerData) {
    var skills = developerData.skills;
     skills_array = skills.split(",");
    for (let i = 0; i < skills_array.length; i++) {
        const element = skills_array[i];
        var skillBtn = $("<button type='button' class='skill-btn btn btn-secondary mb-2'>").text(element);
        $("#skill-button-group").append(skillBtn);
    }
}


// Updates the developer record in the database
function updateProfile(updatedProfile) {
$.ajax({
    method: "PUT",
    url: "/api/updateProfile",
    data: updatedProfile
})
    .then(function() {
    window.location.href = "/developerProfile";
    });
}

$("#add-btn").on("click", function (event) {
    event.preventDefault();
    makeSkillButton();
  });

  $("#skill-name").keypress(function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        makeSkillButton();
    }
  });

$("#updateBtn").on("click",function(event){
    event.preventDefault();
    if(firstName.val() !== "" && lastName.val() !== "" && skills_array.length !== 0 && experienceEl.val() !== ""){
      var updatedData = {
        fullName : firstName.val().trim()+" "+lastName.val().trim(),
        email: emailId.val().trim(),
        contact : contactEl.val().trim(),
        skills : skills_array.toString(),
        experience : experienceEl.val().trim(),
        portfolioLink : portfolioEl.val().trim()
      };
      updateProfile(updatedData);
    } 
    else{
      alert("Please enter all the mandatory fields !!");
      return;
    }

});
});