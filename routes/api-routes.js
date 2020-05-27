// Requiring our models and passport as we've configured it
let db = require("../models");
let passport = require("../config/passport");
let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {


  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data",
    isAuthenticated,
    function (req, res) {

      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        gravitat_url: req.user.gravitat_url

      });
    });


  app.get("/api/fish",
    isAuthenticated,
    function (req, res) {
      db.Fish.findAll({}).then(function (results) {
        res.json(results);
      });
    });

  app.get("/api/comments",  
    isAuthenticated,
    function (req, res) {
      db.Comment.findAll({
        // order: ['Created_At', 'DESC']
        // https://sequelize.org/master/manual/model-querying-basics.html
      }).then(function (results) {
        res.json(results);
      })
    }
  );


  app.get("/api/users",  //gets all users as an array... 
    // isAuthenticated, //decided I want to be able to see users while not signed in
    function (req, res) {
      db.User.findAll({ attributes: ['id', 'email', 'gravatar_url']}).then(function (results) {
        res.json(results);
      })
    }
  );




  // Search Users!
  app.get("/api/users/:id",  //works!
    function (req, res) {
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
  );
  // search comments      NOT TESted (need some comments before can test)
  app.get("/api/comments/:id",
    isAuthenticated,
    function (req, res) {
      idVar = req.params.id;
      db.Comment.findAll({
        attributes: ['id', 'title', 'comment', ['UserId', 'user']],
        //need to make this a join later - should show user's name instead of user id
        where: {
          id: idVar
        }
      }).then(function (results) {
        res.json(results);
      })
    }
  );
  // search fish    not tested, need fish to test
  app.get("/api/fish/:id",
    isAuthenticated,
    function (req, res) {
      idVar = req.params.id;
      db.Fish.findAll({
        attributes: ['id', 'location', 'length', 'species', 'comment'],
        where: {
          id: idVar
        }
      }).then(function (results) {
        res.json(results);
      })
    }
  );


  // POSTS  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  app.post("/api/comments",  //gets all comments as an array... json data?
    // isAuthenticated,  
    function (req, res) {
      console.log("initiating post");
      // if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
      // } else {
      db.Comment.create({
        title: req.body.title,
        comment: req.body.comment,
        UserId: req.user.id
        //email: req.user.email  // this is the data that should align with a foreign key...
      })
        .then(function (results) {
          console.log("added new comment");
        })
    }
    // }

  );  




  app.post("/api/fish",  //gets all comments as an array
    //need authentication
    function (req, res) {
      res.json({});

      db.Fish.create({
        title: req.body.title,
        species: req.body.species,
        location: req.body.location,
        length: req.body.length,
        weight: req.body.weight,
        comment: req.body.comment
        

      }).then(function (results) {
        console.log("added new record");
      })
    }
    // }
  );  
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
  //default route
  app.get('*', function (req, res) {
    res.redirect('/members');
  });


};  //end of export data
