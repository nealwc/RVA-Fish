// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
let passport = require("./config/passport");

// Setting up port and requiring models for syncing
let PORT = process.env.PORT || 8080;
let db = require("./models");

// Creating express app and configuring middleware needed for authentication
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force: true}).then(function() {
  // DONT FORGET TO REMOVE FORCE: TRUE WHEN WE ENTER PRODUCTION
  // may want to test {force: false, alter: true}
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
