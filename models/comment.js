// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
let bcrypt = require("bcryptjs");
let Sequelize = require("sequelize");
User = require("./user");    // didnt work
// let db = require("./models");    //didnt work
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    let Comment = sequelize.define("Comment", {

        title: {
            type: DataTypes.STRING
        },
        comment: {
            type: DataTypes.STRING
        },



    });

    Comment.associate = function(models) {

        Comment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Comment;



};  // end of export
