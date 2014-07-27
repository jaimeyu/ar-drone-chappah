var http = require('http');
var url = require('url');

var arDrone = require('ar-drone');
var client  = arDrone.createClient();



client.on('navdata', console.log);

