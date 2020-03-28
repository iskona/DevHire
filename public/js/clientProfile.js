
var projectNameTitle;
displayClientProfile();
// Get method to display client info on the clientProfile page load.
function displayClientProfile() {
    $.get("/api/client").then(function (data) {
        $("#clientName").text(data.firstName + " " + data.lastName);
        $("#clientDescription").text(data.description);
        $("#clientEmail").text(data.email);
        $("#clientcontact").text(data.contact)
        $("#clientcompany").text(data.company);

    });
}
$(".edit").on("click", function(event){
    event.preventDefault();
    window.location.replace("/client")
})
/*  Clicking  on "Post new project" would  trigger an event listener hide 
client profile and display project detail form*/

$("#postProject").on("click", function (event) {
    $(".clientProf").addClass("d-none");
    $(".postProjectPage").removeClass("d-none")
})

/* Form submit event listener */
$(".project-Form").on("submit", function (event) {
    event.preventDefault();
    var projectData = {
        title: $("#projectName").val().trim(),
        skills: $("#projectSkills").val().trim(),
        description: $("#projectDescription").val().trim(),
    }
    console.log(projectData);
    if (!projectData.title || !projectData.title || !projectData.title) {
        console.log("Please fill out all the neccessary details");
        return;
    }
    postProjectDetail(projectData)
});

/* Post method to post new project data */
function postProjectDetail(projectData) {
    $.post("/api/project", projectData)
        .then(function () {
            $(".clientProf").removeClass("d-none");
            $(".postProjectPage").addClass("d-none")
        })
        .catch(function (err) {
            console.log(err);
        });
}
/*get method to fetch all developer info from developer db and display in dropdown */
function getDeveloperList() {
    $.get("/api/developer_data").then(function (data) {
        for (let i = 0; i < data.length; i++) {
            console.log(data)
            $("#developerlist").append(`
            <div class="card w-50 optionCards">
                <div class="card-body">
                    <h5 class="card-title font-weight-bold pull-left">${data[i].fullName.toUpperCase()}</h5>
                    <button class="selectDev btn btn-primary  float-right" data-developerEmailId="${data[i].email}">Assign</button>
                    <br>
                   <p></p>
                    <p class="card-text">Experience: ${data[i].experience}yrs</p>
                    <p class="card-text">Skills: ${data[i].skills}</p>
                    <p><a  class ="githubLink"href=" ${data[i].portfolioLink}" target ="_blank"> PortFolio</a></p>
                </div>
            </div> <br>`);
        }

        $(".selectDev").on("click", function (event) {
            event.preventDefault();
            console.log($(this));
            var projectId = $(".selectedProjectTitle").attr("data-projectId");
            var developerEmailId = $(this).attr("data-developerEmailId");

            var projectData = {
                developerEmailId: developerEmailId,
                projectId: projectId
            }

            // console.log(projectTitle);
            updateDeveloper(projectData)
        })
    })
}

/*Get method to fetch all the project associated with the client And display. */

$("#allPosting").on("click", function (event) {
    event.preventDefault();
    $.get("/project").then(function (data) {
        $(".clientProf").addClass("d-none");
        $(".projectTablePage").removeClass("d-none")
        console.log(data);
        if (data.length === 0) {
            $("#openProjectAccordians").append(
                $(
                    "<h4>There are no Open projects at this moment.</h4>"
                )
            );
        }
        else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].status === "open") {
                    var projectCard = $("<div class='card'>");
                    projectCard.html(`<div class="card-header" id="heading${i}">
                              <h5 class="mb-0">
                                  <button class="btn btn-link  collapsed" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                  ${data[i].title}
                                  </button>
                              </h5>
                              </div>
                              <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordion">
                              <div class="card-body">
                              <h4>Description:</h4> ${data[i].description}
                             <br><hr>
                             <button class="assignDevBtn btn btn-primary" data-projectId="${data[i].id}" data-projectTitle="${data[i].title}">Assign Developer</button>
                              </div>
                             </div>`);
                    $("#accordion").append(projectCard);
                }
                else if (data[i].status === "assigned") {
                    var projectCard = $("<div class='card'>");
                    projectCard.html(`<div class="card-header" id="heading${i}">
                              <h5 class="mb-0">
                                  <button class="btn btn-link  collapsed" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                  ${data[i].title}
                                  </button>
                              </h5>
                           </div>
                           <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordion">
                              <div class="card-body">
                             <h4>Description:</h4> ${data[i].description}
                             <br><hr>
                             <h4>developerEmail:</h4> ${data[i].developerEmail}
                              </div>
                           </div>`);
                    $(".assignedProjectAccordians").append(projectCard);

                }
                else {
                    var projectCard = $("<div class='card'>");
                    projectCard.html(`<div class="card-header" id="heading${i}">
                              <h5 class="mb-0">
                                  <button class="btn btn-link  collapsed" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                  ${data[i].title}
                                  </button>
                              </h5>
                           </div>
                           <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordion">
                              <div class="card-body">
                             <h4>Description:</h4> ${data[i].description}
                             <br><hr>
                             <h4>Developer Assigned:</h4> ${data[i].developerEmail}
                              </div>
                           </div>`);
                    $(".completedProjectAccordians").append(projectCard);
                }
            }
        }


        $(".assignDevBtn").on("click", function (event) {
            event.preventDefault();
            $(".assignDeveloperPage").removeClass("d-none")
            $(".projectTablePage").addClass("d-none")
            console.log($(this));
            var projectId = $(this).attr("data-projectId");
            var projectTitle = $(this).attr("data-projectTitle");
            console.log(projectTitle);
            $(".optionDiv").removeClass("d-none")
            $(".projectTablePage").addClass("d-none")
            $(".selectedProjectTitle").append(" " + projectTitle);
            $(".selectedProjectTitle").attr("data-projectId", projectId);
            getDeveloperList();
        })

    });
});
function updateDeveloper(projectData) {
    $.ajax({
        method: "PUT",
        url: '/api/updateProject',
        data: projectData,
    }).then(function () {
        $(".displayMessage").text("Thankyou ! We will notify you once the user has acepted the offer")
        // window.location.href = "/clientProfile";
    })

}
