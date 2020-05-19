// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
// let sequelize = require("sequelize"); //dont need this here?

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
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
  app.get("/api/user_data", 
  isAuthenticated,
  function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
        // this will need to be added to in order to use this to see full user profiles

      });
    }
  });

  //need to create an api-route that sends user data for a person via search
  //will need sequalize functions
  app.get("/api/all-fish",
  isAuthenticated,
    function (req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {
        //this should send an array of all of table fishes
        db.Fish.findAll({}).then(function (results) {
          res.json(results);
        });
      }
    });

  app.get("/api/comments",  //gets all comments as an array... json data?
  isAuthenticated,
    function (req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {
        db.Comment.findAll({}).then(function (results) {
          res.json(results);
        })
      }
    }
  );


  app.get("/api/users",  //gets all users as an array... 
  isAuthenticated,
    function (req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
      } else {
        db.User.findAll({ attributes: ['id', 'email',] }).then(function (results) {
          res.json(results);
        })
      }
    }
  );

  // Search Users!
  app.get("/api/users/:id",  //works!
    function (req, res) {
      if (!req.user) {
      } else {

        idVar = req.params.id;
        db.User.findAll({
          attributes: ['id', 'email'],
          where: {
            id: idVar
          }
        }).then(function (results) {
          res.json(results);
        })
      }
    }
  );
  // search comments      NOT TESted (need some comments before can test)
  app.get("/api/comments/:id",
  isAuthenticated,
    function (req, res) {
      if (!req.user) {
      } else {

        idVar = req.params.id;
        db.Comment.findAll({
          attributes: ['id', 'title', 'comment', ['user_id', 'user'], 'category'],
          //need to make this a join later - should show user's name instead of user id
          where: {
            id: idVar
          }
        }).then(function (results) {
          res.json(results);
        })
      }
    }
  );
  // search fish    not tested, need fish to test
  app.get("/api/fish/:id",
  isAuthenticated,
    function (req, res) {
      if (!req.user) {
      } else {

        idVar = req.params.id;
        db.Fish.findAll({
          attributes: ['id', 'email'],
          where: {
            id: idVar
          }
        }).then(function (results) {
          res.json(results);
        })
      }
    }
  );


  // POSTS

  app.post("/api/comments",  //gets all comments as an array... json data?
    function (req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {
        db.Comment.findAll({}).then(function (results) {
          res.json(results);
        })
      }
    }
  );  //not tested

// NEED fish post... not tested yet

app.post("/api/fish",  //gets all comments as an array... json data?
function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    db.Comment.findAll({}).then(function (results) {
      res.json(results);
    })
  }
}
);  //not tested














};  //end of export data


// Note that API calls for people not logged in return empty arrays- if this works...
// current issue; no response (at all) if user not logged in.. this also means cannot test posts via postman...
// api gets now return user to login is not logged in
// post functions do not