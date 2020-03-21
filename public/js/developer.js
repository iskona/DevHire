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
        var skillBtn = $("<button type='button' class='skill-btn btn btn-secondary mb-2'>").html(skill + "<i class='trash-icon ml-2 fa fa-trash-o' style='display:none'></i>");
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

});
