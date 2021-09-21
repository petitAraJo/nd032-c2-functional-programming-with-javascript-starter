let store = {
	user: { name: "Student" },
	apod: "",
	rovers: ["Curiosity", "Opportunity", "Spirit"],
	roverData: [
		{
			rover: {
				name: "",
				launchDate: "",
				landingDate: "",
				status: "",
				recentDate: "",
			},
			earthDate: "",
		},
	],
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
	store = Object.assign(store, newState);
	render(root, store);
};

const render = async (root, state) => {
	root.innerHTML = App(state);
};

// create content
const App = (state) => {
	let { roverData } = state;

	return `
        <main>
			<h1>${roverData[0].rover.name}</h1>
			<section id='info'>
				<div id='roverInfo'>
					<ul>
						<li>Launch Date: ${roverData[0].rover.launch_date}</li>
						<li>Landing Date: ${roverData[0].rover.landing_date}</li>
						<li>Status: ${roverData[0].rover.status}</li>
						<li>Date the most recent photos were taken: ${roverData[0].earth_date}</li>
						<li>Most recently available photos: </li>
					</ul>
				</div>
				<div id='roverPhoto'>
					<ul>
						<li><img class="mostRecentPhotoFromRover"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg">
						</li>
						<li><img class="mostRecentPhotoFromRover"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg">
						</li>
						<li><img class="mostRecentPhotoFromRover"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg">
						</li>
						<li><img class="mostRecentPhotoFromRover"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg">
						</li>
						<li><img class="mostRecentPhotoFromRover"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg">
						</li>
						<li><img class="mostRecentPhotoFromRover"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg">
						</li>
						<li><img class="mostRecentPhotoFromRover"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg">
						</li>
						<li><img class="mostRecentPhotoFromRover"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg">
						</li>
					</ul>
				</div>
			</section>
        </main>
        <footer></footer>
    `;
};
const AppOld = (state) => {
	let { rovers, apod } = state;

	return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(apod)}
            </section>
            <button id='curiosity'>curiosity</button>
        </main>
        <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
	render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
	if (name) {
		return `
            <h1>Welcome, ${name}!</h1>
        `;
	}

	return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
	// If image does not already exist, or it is not from today -- request it again
	const today = new Date();
	const photodate = new Date(apod.date);
	console.log(photodate.getDate(), today.getDate());

	console.log(photodate.getDate() === today.getDate());
	if (!apod || apod.date === today.getDate()) {
		getImageOfTheDay(store);
	}

	// check if the photo of the day is actually type video!
	if (apod.media_type === "video") {
		return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
	} else {
		return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
	}
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
	let { apod } = state;

	fetch(`http://localhost:3000/apod`)
		.then((res) => res.json())
		.then((apod) => updateStore(store, { apod }));

	return data;
};

// rover's photo API call
const navButtons = document.getElementsByClassName("nav-rovers");
const navButtonsArray = [...navButtons];
navButtonsArray.forEach((buttonHTMLElement) => {
	buttonHTMLElement.addEventListener("click", function navButtonsHandler(e) {
		const buttonHTMLElementValue = e.target.value;
		console.log(buttonHTMLElementValue);
		getRoverData(`/rovers`, buttonHTMLElementValue);
	});
});

const getRoverData = async (state) => {
	const responseRoverData = await fetch(
		`http://localhost:3000/rovers/curiosity`
	);
	const roverData = await responseRoverData.json();
	updateStore(store, { roverData });
	console.log(roverData);

	// return data;
};

// async function getRoverData(state) {
// 	// let { apod } = state;

// 	try {
// 		const responseRoverData = await `http://localhost:3000/rover/:name`;
// 		const roverData = await responseRoverData.json();
// 		console.log(roverData);
// 		// .then((apod) => updateStore(store, { apod }));
// 	} catch (error) {
// 		console.log("error", error);
// 	}
// }
