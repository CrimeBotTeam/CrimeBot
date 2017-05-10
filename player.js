//code to handle player actions

'use strict'

const express = require('express');
const request = require('request');
const db = require('./db.js');
const fb = require('./fb.js');

//eventually need to make this less static
var action_deck_file = require('./data/action_cards_starter.json');
var action_deck = action_deck_file.action_cards_starter;

function addMoney(user_id, userObj, amount){
  console.log("got to addMoney function");
  userObj.money = userObj.money + amount;
  db.setUserFieldById(user_id, "money", userObj.money);
  fb.sendText(user_id, "money added. you now have $"+userObj.money);
}

function drawFromActionDeck(){
  //pick three cards from action deck at random
  var cards = [];
  var nums = [];
  while (nums.length < 3) {
    var draw = randomIntInc(1,action_deck.length)
    if(nums.indexOf(draw) > -1) continue;
    nums[nums.length]=draw;
    cards[nums.length]=action_deck[draw];
  }

  //print out cards to console to confirm it works
  console.log(nums);
  console.log(nums[0]+" & "+nums[1]+" & "+nums[2]);
  console.log(cards);

  //send cards back to game function

}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = {
	addMoney:addMoney,
  drawFromActionDeck:drawFromActionDeck
};
