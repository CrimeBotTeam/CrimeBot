//main game logic, including the primary parse logic

'use strict'

const express = require('express');
const request = require('request');
const db = require('./db.js');
const fb = require('./fb.js');
const player = require('./player.js');
const message_templates = require('./message_templates.js');
let date = require('date-and-time');
var action_deck = require('./data/action_cards_starter.json').action_cards_starter;

var userObj; //need to create way to keep this updated after Db action

//this is main body of game logic. boy is it long!
//it takes the user_id, the message and a copy of the userObject
//then it goes through a long if/then logic tree to figure out what to with the message
//in some case its actually parsing the message's string to figure out what to do
function parseIncoming(user_id, messageItem, userObj) {
	var current_state = "welcome_message";
	if (userObj != null) {
		current_state = userObj.current_state;
	}
	console.log("beginning ICM if statements. Message item is:");
	console.log(messageItem);
	// If the user sends us anything with a payload
	if ((messageItem.postback && messageItem.postback.payload)){
		var button_payload_state = messageItem.postback.payload;

		console.log("Received postback "+button_payload_state);

		if(button_payload_state.substring(0, 7) == "CONTACT"){
			//player wants to talk to a capo
			if(button_payload_state == "CONTACT_0"){
				//looks like the capo slot they want is empty
				fb.sendText(user_id, "Hire a Capo first to do jobs");
				fb.sendText(user_id, "Contact a different capo?");
				fb.sendGeneric(user_id,message_templates.capo_list_template(userObj.capos));
			} else {
				//player has reached an actual capo
				//this is the capos number:
				var capo_number = parseInt(button_payload_state.slice(8));
				//now draw possible job actions from the current action deck
				var these_cards = player.drawFromActionDeck();
				//send a message asking which of these jobs to send the capo on
				fb.sendText(user_id,"I'm free boss, what do you want me to do?");
				fb.sendGeneric(user_id,message_templates.capo_job_template(these_cards, capo_number));
			}
		} else if (button_payload_state == "CAPOS_PAYLOAD") {
			//the player wants to view their capos
			if (userObj.capos[0] != null) {
				//since tehre are actually capos, display them all in a carasel
				fb.sendGeneric(user_id,message_templates.capo_list_template(userObj.capos));
			} else {
				//there are no capos for this player, send them on the flow to use the cheat
				fb.sendGeneric(user_id, message_templates.templates["quick_reply_no_capos"]);
			}
		} else if (button_payload_state.includes("JOB")) {
			//player selected a job action to send a capo on
			//use some logic to parse the payload string and figure out which capo and which job
			let this_job_id = parseInt(button_payload_state.substring(3, 5),10);
			let this_capo_id = parseInt(button_payload_state.substring(9, 11),10);
			let this_capo = player.capos_database[this_capo_id];
			let this_job = player.action_deck[this_job_id];
			//figure out what time it is now and when the job will finish
			let now = new Date();
			let notifTime = date.addMinutes(now, this_job.duration);
			console.log("capo "+this_capo.name+" will do job "+this_job.name);
			//send all this info to the db to save into the database.
			//this is a good possible spot to add better logic, such as checking
			//if the player already has a notif scheduled and to also save all the active jobs
			db.setDoJob(user_id,this_capo,this_job,notifTime, function(updatedObj){
				userObj = updatedObj;
				console.log("updated user object form notif set");
				fb.sendText(user_id,"ok boss, i'll be done around " + date.format(notifTime, 'h:mm'));
			});
		} else {
			console.log("starting case with "+button_payload_state);
			//some basic possible messages and what to reply with
			switch (button_payload_state) {
				case "get_options":
				fb.sendGeneric(user_id, message_templates.templates["options_message"]);
				break;
				case "no_options":
				fb.sendText(user_id, "Ok. There is so much you can do with stateful bots!");
				break;
				case "Greeting":
				fb.sendGeneric(user_id,message_templates.templates["greeting_template"]);
				break;
				case "FAMILY_REPORT_PAYLOAD":
				fb.sendGeneric(user_id,message_templates.templates["family_options"]);
				break;
				case "NET_WORTH_PAYLOAD":
				fb.sendGeneric(user_id,message_templates.templates["quick_reply_test"]);
				break;
				case "TUTORIAL_PAYLOAD":
				fb.sendGeneric(user_id,message_templates.templates["tutorial_template"]);
				break;
				case "DB_PAYLOAD":
				fb.sendText(user_id,""+userObj);
				break;
				case 'STORE_PAYLOAD':
				//this is repeat code from the quick reply payload
				fb.sendGeneric(user_id,message_templates.templates["quick_reply_hire_capo_cheat"]);
				break;
				default:
				//generic response for when the bot gets a payload but we didnt do anything with it
				fb.sendText(user_id,"you want to "+button_payload_state);
				break;
			}
		}
	}

	//if user sent with a quick reply
	else if (messageItem.message.quick_reply && messageItem.message.quick_reply.payload){
		console.log("got a quick reply "+messageItem.message.quick_reply.payload);
		switch (messageItem.message.quick_reply.payload) {
			case 'STORE_PAYLOAD':
			fb.sendGeneric(user_id,message_templates.templates["quick_reply_hire_capo_cheat"]);
			break;
			case 'COLLECT_PAYLOAD':
				//THIS NEEDS A LOT
				//the player has responsded to the scheduled notifcation by tapping the "Collect" button
				//now we need actual logic to grab the right job and award the money, then clear out the capo's job
				//(which we arent even really saving yet)
				//then prompt the player to do something with the capo again
				fb.sendText(user_id,"lets collect your money");
			break;
			case 'STORE_HIRE_CAPO_CHEAT':
			//assign random capos to the player as if they have hired all 5 themselves
			db.setUserFieldByIdReturnObj(user_id,"capos",player.getRandomCapos(),function(updatedObj){
				console.log("set random capos");
				userObj = updatedObj;
				console.log("updated user object. Capos is now " + userObj.capos);
				fb.sendGeneric(user_id,message_templates.capo_list_template(userObj.capos));
			});
			break;
			default:
			//generic response if the bot received a quick reply that it did not act on
			fb.sendText(user_id,"Got a quick reply: "+messageItem.message.quick_reply.payload);
		}

	}

	else if(messageItem.message && messageItem.message.text) {
		//the player has sent a raw text response, rather than a button payload
		//try to figure out what to do
		//mostly im using this for cheat commands
		console.log("got into the message text switch");
		switch (messageItem.message.text) {
			case 'generic':
			fb.sendGeneric(user_id, message_templates.templates["welcome_message"]);
			break;
			case 'add':
			player.addMoney(user_id, userObj, 100);
			break;
			case 'reset':
			fb.sendText(user_id,"resetting your user db entry");
			db.deleteUser(user_id);
			fb.sendText(user_id,"reset");
			break;
			case 'get':
			db.getAll(function(users){
				console.log(users);}
			);
			fb.sendText(user_id,"sending full db to console log");
			break;
			default:
			//if we really dont know what to do, send this back
			fb.sendText(user_id, "I'm sorry I dont know what '" + messageItem.message.text+"' means");
		}

	}
	// Save new user state. If user does not exist in DB, will create a new user.
	//this is from original code and is probably not needed
	console.log("completed ICM if statements");
	db.setUserFieldById(user_id, "current_state", "");
}

module.exports = {
	parseIncoming:parseIncoming
};
