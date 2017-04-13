//code to handle player actions

'use strict'

const express = require('express');
const request = require('request');
const db = require('./db.js');
const fb = require('./fb.js');

function addMoney(user_id, userObj, amount){
  console.log("got to addMoney function");
  userObj.money = userObj.money + amount;
  db.setUserFieldById(user_id, "money", userObj.money);
  fb.sendText(user_id, "money added. you now have $"+userObj.money);
}


module.exports = {
	addMoney:addMoney
};
