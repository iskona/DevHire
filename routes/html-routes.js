// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/client", isAuthenticated, function(req, res) {
    res.render("clientForm");
  });

  app.get("/clientProfile", isAuthenticated, function(req, res) {
    res.render("clientProfile");
  });

  app.get("/developer", isAuthenticated, function(req, res) {
    res.render("developer");
  });

  app.get("/developerProfile", isAuthenticated, function(req, res) {
    res.render("developerProfile");
  });

  app.get("/viewUpdateDeveloper", isAuthenticated, function(req, res) {
    res.render("viewUpdateDeveloper");
  });
  //testing for chat functionality
  // app.get("/chat", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/chat.html"));
  // });
};
