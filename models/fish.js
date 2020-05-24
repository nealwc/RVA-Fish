// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
let bcrypt = require("bcryptjs");
let Sequelize = require("sequelize");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Fish = sequelize.define("Fish", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        species: {   //may want to call this animal type of something- should it just be fish?
            type: DataTypes.STRING,
            allowNull: false,
            unique: false //not needed?
        },
        location: {     //need to figure out if input a string , choose string from a dropbox or use a location ID
            type: DataTypes.STRING,
            allowNull: false,
            unique: false //not needed?
        },
        length: {   //may want to call this size
            type: DataTypes.DECIMAL(10, 2),  //is two decimal points too much? what units to use?
        },
       weight: {
           type: DataTypes.DECIMAL(10,2)
       },
        comment: {
            type: DataTypes.STRING
        }
    });

    Fish.associate = function (models) {

        Fish.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };


    return Fish;



};  // end of export



