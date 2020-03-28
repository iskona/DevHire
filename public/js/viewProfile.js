/* eslint-disable prettier/prettier */
$(document).ready(function() {
  //get the user's email id to auto populate in the email field.
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $.get("/api/developer_data/" + data.email).then(function(developerData) {
      console.log(developerData);
   for (var key in developerData) {
      console.log(key+" = "+developerData[key]);
      if(key === "fullName"){
          var fullnameEl = $(`<div class="row">
                            <div class="col-3">
                                <p class="">Full Name:</p>
                            </div>
                            <div class="col-8">
                                <p class="">${developerData[key]}</p>
                            </div>
                             </div>`);
            $(".personal").append(fullnameEl);
      }
      else
      if(key === "email"){
        var emailEl = $(`<div class="row">
                          <div class="col-3">
                              <p class="">Email:</p>
                          </div>
                          <div class="col-8">
                              <p class="">${developerData[key]}</p>
                          </div>
                           </div>`);
          $(".personal").append(emailEl);
    }
    else
    if(key === "contact" && developerData[key] !== "" ){
      var contactEl = $(`<div class="row">
                        <div class="col-3">
                            <p class="">Contact:</p>
                        </div>
                        <div class="col-8">
                            <p class="">${developerData[key]}</p>
                        </div>
                         </div>`);
        $(".personal").append(contactEl);
  }
  else
  if(key === "skills"){
    var skillsEl = $(`<div class="row">
                      <div class="col-3">
                          <p class="">Skills:</p>
                      </div>
                      <div class="col-8">
                          <p class="">${developerData[key]}</p>
                      </div>
                       </div>`);
      $(".professional").append(skillsEl);
}
else
if(key === "experience"){
  var experienceEl = $(`<div class="row">
                    <div class="col-3">
                        <p class="">Experience:</p>
                    </div>
                    <div class="col-8">
                        <p class="">${developerData[key]}</p>
                    </div>
                     </div>`);
    $(".professional").append(experienceEl);
}
else
if(key === "portfolioLink" && developerData[key] !== "" ){
  var portfolioLinkEl = $(`<div class="row">
                    <div class="col-3">
                        <p class="">Link to Portfolio:</p>
                    </div>
                    <div class="col-8">
                        <p class="">${developerData[key]}</p>
                    </div>
                     </div>`);
    $(".professional").append(portfolioLinkEl);
}
   }
    });
  });
});
  