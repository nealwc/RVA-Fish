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

+ User should not need more than email and password right?
- all the other tables can simply be joined to user by user's automatically generated id
- 
 
+ added {force: true} within sync on server so that database drops existing tables when we edit them
- needed to do this in order to add attribute columns to user table
- will need to remove this when we enter production