// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
const charactersH = [
	{
		routeName: "yoda",
		name: "Yoda",
		role: "Jedi Master",
		age: 900,
		forcePoints: 2000
	},
	{
		routeName: "obiwan",
		name: "Obi Wan Kenobi",
		role: "Jedi Master",
		age: 38,
		forcePoints: 1800
	},
	{
		routeName: "mace",
		name: "Mace Windu",
		role: "Jedi Master",
		age: 53,
		forcePoints: 1800
	}
];
// Easter Egg characters
const charactersD = [
	{
		routeName: "goku",
		name: "Son Goku",
		role: "Super Saiya-jin",
		age: 24,
		forcePoints: "It's over 9000!"
	}
];
const charactersV = [
	{
		routeName: "darthmaul",
		name: "Darth Maul",
		role: "Sith Apprentice",
		age: 200,
		forcePoints: 1200
	},
	{
		routeName: "darthbane",
		name: "Darth Bane",
		role: "Sith Master",
		age: 46,
		forcePoints: 2500
	},
	{
		routeName: "asajj",
		name: "Asajj Ventress",
		role: "Sith Apprentice",
		age: 30,
		forcePoints: 2500
	}
];
// New Characters
const charactersE = [

];
const charactersA = charactersH.concat(charactersV, charactersE);
const characters = charactersA.concat(charactersD);
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "view.html"));
});
app.get("/addNew", function (req, res) {
	res.sendFile(path.join(__dirname, "add.html"));
});

// Display heroes
app.get("/api/charactersH", function (req, res) {
	return res.json(charactersH);
});
// Display villians
app.get("/api/charactersV", function (req, res) {
	return res.json(charactersV);
});
// Displays all characters (minus Easter Eggs)
app.get("/api/charactersA", function (req, res) {
	return res.json(charactersA);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function (req, res) {
	let chosen = req.params.character;
	console.log(chosen);

	for (let i = 0; i < characters.length; i++) {
		if (chosen === characters[i].routeName) {
			return res.json(characters[i]);
		}
	}

	return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/charactersE", function (req, res) {
	// req.body hosts is equal to the JSON post sent from the user
	// This works because of our body parsing middleware
	let newCharacter = req.body;

	// Using a RegEx Pattern to remove spaces from newCharacter
	// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
	newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
	console.log(newCharacter);
	characters.push(newCharacter);
	res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log("The Force is with PORT " + PORT);
});