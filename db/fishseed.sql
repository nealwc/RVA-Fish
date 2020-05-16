-- I am still using this to mess around and figure out mysql commands
-- I think sequelize will run this automatically if I name it "seeds" or "seed"... have not looked it up yet

INSERT INTO fishes (location, length, species, comment)
VALUES ("near a tree", 22.1, "bass", "I used bait");
-- location, length, species, comment, created-at not implemented yet
-- looks like created at is automatically done without me doing anything
-- however there is no default value... so sequelize is breaking my code because they suck