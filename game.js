//main game logic, including the primary parse logic

'use strict'

const express = require('express');
const request = require('request');
const db = require('./db.js');
const fb = require('./fb.js');
const player = require('./player.js');
const message_templates = require('./message_templates.js');

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

	// If the user sends us anything with a payload
	if ((messageItem.postback && messageItem.postback.payload)){
		var button_payload_state = messageItem.postback.payload;

    console.log("Received postback "+button_payload_state);

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
			case "CAPOS_PAYLOAD":
				fb.sendGeneric(user_id,message_templates.templates["capo_list_static"]);
				break;
			case "TUTORIAL_PAYLOAD":
				fb.sendGeneric(user_id,message_templates.templates["tutorial_template"]);
				break;
			default:
        fb.sendText(user_id,"you want to "+button_payload_state);
        break;
		}
	}

	//if user sent with a quick reply
	else if (messageItem.message.quick_reply.payload){
		// need to convert this to a switch at some point
		fb.sendText(user_id,"Got a quick reply: "+messageItem.message.quick_reply.payload);
}

	// If we recieve any text message, parse and respond accordingly
	else if(messageItem.message && messageItem.message.text) {

		switch (messageItem.message.text) {
			case 'generic':
				fb.sendGeneric(user_id, message_templates.templates["welcome_message"]);
				break;
			case 'add':
				player.addMoney(user_id, userObj, 100);
				break;
			default:
			//sending a repeat back to user
			fb.sendText(user_id, messageItem.message.text+" from heroku");
		}

	}
	// Save new user state. If user does not exist in DB, will create a new user.
	db.setUserFieldById(user_id, "current_state", "");
}

module.exports = {
	parseIncoming:parseIncoming
};
