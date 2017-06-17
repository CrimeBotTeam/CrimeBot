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

//really need to update this parseIncoming field. its still from the sample code.
/**
* Parse ICM based on user postback, and depending on user current state. Send relevant OGM
* @param user_id
* @param messageItem
* @param userObj
*/
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
		//console.log(button_payload_state.substring(0, 6));

		if(button_payload_state.substring(0, 7) == "CONTACT"){
			if(button_payload_state == "CONTACT_0"){
				fb.sendText(user_id, "Hire a Capo first to do jobs");
				fb.sendText(user_id, "Contact a different capo?");
				fb.sendGeneric(user_id,message_templates.capo_list_template(userObj.capos));
			} else {
				//ok this is super bad and should be broken into a better scoped function
				//i dont like how often im getting cards and passing cards feels like hot potato
				var these_cards = player.drawFromActionDeck();
				var capo_number = parseInt(button_payload_state.slice(8));
				console.log("capo number is "+capo_number);
				fb.sendText(user_id,"I'm free boss, what do you want me to do?");
				fb.sendGeneric(user_id,message_templates.capo_job_template(these_cards, capo_number));
			}
		} else if (button_payload_state == "CAPOS_PAYLOAD") {
			console.log(userObj.capos);
			if (userObj.capos[0] != null) {
				fb.sendGeneric(user_id,message_templates.capo_list_template(userObj.capos));
			} else {
				fb.sendGeneric(user_id, message_templates.templates["quick_reply_no_capos"]);
			}
		} else if (button_payload_state.includes("JOB")) {
			//fb.sendText(user_id,"not generic you want to "+button_payload_state);
			var this_job = parseInt(button_payload_state.substring(3, 5),10);
			var this_capo = parseInt(button_payload_state.substring(9, 11),10);
			var this_capo_name = player.capos_database[this_capo].name;
			let now = new Date();
			let notifTime = date.addMinutes(now, player.action_deck[this_job].duration);
			console.log("capo "+this_capo+" will do job "+this_job);
			//console.log("duration of job chosen is "+action_deck[this_job].duration);
			//console.log(player.action_deck);
			console.log("this job number is "+this_job);
			//console.log(player.action_deck[this_job]);
			console.log("current time is "+now);
			console.log("job should finish at "+notifTime);
			console.log("is that in the future? " + (notifTime > now));
			db.setNextNotif(user_id,this_capo_name,notifTime, function(updatedObj){
				userObj = updatedObj;
				console.log("updated user object form notif set");
				fb.sendText(user_id,"ok boss, i'll be done around " + date.format(notifTime, 'h:mm'));
			});
			//next up is to take this information of what capo and what job, then
			//save that info to the DB so the notifRun script
			//can check if a job has passed and award the currency
		} else {
			console.log("starting case with "+button_payload_state);
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
				//let now = new Date();
				//let future = date.addYears(now, 1);  // => Date object
				fb.sendText(user_id,"lets collect your money");
			break;
			case 'STORE_HIRE_CAPO_CHEAT':
			//need to assign random capos to the array
			db.setUserFieldByIdReturnObj(user_id,"capos",player.getRandomCapos(),function(updatedObj){
				console.log("set random capos");
				userObj = updatedObj;
				console.log("updated user object. Capos is now " + userObj.capos);
				fb.sendGeneric(user_id,message_templates.capo_list_template(userObj.capos));
			});
			break;
			default:
			fb.sendText(user_id,"Got a quick reply: "+messageItem.message.quick_reply.payload);
		}

	}

	// If we recieve any text message, parse and respond accordingly
	//NOTE I think this is broken

	else if(messageItem.message && messageItem.message.text) {
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
			//sending a repeat back to user
			fb.sendText(user_id, "echo " + messageItem.message.text);
		}

	}
	// Save new user state. If user does not exist in DB, will create a new user.
	console.log("completed ICM if statements");
	db.setUserFieldById(user_id, "current_state", "");
}

module.exports = {
	parseIncoming:parseIncoming
};
