'use strict';

const INVITE_USER_URL = "https://slack.com/api/users.admin.invite";
const REMOVE_USER_URL = "https://slack.com/api/users.admin.setInactive"
const API_TOKEN = "xoxp-110366361298-110442433684-109660194592-8961710290a9d4d212ba290517c73e49";
const Hapi = require('hapi');
const Request = require('request');
const Slackbot = require('slackbot');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path:   '/addUser',
    handler: function (request, reply) {
        Request.post(INVITE_USER_URL + "?token=" + API_TOKEN + "&set_active=true + &email=bpaothat@asu.edu", function (error, response, body) {
            if (error) {
                return console.log("Error", error);
            } 
            
            if (response.statusCode !== 200) {
                return console.log("Invalid Status Code:", response.statusCode);
            }
            
            console.log(body);
        });
    }
});

//ERROR: PAID USERS ONLY
server.route({
    method: 'GET',
    path:   '/removeUser',
    handler: function (request, reply) {
        Request.post(REMOVE_USER_URL + "?_x_id=aad026e8-1480444008.068" +  "&token=" + API_TOKEN + "&set_active=true", function (error, response, body){
            if (error) {
                return console.log("Error", error);
            } 
            
            if (response.statusCode !== 200) {
                return console.log("Invalid Status Code:", response.statusCode);
            }
            
            console.log(body);
        });
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at: ', server.info.uri);
});
 