// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
let bcrypt = require("bcryptjs");
let Sequelize = require("sequelize");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    let Comment = sequelize.define("Comment", {

        title: {
            type: DataTypes.STRING
        },
        comment: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER
            //this should be a foreign key... do I need to do something special?
        }


    });
    return Comment;



};  // end of export
