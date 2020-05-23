# project-2

* go over column and table names 
- fish versus catch; catch would be problematic due to JS syntax "catch" already defined...
- length or size as name; what units to use (inches, cm?) and how many decimal places?
- I need to look up what happens if you add a number with 1 decimal place... errorhandling to be done later
- *location* will be most difficult decision right now
    dropdown is more work on us fnding the right locations
    -and learning how to do it?
    -might have to join by a location id...
    input is easiest to implement but makes searching by location sloppy


- all the other tables can simply be joined to user by user's automatically generated id
- 
 
+ added {force: true} within sync on server so that database drops existing tables when we edit them
- needed to do this in order to add attribute columns to user table
- will need to remove this when we enter production
* *I think sequelize is dropping the database twice because it is running out schema file!*


* sequelize has not been added to project. I required it in fish model... but it needs additional implementation
- where?

Fish RVA
Description
A simple forum where users can post comments, post pictures and details of their catch, link to the local weather report and to a local fishing report.

Installation
Node is required to run the application. To install the app run the following in the terminal:

npm install to download node modules
node server.js to start the server and run the application

Resources Utilized
bootstrap
Postman
MySQL Workbench
Heroku
node.js to run js on the server
eslint

Contributing/Questions
Carter Neal - https://github.com/nealwc
Geordin Souci - https://github.com/GormTheWyrm
Jacob Patton - https://github.com/jspatton40
Seth McNeace - https://github.com/mcneace
Tawheed Haroon - https://github.com/Tawharo