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
          },
					{
            "type":"postback",
            "title":"My Player DB Entry",
            "payload":"DB_PAYLOAD"
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
"quick_reply_no_capos":{
	"text":"You have not hired a Capo yet",
	"quick_replies":[
		{
			"content_type":"text",
			"title":"Hire a Capo",
			"payload":"STORE_PAYLOAD",
		}
	]
},
"quick_reply_hire_capo_cheat":{
	"text":"Use the cheat to get Capos?",
	"quick_replies":[
		{
			"content_type":"text",
			"title":"CHEAT for Capos",
			"payload":"STORE_HIRE_CAPO_CHEAT",
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
        "template_type":"list",
				"top_element_style": "compact",
        //"text":"I'm free boss. What do you want me to do?",
				"elements":[
					{
						"title":"Collect Protection Money",
						"subtitle":"\u231a 10s",
						"buttons":[
		          {
		            "type":"postback",
								"title":"Do Job",
								"payload":"JOB_1"
		          }]
					},
					{
						"title":"Rob a Truck",
						"subtitle":"\u231a 20s",
						"buttons":[
		          {
		            "type":"postback",
								"title":"Do Job",
								"payload":"JOB_2"
		          }]
					},
					{
						"title":"Hit a Rival Target",
						"subtitle":"\u231a 30s",
						"buttons":[
		          {
		            "type":"postback",
								"title":"Do Job",
								"payload":"JOB_3"
		          }]
					}
				]
      }
    }
  }
};

function capo_list_template(capo_list){
	console.log(capo_list);
	return{
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [
					{
					"title": capo_list[0].name,
					"subtitle": "\""+capo_list[0].tagline+"\"",
					"image_url":capo_list[0].image,
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact "+capo_list[0].name,
	            "payload":"CONTACT_"+capo_list[0].capo_id
	          }
	        ]
					},
					{
					"title": capo_list[1].name,
					"subtitle": "\""+capo_list[1].tagline+"\"",
					"image_url":capo_list[1].image,
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact "+capo_list[1].name,
	            "payload":"CONTACT_"+capo_list[1].capo_id
	          }
	        ]
					},
					{
					"title": capo_list[2].name,
					"subtitle": "\""+capo_list[2].tagline+"\"",
					"image_url":capo_list[2].image,
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact "+capo_list[2].name,
	            "payload":"CONTACT_"+capo_list[2].capo_id
	          }
	        ]
					},{
					"title": capo_list[3].name,
					"subtitle": "\""+capo_list[3].tagline+"\"",
					"image_url":capo_list[3].image,
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact "+capo_list[3].name,
	            "payload":"CONTACT_"+capo_list[3].capo_id
	          }
	        ]
					},{
					"title": capo_list[4].name,
					"subtitle": "\""+capo_list[4].tagline+"\"",
					"image_url":capo_list[4].image,
					"buttons":[
	          {
	            "type":"postback",
							"title":"Contact "+capo_list[4].name,
	            "payload":"CONTACT_"+capo_list[4].capo_id
	          }
	        ]
					}
				]
			}
		}
	}
}

function capo_job_template(cards){
	//console.log("cards from template script");
	//console.log(cards[1]);
	//console.log(cards[2]);
	//console.log(cards[3]);
	//var cards = these_cards;
	return {
	    "attachment":{
	      "type":"template",
	      "payload":{
	        "template_type":"list",
					"top_element_style": "compact",
					"elements":[
						{
							"title":cards[0].name,
							"subtitle":"\u231a "+cards[0].duration,
							"buttons":[
			          {
			            "type":"postback",
									"title":"Do Job",
									"payload":"JOB_"+cards[0].job_id
			          }]
						},
						{
							"title":cards[1].name,
							"subtitle":"\u231a "+cards[1].duration,
							"buttons":[
			          {
			            "type":"postback",
									"title":"Do Job",
									"payload":"JOB_"+cards[1].job_id
			          }]
						},
						{
							"title":cards[2].name,
							"subtitle":"\u231a "+cards[2].duration,
							"buttons":[
			          {
			            "type":"postback",
									"title":"Do Job",
									"payload":"JOB_"+cards[2].job_id
			          }]
						}
					]
	      }
	    }
	  }
}


module.exports = {
	templates: templates,
	capo_job_template: capo_job_template,
	capo_list_template: capo_list_template
};
