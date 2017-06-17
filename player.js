//code to handle player actions

'use strict'

const express = require('express');
const request = require('request');
const db = require('./db.js');
const fb = require('./fb.js');

//eventually need to make this less static
var action_deck = require('./data/action_cards_starter.json').action_cards_starter;
var capos_database = require('./data/capos_database.json').capos_database;

//going to straight up copy the full 5 item database into the player's capo list for now
var capos_all = capos_database;


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
    var draw = randomIntInc(0,action_deck.length)
    if(nums.indexOf(draw) > -1) continue;
      nums.push(draw);
      cards.push(action_deck[draw]);
  }

  //print out cards to console to confirm it works
  console.log("cards from player script");
  console.log(cards);

  //send cards back to game function
  return cards;
}

function getRandomCapos(){
    //pick five capos from capo database at random
    var randomCapos = [];
    var nums_capos = [];
    while (nums_capos.length < 5) {
      var draw_capos = randomIntInc(1,capos_all.length-1)
      console.log("random pulled "+draw_capos);
      if(nums_capos.indexOf(draw_capos) > -1) continue;
        console.log("assigning " + draw_capos + " to index " + nums_capos.length);
        nums_capos.push(draw_capos);
        randomCapos.push(capos_all[draw_capos]);
    }
    //send capos back to game function
    return randomCapos;
  }

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = {
	addMoney:addMoney,
  drawFromActionDeck:drawFromActionDeck,
  capos_all:capos_all,
  getRandomCapos:getRandomCapos,
  action_deck:action_deck,
  capos_database:capos_database
};
