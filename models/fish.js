// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
let bcrypt = require("bcryptjs");
let Sequelize = require("sequelize");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Fish = sequelize.define("Fish", {
        location: {     //need to figure out if input a string , choose string from a dropbox or use a location ID
            type: DataTypes.STRING,
            allowNull: false,
            unique: false //not needed?

        },
        length: {   //may want to call this size
            type: DataTypes.DECIMAL(10, 2),  //is two decimal points too much? what units to use?
        },
        species: {   //may want to call this animal type of something- should it just be fish?
            type: DataTypes.STRING,
            allowNull: false,
            unique: false //not needed?
        },
        comment: {
            type: DataTypes.STRING
        }
        

       
        
    });
return Fish;



};  // end of export



