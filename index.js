
if (process.env.NODE_ENV !== 'usingEnv') {
    require('dotenv').config();
  }
var mqtt = require('mqtt')
var options = {
    port: 1883, //don't put 8883 because it's encrypted 
    host: 'mqtt://' + 'y15wsi.messaging.internetofthings.ibmcloud.com', //put your ibm cloud host in the empty string
    clientId: 'a:y15wsi:' + Math.random().toString(16).substr(2, 8), // a:orgId: in the empty string
    username: 'a-y15wsi-cioirhzcbm', // your API key
    password: 'Q6wsAaIQsRYK5dr@*f', // your API token
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client  = mqtt.connect(options.host, options) 
var data = {msgIs : 'node js app is here'};
var data = JSON.stringify(data);
client.on('connect', function () {
  
  client.subscribe('iot-2/type/ESP8266/id/dev01/evt/status/fmt/json', function (err) {
    if (!err) {
        console.log('subscribe done succesfully!');
        client.publish('iot-2/type/ESP8266/id/dev01/evt/status/fmt/json', data)
    }
  })

})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  
})
client.on('error', function(err) {
    console.log(err);
});