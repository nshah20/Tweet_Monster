
var wreck = require('wreck')
var http = require('http')
var Twitter = require('twitter')

var client = new Twitter({
    consumer_key: "swAZ1dIOGKezh1wbLcA5AaI2W",
    consumer_secret: '1Ab5D7aaKaTbIdSWwzrvBTDoTZww6M3q2PyyIaiDki6SGBl8Nj',
    access_token_key: '2643608462-36u05xo75380yztQpLZrGc9ATLbEDpQ0TiBb9BN',
    access_token_secret: '4ejsoZFGF4t2H5XFvWWqQ2FrTOTYueboJ0BMnxF5QyIRt'

})   



module.exports = client
