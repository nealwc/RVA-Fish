// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model

var gravatar = require('gravatar'); 
//allows hashing of email that leads to avatars
//not properly sanitized- still catches capitals and whitespace as different emails

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    gravatar_url: {
      type: DataTypes.STRING
    }
  



    //could add a total messages column...
  });
// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password
User.addHook("beforeCreate", function (user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});
User.addHook("beforeCreate", function (user) {
  let preHash = `'${user.email}'`;  //this might need a "this"
  user.gravatar_url = gravatar.url(preHash, {r: 'pg', d: 'wavatar'});
  console.log(user.gravatar_url); //worked! now need to make default different... &d=monsterid
});

//relationship
User.associate = function (models) {

  User.hasMany(models.Comment);
};
User.associate = function (models) {

  User.hasMany(models.Fish);
};


return User;
};
// I should create a gravatar hash and have it calculated here?