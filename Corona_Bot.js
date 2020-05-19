const Discord = require("discord.js");
const client = new Discord.Client();
client.login("NjkzMjc2OTI0MTgwNjkzMDYy.XoAVzg.iAJDoMRC4RIoSVRwvDkhBnOqTpU");
const fetch = require("node-fetch");
const worldUrl = "https://coronavirus-19-api.herokuapp.com/all";
const countryUrl = "https://coronavirus-19-api.herokuapp.com/countries/";
const stateUrl = "https://covidtracking.com/api/v1/states/current.json";

// Discord bot is ON
client.on("ready", () => {
	console.log("Bot is connected as " + client.user.tag);
	let status = "";
	client.user.setPresence({});
});

client.on("message", receivedMessage => {
	if (receivedMessage.author == client.user) {
		return;
	}

	if (receivedMessage.content.startsWith("!")) {
		Commands(receivedMessage);
	}
	// Donnie command
	if (
		receivedMessage.content.includes("donnie") ||
		receivedMessage.content.includes("Donnie")
	) {
		receivedMessage.channel.send("donnie is a faggot.");
	}
	if (
		receivedMessage.content.includes("joey") ||
		receivedMessage.content.includes("Joey")
	) {
		receivedMessage.channel.send("Joey is the man.");
	}
	if (
		receivedMessage.content.includes("nizo") ||
		receivedMessage.content.includes("nizar") ||
		receivedMessage.content.includes("Nizo") ||
		receivedMessage.content.includes("Nizar")
	) {
		receivedMessage.channel.send("Nizo eido fi tizo.");
	}
	if (
		receivedMessage.content.includes("Mustafa") ||
		receivedMessage.content.includes("mustafa")
	) {
		receivedMessage.channel.send(
			"Don't talk shit about Mustafa, I'm recording everything."
		);
	}
	if (
		receivedMessage.content.includes("Ravi") ||
		receivedMessage.content.includes("ravi")
	) {
		receivedMessage.channel.send("Ravi's mustache is the booty clapper.");
	}
});

function Commands(receivedMessage) {
	/***** DONT FORGET TO DO THIS LATER *****/
	// const PREFIX = '!'; // add this up
	//let args = receivedMessage.content.substr(PREFIX.length).split(" ");
	// AND USE SWITCH CASES

	let fullCommand = receivedMessage.content.substr(1);
	//let command;
	// !corona
	if (fullCommand.substr(0, 6) == "corona") {
		command = fullCommand.substr(7);

		// help command
		if (command.length >= 4) {
			if (command.slice(0, 4) === "help") {
				// receivedMessage.channel.send("Covid-19 Bot commmands: \nType !corona with following commands below." +
				//     "\nworld  - to get corona virus information" +
				//     "\ncountry <country name>  - to get corona virus information of the country." +
				//     "\nstate <us state abbreviation>  - to get corona virus information of the state.");

				const help = new Discord.MessageEmbed()
					.setTitle("Help")
					.setColor(0xff0000)
					.setDescription(
						"Covid-19 Bot commmands: \nType !corona with following commands below." +
							"\nworld  - to get corona virus information" +
							"\ncountry <country name>  - to get corona virus information of the country." +
							"\nstate <us state abbreviation>  - to get corona virus information of the state."
					);
				receivedMessage.channel.send(help);
			}
		} else if (command.length >= 5) {
			if (command.slice(0, 5) == "world") {
				//console.log("world")
				world(receivedMessage);
			}
		} else if (command.length >= 7) {
			if (command.slice(0, 7) == "country") {
				//console.log("country")
				var country = command.substr(8);
				countries(receivedMessage, country);
			}
		} else if (command.length >= 5) {
			if (command.slice(0, 5) == "state") {
				//console.log("state")
				var state = command.substr(6);
				states(receivedMessage, state);
			}
		} else {
			return;
		}
	} else {
		return;
	}
}

// request the website for information about corona virus worldwide
async function world(receivedMessage) {
	const response = await fetch(worldUrl);
	/*
		WATCH THIS 
		https://www.youtube.com/watch?v=mxK8b99iJTg&t=884s
	*/
	const data = await response.json();
	console.log(data); // just for terminal information
	const world = new Discord.MessageEmbed()
		.setTitle("World")
		.setColor(0xff0000)
		.setDescription(
			" - Cases: " +
				data.cases +
				"\n - Deaths: " +
				data.deaths +
				"\n - Recovery: " +
				data.recovered
		);
	receivedMessage.channel.send(world);
}

async function countries(receivedMessage, country) {
	console.log(countryUrl + country);
	const response = await fetch(countryUrl + country);
	const data = await response.json();
	const countries = new Discord.MessageEmbed()
		.setTitle("Countries")
		.setColor(0xff0000)
		.setDescription(
			" - Cases: " +
				data.cases +
				"\n - Deaths: " +
				data.deaths +
				"\n - Recovery: " +
				data.recovered
		);
	receivedMessage.channel.send(countries);
}

async function states(receivedMessage, state) {
	state = state.toUpperCase();
	console.log(stateUrl);
	console.log(state);
	const response = await fetch(stateUrl);
	const data = await response.json();
	// just for terminal information
	for (i in data) {
		if (data[i].state == state) {
			const states = new Discord.MessageEmbed()
				.setTitle("States")
				.setColor(0xff0000)
				.setDescription(
					data[i].state +
						"\n - Cases: " +
						data[i].positive +
						"\n - Deaths: " +
						data[i].death +
						"\n - Recovery: " +
						data[i].recovered
				);
			receivedMessage.channel.send(states);
		}
	}
}
