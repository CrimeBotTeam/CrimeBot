//code to talk to the mongoose player database

'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User', {
  _id: String,
  nickname: String,
  money: Number,
  xp: Number,
  current_state: String
});

/**
 * Asynchronous method
 * If userId doesn't exist in DB, create a new doc. Else, just update key->val.
 * @param user_id
 * @param key
 * @param val
 */
function setUserFieldById(user_id, key, val) {
    User.findById(user_id, function (err, userObj) {
        if (err) {
            console.log(err);
            // User is found. modify key->val
        } else if (userObj) {
            userObj[key] = val;
            userObj.save(function (err) {
            });
            console.log('User '+user_id+' exists. Saving current ' +key+' state:', userObj[key]);
        }
        // New user. Add it to module
        else {
            getAndSetNewUser(user_id);
        }
    });
}



//NEED TO ADD A GET USER FIELD METHOD

/**
 * Asynchronous method
 * If user is not in DB, create new user doc.
 * @param user_id
 */
function getAndSetNewUser(user_id) {
    // Default user info. Additional info can be set if using additional facebook API for image and name retrieval.
    var user = new User({
        "_id": user_id,
        "nickname": "",
        "money": 0,
        "xp": 0,
        "current_state": "welcome_message"
    });
    user.save(function (err, userObj) {
        if (err) {
            console.log(err);
        } else {
            console.log('New User ' + user_id + '. saved new user:', userObj);
        }
    });
}

/**
 * Get user info by facebook id. This is called when ICM arrives.
 * @param user_id
 * @param incomingMessage
 * @param callback
 */
function getUserById(user_id, incomingMessage, callback) {
    var result = null;
    //Lets try to Find a user
    User.findById(user_id, function (err, userObj) {
        if (err) {
            console.log(err);
        } else if (userObj) {
            result = userObj;
            console.log('User ' + user_id + ' exists. Getting current user object:', userObj);
        } else {
            console.log('User not found!');
        }
        // After getting user object, forward to callback method.
        callback(user_id, incomingMessage, userObj);
    });
}

function deleteUser(user_id){
  User.findById(user_id, function (err, userObj) {
    if (err) throw err;
    // delete him
    userObj.remove(function(err) {
      if (err) throw err;
      console.log('User successfully deleted!');
    });
  });
}

function getAll(callback){
  // get all the users
  console.log("got into getAll");
  console.log(User);
  User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log("got all users");
  callback(users);
});
}

module.exports = {
    setUserFieldById:setUserFieldById,
    getUserById:getUserById,
    getAndSetNewUser:getAndSetNewUser,
    deleteUser:deleteUser,
    getAll:getAll
};
