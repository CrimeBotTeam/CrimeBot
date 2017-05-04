#!/usr/bin/env node

'use strict'

const express = require('express');
const request = require('request');

var cardsJSON = require('../data/action_cards_starter.json');
var actionDeck = JSON.parse(cardsJSON);

console.log(actionDeck);
