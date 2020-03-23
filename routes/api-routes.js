// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function(data) {
        console.log(data.role);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      role: req.user.role,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        role: req.user.role,
        id: req.user.id
      });
    }
  });
  /*Create a new client */
  app.post("/api/client", function (req, res) {
    console.log(req.body);
    db.Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      company: req.body.company,
      description: req.body.description,
    }).then(function (results) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(results);
    }).catch(function (err) {
      res.status(401).json(err);
    });;
  });

  /*Get client information*/
  app.get("/api/client", function (req, res) {
    // not logged in 
    // unauthorised error.
    // loged in
    var emailid = req.user.email;
    console.log(emailid);
    db.Client.findOne({
      where: {
        email: emailid
      }
    }).then(function (results) {
      res.json(results);
    });
    /// get the data
  });
};
