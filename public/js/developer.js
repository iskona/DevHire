/* eslint-disable prettier/prettier */
$(document).ready(function() {
  var emaiId = $("#email-id");
  var skillName = $("#skill-name");
  var firstName = $("#first-name");
  var lastName = $("#last-name");
  var experienceVal = $("#experience");
  //get the user's email id to auto populate in the email field.
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    emaiId.val(data.email);
    emaiId.attr("disabled","true");
  });
  var skills = [];
  function createSkillButtons() {
    var skill = skillName
      .val()
      .trim();
   
    if(skill !== ""){
      console.log(skills);
      if(skills.indexOf(skill) === -1){
        skills.push(skill);
        var skillBtn = $("<button type='button' class='skill-btn btn btn-secondary mb-2'>").text(skill);
        $("#skill-button-group").append(skillBtn);
        skillName.val("");
      }
    }
  }
  $("#add-btn").on("click", function (event) {
    event.preventDefault();
    createSkillButtons();
  });

  skillName.keypress(function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      createSkillButtons();
    }
  });

  //on Save to Profile button click
  $("#saveBtn").on("click",function(event){
    event.preventDefault();
    //send a post request on route ('api/developer') with all the form data
    if(firstName.val() !== "" && lastName.val() !== "" && skills.length !== 0 && experienceVal.val() !== ""){
      var developerData = {
        fullName : firstName.val().trim()+" "+lastName.val().trim(),
        email: emaiId.val().trim(),
        contact : $("#contact").val().trim(),
        skills : skills.toString(),
        experience : experienceVal.val().trim(),
        portfolioLink : $("#portfolio-link").val().trim()
      };
      //save the above grabbed details to database developers table
      saveToPortfolio(developerData);
    }
    else{
      alert("Please enter all the mandatory fields !!");
      return;
    }

  });
  function saveToPortfolio(details){
    $.post("/api/developer", {
      fullName: details.fullName,
      email: details.email,
      contact : details.contact,
      skills : details.skills,
      experience : details.experience,
      portfolioLink : details.portfolioLink,
      pastProjects : details.pastProjects,
      activeProjects : details.activeProjects
    })
      .then(function () {
        window.location.replace("/developerProfile");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
