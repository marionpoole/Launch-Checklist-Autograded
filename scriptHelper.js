// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */

    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                            <h2>Mission Destination</h2>
                             <ol>
                                 <li>Name: ${name} </li>
                                 <li>Diameter: ${diameter} </li>
                                 <li>Star: ${star}</li>
                                 <li>Distance from Earth: ${distance} </li>
                                 <li>Number of Moons: ${moons}</li>
                             </ol>
                             <img src='${imageUrl}'/>
                        `
}


function validateInput(testInput) {

    if (testInput === "") {
        return "Empty";
    }

    if (isNaN(testInput)) {
        return "Not a Number";
    }

    if (!isNaN(testInput)) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let h2 = document.getElementById("launchStatus");

    validateInput(pilot);
    validateInput(copilot);
    validateInput(fuelLevel);
    validateInput(cargoLevel);

    if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
        return false;
    }

    if (typeof pilot === "number") {
        return "Pilot Name is a number and needs to be a name!";
    }
    if (typeof copilot === "number") {
        return "Copilot Name is a number and needs to be a name!";
    }

    if (isNaN(fuelLevel)) {
        return "Fuel Level is not a number!";
    }
    if (isNaN(cargoLevel)) {
        return "Cargo Mass is not a number!";
    }

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    if (fuelLevel < 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = `Fuel level too low for launch ${fuelLevel}`;
        h2.innerHTML = "Shuttle Not Ready for Launch";
        h2.style.color = "red"
    } else {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
    }

    if (cargoLevel > 10000) {
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        h2.innerHTML = "Shuttle Not Ready for Launch";
        h2.style.color = "red";
    } else {
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    }

    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        h2.innerHTML = "Shuttle is Ready for Launch";
        h2.style.color = 'green';
    }

}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {

    const randomIndex = Math.floor(Math.random() * planets.length);
    const randomPlanet = planets[randomIndex]
    return randomPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;