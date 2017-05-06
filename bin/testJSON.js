#!/usr/bin/env node

'use strict'

const express = require('express');
const request = require('request');

var cardsJSON = require('../data/action_cards_starter.json');
//var actionDeck = JSON.parse(cardsJSON);
//looks like the rquire command is making a good guess at the type
//so i dont need to parse the json again

console.log(cardsJSON);
//console.log(actionDeck);

//check error in json file (From compiler)
