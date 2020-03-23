/* eslint-disable prettier/prettier */
$(document).ready(function() {
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
    console.log("--------");
    
    console.log(details);
    // $.post("api/developer",{
    //   fullName: details.fullName,
    //   email: details.email,
    //   contact : details.contact,
    //   skills : details.skills,
    //   experience : details.experience,
    //   portfolioLink : details.portfolioLink,
    //   pastProjects : details.pastProjects,
    //   activeProjects : details.activeProjects
    // })
    //   .then(function(){
    //     window.location.replace("/signup");
    //   })
    //   .catch(console.log("error handler"));
    // var email= "madhu@chittella.com";
    // var password = "testing";
    // var role = "engineer";
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
      .then(function (data) {
        console.log(data);
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
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
