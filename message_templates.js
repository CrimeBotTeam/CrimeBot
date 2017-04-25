// Enter your templates and postbacks here for clarification of code
// Right now there are two examples here.
let templates = {
	"welcome_message": {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "button",
				"text": "Hello and welcome to your first bot. Would you like to get see our products?",
				"buttons": [
					{
						"type": "postback",
						"title": "Yes",
						"payload": "get_options"
					},
					{
						"type": "postback",
						"title": "No",
						"payload": "no_options"
					}
				]
			}
		}
	},
	"options_message": {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [
					{
					"title": "Hard",
					"subtitle": "Dave",
					"image_url":"http://newswatchtv.com/wp-content/uploads/2015/11/Amazon-Echo.jpg"
					},
					{
						"title": "Medium",
            "subtitle": "Justin",
						"image_url":"http://www.computerlegacy.com/wp-content/uploads/2015/08/nest_protect.jpg"
					},

					{
						"title": "Easy",
						"subtitle": "Jon-Paul",
						"image_url":"http://i0.wp.com/www.thebinarytrend.com/wp-content/uploads/2015/03/Apple-Watch-logo-main1.png"
					}
				]
			}
		}
	},
	"capo_list_static": {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [
					{
					"title": "Crazy Ivan",
					"subtitle": "\"Robberies are my speciality\"",
					"image_url":"https://s3-us-west-1.amazonaws.com/jpedumont-crimebot/capo_eben.jpg",
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact Crazy Ivan",
	            "payload":"CAPO_CRAZY_IVAN_CONTACT"
	          }
	        ]
					},
					{
					"title": "Smoothie",
					"subtitle": "\"Business dont run itself, boss\"",
					"image_url":"https://s3-us-west-1.amazonaws.com/jpedumont-crimebot/capo_dave.jpg",
					"buttons":[
						{
							"type":"postback",
							"title":"Contact Smoothie",
							"payload":"CAPO_SMOOTHIE_CONTACT"
						}
					]
					},
					{
					"title": "Moonlight Maude",
					"subtitle": "\"At Night, I get away with anything\"",
					"image_url":"https://s3-us-west-1.amazonaws.com/jpedumont-crimebot/capo_erin.jpg",
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact Moonlight",
	            "payload":"CAPO_MOONLIGHT_CONTACT"
	          }
	        ]
					},
					{
					"title": "Triple Shot",
					"subtitle": "\"Twice the speed, twice the payoff\"",
					"image_url":"https://s3-us-west-1.amazonaws.com/jpedumont-crimebot/capo_jonpaul.jpg",
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact Triple Shot",
	            "payload":"CAPO_TRIPLESHOT_CONTACT"
	          }
	        ]
					},
					{
					"title": "Mister Juice",
					"subtitle": "\"I drink your milkshake\"",
					"image_url":"https://s3-us-west-1.amazonaws.com/jpedumont-crimebot/capo_lean.jpg",
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact Mister Juice",
	            "payload":"CAPO_MISTER_JUICE_CONTACT"
	          }
	        ]
					}
				]
			}
		}
	},
	"family_options":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What can I tell you?",
        "buttons":[
          {
            "type":"postback",
						"title":"My Net Worth",
            "payload":"NET_WORTH_PAYLOAD"
          },
          {
            "type":"postback",
            "title":"My Armory",
            "payload":"ARMORY_PAYLOAD"
          }
        ]
      }
    }
  },
	"quick_reply_test":{
		"text":"Pick a color:",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Red",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED",
        "image_url":"http://petersfantastichats.com/img/red.png"
      },
      {
        "content_type":"text",
        "title":"Green",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN",
        "image_url":"http://petersfantastichats.com/img/green.png"
      }
    ]
  },
"greeting_template":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"So you want to start your own empire?",
        "buttons":[
          {
            "type":"postback",
						"title":"Tell me more",
						"payload":"TUTORIAL_PAYLOAD"
          },
          {
            "type":"postback",
						"title":"Meet my Capos",
						"payload":"CAPOS_PAYLOAD"
          }
        ]
      }
    }
  },
"tutorial_template":{
	"attachment":{
		"type":"template",
		"payload":{
			"template_type":"button",
			"text":"Hire Capos to do the dirty work of criminal jobs, running rackets or fighitng off the opposition.",
			"buttons":[
				{
					"type":"postback",
					"title":"Meet my Capos",
					"payload":"CAPOS_PAYLOAD"
				}
			]
		}
	}
},
"capo_job_template":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"I'm free boss. What do you want me to do?",
        "buttons":[
          {
            "type":"postback",
						"title":"Collect Protection Money / \u231a 10s",
						"payload":"JOB_1"
          },
          {
            "type":"postback",
						"title":"Rob a Truck / \u231a 20s",
						"payload":"JOB_2"
          },
					{
            "type":"postback",
						"title":"Hit a Rival Target / \u231a 30s",
						"payload":"JOB_3"
          }
        ]
      }
    }
  },
};

module.exports = {
	templates: templates
};
