require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls
//Listen for POST requests made to /api, when you receive one, call myFunc

app.get("/rovers/:name", roversHandler);

async function roversHandler(request, response) {
	//get input text
	// const choiceOfRover = request.body;
	const choiceOfRover = request.params.name;
	const roversArray = ["Curiosity", "Opportunity", "Spirit"];
	if (roversArray.find((element) => element.toLowerCase() == choiceOfRover)) {
		try {
			const roverManifestsGet = await fetch(
				`https://api.nasa.gov/mars-photos/api/v1/manifests/${choiceOfRover}/?&api_key=${process.env.API_KEY}`
			);
			const roverManifestsData = await roverManifestsGet.json();
			const roverMostRecentEarthDate =
				roverManifestsData.photo_manifest.max_date;
			const roverAPIGet = await fetch(
				`https://api.nasa.gov/mars-photos/api/v1/rovers/${choiceOfRover}/photos?earth_date=${roverMostRecentEarthDate}&api_key=${process.env.API_KEY}`
			);
			const roverAPIsData = await roverAPIGet.json();
			const roverAPIPhotoData = roverAPIsData.photos;
			const randomTenPhotoData = await shuffle(roverAPIPhotoData).slice(
				0,
				10
			);
			// console.log(randomTenPhotoData);
			return response.status(200).json(randomTenPhotoData);
		} catch (err) {
			console.log("error:", err);
			response.send("Something wrong " + request.params.name);
		}
	} else {
		response.status(404).send("Sorry, Rover name is not exist");
	}
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// async function geoHandler(req, res) {
// 	try {
// 		const geoGet = await fetch(
// 			`http://api.geonames.org/searchJSON?q=${inputLocation}&maxRows=10&username=${geoUsername}`
// 		);
// 		const geonameData = await geoGet.json();

// 		const geolist = geonameData.geonames;

// 		const geoArrayResult = geoArray(geolist);

// 		res.json({ geoData: geoArrayResult });
// }

// example API call
app.get("/apod", async (req, res) => {
	try {
		let image = await fetch(
			`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
		).then((res) => res.json());
		res.send({ image });
	} catch (err) {
		no;
		console.log("error:", err);
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
