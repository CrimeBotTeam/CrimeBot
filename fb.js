//code to interact and talk to facebook messenger.
//listening and verification is in the main server.js

'use strict'

const express = require('express');
const request = require('request');
const db = require('./db.js');
const message_templates = require('./message_templates.js');

const token = process.env.PAGE_ACCESS_TOKEN;
const verify_token = process.env.VERIFY_TOKEN;

// Send text message
function sendText(user_id, text) {
	let messageData = { text:text };

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {
				id:user_id
			},
			message: messageData
		}
	}, callbackResponse);
}

// Send text message with callback
function sendTextAsync(user, text, callback) {
	let messageData = { text:text };

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {
				id:user
			},
			message: messageData
		}
	}, callback);
}

// Send generic template msg (could be options, images, etc.)
function sendGeneric(user_id, message_template) {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: {
			recipient: { id: user_id },
			message: message_template
		}
	}, callbackResponse);
}

// Send generic template msg (could be options, images, etc.)
function sendGenericNotifAsync(user_id, text, callback) {
	console.log("in the genericasync");
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: {
			recipient: { id: user_id },
			message: message_templates.quick_notif(text)
		}
	}, callback);
}

function callbackResponse(error, response, body) {
	if (error) {
		console.log('Error sending messages: ', error)
	} else if (response.body.error) {
		console.log('Error: ', response.body.error)
	}
}


function debugTest(){
  console.log("i got to the debug test");
}


module.exports = {
	sendText:sendText,
	sendGeneric:sendGeneric,
	sendGenericNotifAsync:sendGenericNotifAsync,
  debugTest:debugTest,
	sendTextAsync:sendTextAsync
};
