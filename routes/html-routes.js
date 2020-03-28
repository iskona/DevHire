// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index", {
      title: "DevHire"
    });
  });

  app.get("/signup", function(req, res) {
    res.render("signup", {
      title: "DevHire Sign Up",
      js: "signup.js"
    });
  });

  app.get("/login", function(req, res) {
    res.render("login", {
      title: "DevHire Log In",
      js: "login.js"
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/client", isAuthenticated, function(req, res) {
    res.render("clientForm", {
      title: "DevHire Client",
      style: "clientForm.css",
      js: "client.js"
    })
  });

  app.get("/clientProfile", isAuthenticated, function(req, res) {
    res.render("clientProfile", {
      title: "DevHire Client Profile",
      style: "clientProfile.css",
      js: "clientProfile.js"
    })
  });

  app.get("/developer", isAuthenticated, function(req, res) {
    res.render("developer", {
      title: "DevHire Developer",
      style: "developer.css",
      js: "developer.js"
    })
  });

  app.get("/developerProfile", isAuthenticated, function(req, res) {
    res.render("developerProfile", {
      title: "DevHire Developer Profile",
      style: "developerProfile.css",
      js: "developerProjects.js"
    })
  });

  //for latest view profile page
  app.get("/viewProfile", isAuthenticated, function(req, res) {
    res.render("viewProfile", {
      title: "DevHire View Developer Profile",
      js: "viewProfile.js"
    })
  });

  app.get("/view-update-developer", isAuthenticated, function(req, res) {
    res.render("viewUpdateDeveloper", {
      title: "DevHire Update Developer Profile",
      js: "developerProfile.js"
    })
  });
};
