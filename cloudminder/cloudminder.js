// CloudMinder - Server dead or alive script to heartbeat our server and services
// written by john s. lee 10/08/2013
// node.js
// john.lee@cloudcar.com
// be sure to npm install the following packages:
//	requestify
//  colors
var requestify = require('requestify');
var colors = require('colors');

//variables for ease of use easy referencing
var pass = "PASS";
var fail = "FAIL";
var separator = "+++++";
var configObject = "";
var uid = "b02cc753-30d7-3307-8134-2aa1006d1e44";
var r = /\d+/g;


// read JSON file for test config runtime
var configObject = {
    "configrun": [{
        "testName": "Get User ID ",
        "pathWay": "/api/v1/users?id=",
        "execute": true
    }, {
        "testName": "Get Location LULU ",
        "pathWay": "/api/v1/command",
        "execute": true
    }, {
        "testName": "Get Location Gas",
        "pathWay": "/api/v1/command",
        "execute": true
    }, {
        "testName": "Get Location Parking ",
        "pathWay": "/api/v1/command",
        "execute": true
    }, {
        "testName": "Set Events ",
        "pathWay": "/api/v1/events",
        "execute": true
    },{
		"testName": "Geocode Testing ",
        "pathWay": "/api/v1/geocode?address=",
        "execute": true
	}]
};
//Start your engines!
console.log("Starting the CloudMinder Test Suite...".inverse);
//executing test get user id
if (configObject.configrun[0].execute) {
    try {
        requestify.get('http://cloudcar-testing.elasticbeanstalk.com' + configObject.configrun[0].pathWay + uid, {
            cookies: {
                cc: 'test:b02cc753-30d7-3307-8134-2aa1006d1e44'
            },
            dataType: 'json'
        }).then(function (response) {
            console.log("Test:  Get User ID".underline.white);
            // Get the response body (JSON parsed or jQuery object for XMLs)
            response.getBody();
            //Transform the response.body into a JSON Object
            try {
                var objectBody = JSON.parse(response.body);
            } catch (e) {
                console.log(e.message);
            }

            //Display the converted object body
            // we want to see if the name and legnth of the name and ID are greater than 0
            console.log("Result:" + objectBody.name.yellow);

            //do the length of the name and the length of the ID > 0 the tests pass
            //return PASS if the conditions are met
            //return FAIL if the conditions are not met
            if ((objectBody.name.length > 0) && (objectBody.id.length > 0))
                console.log(pass);
            else
                console.log(fail.red);

        });
    } catch (e) {
        console.log(e.message);
    };
} else {
    console.log("TEST:" + configObject.configrun[0].testName + "skipped!".blue);
};
//executing test lulu
if (configObject.configrun[1].execute) {
    try {
        requestify.request('http://cloudcar-testing.elasticbeanstalk.com' + configObject.configrun[1].pathWay, {
            method: 'POST',
            body: {
                commandId: "5ab5dda5-5d82-4de2-bdaa-48fd6ce2e78f",
                lat: 37.377639,
                lng: -122.113864,
                hypotheses: [{
                    utterance: "lulu",
                    confidence: 0.8
                }, {
                    utterance: "looloo",
                    confidence: 0.2
                }]
            },
            headers: {
                'Content-Type': 'application/json'
            },
            cookies: {
                cc: 'test:b02cc753-30d7-3307-8134-2aa1006d1e44'
            },

            dataType: 'json'
        }).then(function (response) {
            console.log(separator.rainbow);
            console.log("Test:" + configObject.configrun[1].testName.underline.white);
            // Get the response body (JSON parsed or jQuery object for XMLs)
            response.getBody();

            //Transform the response.body into a JSON Object
            try {
                var objectBody = JSON.parse(response.body);
            } catch (e) {
                console.log(e.message);
            }
            //Display the converted object body
            // we want to see how many responses the voiceFeedback gave us
            console.log("Result:" + objectBody.voiceFeedback.yellow);

            // The maximum number of elements in 5 located at index 6 of the voiceFeedbak object element
            var numresponses = objectBody.voiceFeedback;

            //do the number of responses equal the number of actual results returned in the object body
            //return PASS if the conditions are met
            //return FAIL if the conditions are not met
            if (numresponses[6] == objectBody.results.length)
                console.log(pass);
            else
                console.log(fail.red);

        });
    } catch (e) {
        console.log(e.message);
    };
} else {
    console.log("TEST:" + configObject.configrun[1].testName + "skipped!".blue);
};
// executing test gas
if (configObject.configrun[2].execute) {
    try {
        requestify.request('http://cloudcar-testing.elasticbeanstalk.com' + configObject.configrun[2].pathWay, {
            method: 'POST',
            body: {
                commandId: "755112f9-2948-447d-b11f-dc3e3acc9973",
                lat: 37.377639,
                lng: -122.113864,
                hypotheses: [{
                    utterance: "gas",
                    confidence: 0.8
                }, {
                    utterance: "gass",
                    confidence: 0.2
                }]
            },
            headers: {
                'Content-Type': 'application/json'
            },
            cookies: {
                cc: 'test:b02cc753-30d7-3307-8134-2aa1006d1e44'
            },

            dataType: 'json'
        }).then(function (response) {
            console.log(separator.rainbow);
            console.log("Test:" + configObject.configrun[2].testName.underline.white);
            // Get the response body (JSON parsed or jQuery object for XMLs)
            response.getBody();

            //Transform the response.body into a JSON Object
            try {
                var objectBody = JSON.parse(response.body);
            } catch (e) {
                console.log(e.message);
            }
            //Display the converted object body
            // we want to see how many responses the voiceFeedback gave us
            console.log("Result:" + objectBody.voiceFeedback.yellow);

            // The maximum number of elements in 5 located at index 6 of the voiceFeedbak object element
            var numresponses = objectBody.voiceFeedback;

            //do the number of responses equal the number of actual results returned in the object body
            //return PASS if the conditions are met
            //return FAIL if the conditions are not met
            if (numresponses[6] == objectBody.results.length)
                console.log(pass);
            else
                console.log(fail.red);

        });
    } catch (e) {
        console.log(e.message);
    };
} else {
    console.log("TEST:" + configObject.configrun[2].testName + "skipped!".blue);
};
// executing test parking
if (configObject.configrun[3].execute) {
    try {
        requestify.request('http://cloudcar-testing.elasticbeanstalk.com' + configObject.configrun[2].pathWay, {
            method: 'POST',
            body: {
                commandId: "755112f9-2948-447d-b11f-dc3e3acc9973",
                lat: 37.377639,
                lng: -122.113864,
                hypotheses: [{
                    utterance: "parking",
                    confidence: 0.8
                }, {
                    utterance: "paking",
                    confidence: 0.2
                }]
            },
            headers: {
                'Content-Type': 'application/json'
            },
            cookies: {
                cc: 'test:b02cc753-30d7-3307-8134-2aa1006d1e44'
            },

            dataType: 'json'
        }).then(function (response) {
            console.log(separator.rainbow);
            console.log("Test:" + configObject.configrun[3].testName.underline.white);
            // Get the response body (JSON parsed or jQuery object for XMLs)
            response.getBody();

            //Transform the response.body into a JSON Object
            try {
                var objectBody = JSON.parse(response.body);
            } catch (e) {
                console.log(e.message);
            }
            //Display the converted object body
            // we want to see how many responses the voiceFeedback gave us
            console.log("Result:" + objectBody.voiceFeedback.yellow);

            // The maximum number of elements in 5 located at index 6 of the voiceFeedbak object element
            var numresponses = objectBody.voiceFeedback;

            //do the number of responses equal the number of actual results returned in the object body
            //return PASS if the conditions are met
            //return FAIL if the conditions are not met
            if (numresponses[6] == objectBody.results.length)
                console.log(pass);
            else
                console.log(fail.red);

        });
    } catch (e) {
        console.log(e.message);
    };
} else {
    console.log("TEST:" + configObject.configrun[3].testName + "skipped!".blue);
};
if (configObject.configrun[4].execute) {
    try {
        requestify.request('http://cloudcar-testing.elasticbeanstalk.com' + configObject.configrun[4].pathWay, {
            method: 'POST',
            body: [{
                "timestamp": 1381600094025,
                "type": "paired",
                "data": {
                    "carId": "123456789"
                }
            },
            {
                "timestamp": 1381600094025,
                "type": "routeStarted",
                "data": {
                    "requestId": "123456789",
                    "destination": {
                        "pt": {
                            "lat": 37.377566,
                            "lng": -122.113879
                        }
                    },
                    "eta": 1379682000000
                }
            },
            {
                "timestamp": 1381600094025,
                "type": "routeTracking",
                "data": {
                    "requestId": "00000000-0000-0000-0000-000000000000",
                    "timeToDest": 200
                }
            },
            {
                "timestamp": 1381600094025,
                "type": "smsReceived",
                "data": {
                    "contactId": "1",
                    "phoneNumber": "408 839-9415",
                    "message": "Breakfast is now at 4009 Miranda Ave, Palo Alto CA"
                }
            },
            {
                "timestamp": 1381600094025,
                "type": "trackPlayed",
                "data": {
                    "trackId": "t29924572",
                    "title": "The Phoenix",
                    "artist": "Fall Out Boy",
                    "album": "Save Rock And Roll",
                    "albumArtUrl": "http://rdio-a.cdn3.rdio.com/album/4/2/5/00000000002b4524/3/square-200.jpg"
                }
            }],
            headers: {
                'Content-Type': 'application/json'
            },
            cookies: {
                cc: 'test:b02cc753-30d7-3307-8134-2aa1006d1e44'
            },

            dataType: 'json'
        }).then(function (response) {
            console.log(separator.rainbow);
            console.log("Test:" + configObject.configrun[4].testName.underline.white);
            // Get the response body (JSON parsed or jQuery object for XMLs)
            response.getBody();

            //Transform the response.body into a JSON Object
            try {
                var objectBody = JSON.parse(response.body);
            } catch (e) {
                console.log(e.message);
            }
            //Display the converted object body
            // we want to see how many responses the voiceFeedback gave us
            console.log("Result:" + objectBody.message.yellow);

            // The maximum number of elements in 5 located at index 6 of the voiceFeedbak object element
            var numresponses = objectBody.message;

            //do the number of responses equal the number of actual results returned in the object body
            //return PASS if the conditions are met
            //return FAIL if the conditions are not met
            if (numresponses.length > 0)
                console.log(pass);
            else
                console.log(fail.red);

        });
    } catch (e) {
        console.log(e.message);
    };
} else {
    console.log("TEST:" + configObject.configrun[4].testName + "skipped!".blue);
};
//Geocode testing
if (configObject.configrun[5].execute) {
    try {
		var parm = "289 S. San Antonio Rd. Los Altos, CA 94022";
        requestify.get('http://cloudcar-testing.elasticbeanstalk.com' + configObject.configrun[5].pathWay + parm, {
            cookies: {
                cc: 'test:b02cc753-30d7-3307-8134-2aa1006d1e44'
            },
            dataType: 'json'
        }).then(function (response) {
            console.log("Test:"+ configObject.configrun[5].testName.underline.white);
            // Get the response body (JSON parsed or jQuery object for XMLs)
            response.getBody();
            //Transform the response.body into a JSON Object
            try {
                var objectBody = JSON.parse(response.body);
            } catch (e) {
                console.log(e.message);
            }

            //Display the converted object body
            // we want to see if the name and legnth of the name and ID are greater than 0
            console.log("Result:" + "Reg:" + objectBody.label.yellow + "\n" + "LongLabel:" + objectBody.longLabel.yellow);

            //do the length of the name and the length of the ID > 0 the tests pass
            //return PASS if the conditions are met
            //return FAIL if the conditions are not met
            if ((objectBody.label.length > 0) && (objectBody.longLabel.length > 0))
                console.log(pass);
            else
                console.log(fail.red);

        });
    } catch (e) {
        console.log(e.message);
    };
} else {
    console.log("TEST:" + configObject.configrun[5].testName + "skipped!".blue);
};
