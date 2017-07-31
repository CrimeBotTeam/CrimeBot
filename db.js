//code to talk to the mongoose player database

'use strict'

const mongoose = require('mongoose');

const User = mongoose.model('User', {
  _id: Number,
  nickname: String,
  money: Number,
  xp: Number,
  current_state: String,
  capos: Array,
  nextCapo: String,
  nextNotifDue: Object
  //need to define a way to store all the capos and what they are doing so i can traverse it in the collect function
});

function connect(){
  mongoose.connect((process.env.MONGODB_URI),function(err){
  	if (err) {
  		console.error(err);
  		process.exit(1);
  	}
  	console.log("connected to " + process.env.MONGODB_URI);
  });
}

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

function setDoJob(user_id, capo, job, time, callback) {
    User.findById(user_id, function (err, userObj) {
        if (err) {
            console.log(err);
            // User is found. modify key->val
        } else if (userObj) {
            //console.log("initiate saving notif with capo "+capo+" and time "+time);
            //console.log(Object.prototype.toString.call(time));
            //console.log("curent values are capo "+userObj["nextCapo"]+" and time "+userObj["nextNotifDue"]);
            userObj["nextCapo"] = capo.name;
            userObj["nextNotifDue"] = time;
            //console.log("should save these values are capo "+userObj["nextCapo"]+" and time "+userObj["nextNotifDue"]);
            userObj.save(function (err) {
              console.log("saving notif");
              callback(userObj);});
        }
        // New user. Add it to module
        else {
            getAndSetNewUser(user_id);
        }
    });
}

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

function setUserFieldByIdReturnObj(user_id, key, val, callback) {
    User.findById(user_id, function (err, userObj) {
        if (err) {
            console.log(err);
            // User is found. modify key->val
        } else if (userObj) {
            userObj[key] = val;
            userObj.save(function (err) {
              console.log("finished saving. going to callback");
              callback(userObj);
            });
            console.log('User '+user_id+' exists. Saving current ' +key+' state:', userObj[key]);
        }
        // New user. Add it to module
        else {
            getAndSetNewUser(user_id);
        }
    });
}


//GET USER FIELD METHOD
function getUserFieldById(user_id, key) {
    User.findById(user_id, function (err, userObj) {
        if (err) {
            console.log(err);
            // User is found. get key->val
        } else if (userObj) {
            return userObj[key];
            console.log('User '+user_id+' exists. Returning ' +key+' state:', userObj[key]);
        }
        // New user. Add it to module
        else {
            getAndSetNewUser(user_id);
        }
    });
}

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
        "current_state": "welcome_message",
        "capos": [],
        "nextCapo": "",
        "nextNotifDue": {}
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
            //console.log('User ' + user_id + ' exists. Getting current user object:', userObj);
            console.log('User ' + user_id + ' exists. Getting current user object:');
        } else {
            console.log('User not found!');
        }
        // After getting user object, forward to callback method.
        callback(user_id, incomingMessage, userObj);
    });
}

function getUserObj(user_id, callback) {
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
        callback(userObj);
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
  console.log("getting all users");

  User.find({}, function(err, users) {
    if (err){console.log(err);}
    callback(users);
  });
}

module.exports = {
    setUserFieldById:setUserFieldById,
    setDoJob:setDoJob,
    getUserById:getUserById,
    getUserObj:getUserObj,
    getUserFieldById:getUserFieldById,
    getAndSetNewUser:getAndSetNewUser,
    deleteUser:deleteUser,
    setUserFieldByIdReturnObj:setUserFieldByIdReturnObj,
    getAll:getAll,
    connect:connect
};
