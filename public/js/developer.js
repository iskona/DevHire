/* eslint-disable prettier/prettier */
$(document).ready(function() {
  //get the user's email id to auto populate in the email field.
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $("#email-id").val(data.email);
    $("#email-id").attr("disabled","true");
  });
  var skills = [];
  function createSkillButtons() {
    var skill = $("#skill-name")
      .val()
      .trim();
   
    if(skill !== ""){
      console.log(skills);
      if(skills.indexOf(skill) === -1){
        skills.push(skill);
        var skillBtn = $("<button type='button' class='skill-btn btn btn-secondary mb-2'>").text(skill);
        $("#skill-button-group").append(skillBtn);
        $("#skill-name").val("");
      }
    }
  }
  $("#add-btn").on("click", function (event) {
    event.preventDefault();
    createSkillButtons();
  });

  $("#skill-name").keypress(function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      createSkillButtons();
    }
  });

  //on Save to Profile button click
  $("#saveBtn").on("click",function(event){
    event.preventDefault();
    //send a post request on route ('api/developer') with all the form data
    var developerData = {
      fullName : $("#first-name").val().trim()+" "+$("#last-name").val().trim(),
      email: $("#email-id").val().trim(),
      contact : $("#contact").val().trim(),
      skills : skills.toString(),
      experience : $("#experience").val().trim(),
      portfolioLink : $("#portfolio-link").val().trim()
    };
    //save the above grabbed details to database developers table
    saveToPortfolio(developerData);
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
