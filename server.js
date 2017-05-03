//main server code that sends everything out to other code paths

'use strict'

const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const app = express();
const fb= require('./fb.js');
const db= require('./db.js');
const game= require('./game.js');
const token = process.env.PAGE_ACCESS_TOKEN;
const verify_token = process.env.VERIFY_TOKEN;

app.set('port', (process.env.PORT || 3000));

db.connect();

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Root get via http
app.get('/', function (req, res) {
	res.send('<h1>This is a Facebook Messenger bot</h1>');
});

// Facebook verification
app.get('/webhook/', verification);

// Post data from Facebook Messenger
app.post('/webhook/', webhookListener);

// Server listener
app.listen(app.get('port'), function() {
	console.log('Facebook Messenger server started on port', app.get('port'));
});

function verification(req, res) {
	if (req.query['hub.verify_token'] === verify_token) {
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong token');
}

// Facebook webhook listener for Incoming msgs. This is where the ICMs arrive and parsed accordingly
function webhookListener(req, res) {
	console.log("Got ICM");
	if (!req.body || !req.body.entry[0] || !req.body.entry[0].messaging) return console.error("no entries on received body");
	let messaging_events = req.body.entry[0].messaging;
	for (let messagingItem of messaging_events) {
		let user_id = messagingItem.sender.id;
    //HERE - this is the key function. It sends out the info to see if we have
    //a user. if not it will make a new user. either way it will pass the
    //message and the user info to the game.parseIncoming callback function
    //where the game logic code decides what to do
		db.getUserById(user_id, messagingItem, game.parseIncoming);
	}
	res.sendStatus(200);
}
