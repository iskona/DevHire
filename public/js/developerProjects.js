$(document).ready(function () {
    //get all the projects where developer email = "current developer email" from database projects table
    $.get("/api/user_data").then(function (data) {
        var email = data.email;
        getNewProjectOffers(email);
        getOngoingProjects(email);
        getProjectsinReview(email);
    });

    function getNewProjectOffers(email) {
        $.get("/api/openProjects/" + email).then(function (newProjects) {
            console.log(newProjects);
            if (newProjects.length === 0) {
                $("#accordion2").append(
                    $(
                        "<h4>There are no New Project Offers yet.</h4>"
                    )
                );
            } else {
                $("#accordion2").append(
                    $("<small>Click on each project title to see the details</small>")
                );
                newProjects.forEach(function (element, i) {
                    console.log(i + "----" + element.title);
                    var projectCard = $("<div class='card'>");
                    projectCard.html(`<div class="card-header" id="heading${element.id}">
                              <h5 class="mb-0">
                                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${element.id}" aria-expanded="false" aria-controls="collapse${element.id}">
                                  ${element.title}
                                  </button>
                              </h5>
                           </div>
                           <div id="collapse${element.id}" class="collapse" aria-labelledby="heading${element.id}" data-parent="#accordion2">
                              <div class="card-body">
                             <h4>Description:</h4> ${element.description}
                             <br><hr>
                             <h4 class="mt-2">Client:</h4>  ${element.clientEmail}
                             <br><hr>
                             <button class="acceptBtn btn btn-primary" data-projectId="${element.id}">Accept</button>
                             <button class="rejectBtn btn btn-primary" data-projectId="${element.id}">Reject</button>
                              </div>
                           </div>`);
                    $("#accordion2").append(projectCard);
                });
                 //add event listener to the Accept project button
                $(".acceptBtn").on("click", function () {
                    var projectId = $(this).attr("data-projectId");
                    var updateProjectStatus = {
                        id: projectId,
                        status: "assigned"
                    }
                    //send a post request to update the projects table status column
                    $.ajax({
                        method: "PUT",
                        url: "/api/updateAssigned",
                        data: updateProjectStatus
                    })
                        .then(function () {
                            window.location.reload();
                        });
                });
                //add event listener to the Accept project button
                $(".rejectBtn").on("click", function () {
                    var projectId = $(this).attr("data-projectId");
                    var deleteDeveloperId = {
                        id: projectId,
                        developerEmail: null
                    }
                    //send a post request to update the projects table status column
                    $.ajax({
                        method: "PUT",
                        url: "/api/deleteDeveloperId",
                        data: deleteDeveloperId
                    })
                        .then(function () {
                            window.location.reload();
                        });
                });
            }
        });
    }

    function getOngoingProjects(email) {
        $.get("/api/assignedProjects/" + email).then(function (projectsData) {
            console.log(projectsData);
            if (projectsData.length === 0) {
                //display a message saying "There are no Ongoing projects yet. Find the projects in the below section"
                $("#accordion1").append($("<h4>There are no Ongoing projects yet.</h4>"));
            }
            else {
                $("#accordion1").append($("<small>Click on each project title to see the details</small>"));
                projectsData.forEach(function (element, i) {
                    console.log(i + "----" + element.title);
                    var projectCard = $("<div class='card'>");
                    projectCard.html(`<div class="card-header" id="heading${element.id}">
                              <h5 class="mb-0">
                                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${element.id}" aria-expanded="false" aria-controls="collapse${element.id}">
                                  ${element.title}
                                  </button>
                              </h5>
                           </div>
                           <div id="collapse${element.id}" class="collapse" aria-labelledby="heading${element.id}" data-parent="#accordion1">
                              <div class="card-body">
                             <h4>Description:</h4> ${element.description}
                             <br><hr>
                             <h4 class="mt-2">Client:</h4>  ${element.clientEmail}
                             <br><hr>
                             <button class="submitProjectBtn btn btn-primary" data-projectId="${element.id}">Mark it as Done</button>
                              </div>
                           </div>`);
                    $("#accordion1").append(projectCard);
                });
                //add event listener to the Submit project button
                $(".submitProjectBtn").on("click", function () {
                    var projectId = $(this).attr("data-projectId");
                    var updateProjectStatus = {
                        id: projectId,
                        status: "done"
                    };
                    //send a post request to update the projects table status column
                    $.ajax({
                        method: "PUT",
                        url: "/api/updateDone",
                        data: updateProjectStatus
                    })
                        .then(function () {
                            window.location.reload();
                        });
                });
            }
        });
    }
    function getProjectsinReview(email) {
        $.get("/api/doneProjects/" + email).then(function (doneProjects) {
            console.log(doneProjects);
            if (doneProjects.length === 0) {
                $("#accordion3").append(
                    $(
                        "<h4>There are no Projects in Review.</h4>"
                    )
                );
            } else {
                $("#accordion3").append(
                    $("<small>Click on each project title to see the details</small>")
                );
                doneProjects.forEach(function (element, i) {
                    console.log(i + "----" + element.title);
                    var projectCard = $("<div class='card'>");
                    projectCard.html(`<div class="card-header" id="heading${element.id}">
                              <h5 class="mb-0">
                                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${element.id}" aria-expanded="false" aria-controls="collapse${element.id}">
                                  ${element.title}
                                  </button>
                              </h5>
                           </div>
                           <div id="collapse${element.id}" class="collapse" aria-labelledby="heading${element.id}" data-parent="#accordion3">
                              <div class="card-body">
                             <h4>Description:</h4> ${element.description}
                             <br><hr>
                             <h4 class="mt-2">Client:</h4>  ${element.clientEmail}
                             <br>
                              </div>
                           </div>`);
                    $("#accordion3").append(projectCard);
                });
            }
        });
    }
});//the end
