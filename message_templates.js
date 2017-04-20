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
  }
};

module.exports = {
	templates: templates
};
