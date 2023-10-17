require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
const cors = require('cors')
app.use(cors())
app.use(express.static("public"))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

function get_stun_config(){
  
  
}

function get_config(){
  let configuration = {iceServers : []};
  let stun_server_uris = process.env.STUN_SERVER_URIS.split(",");
  stun_server_uris.forEach((stun_server)=>{configuration.iceServers.push({urls: stun_server, username: "", credential: ""})})
  let turn_server_uris = process.env.TURN_SERVER_URIS.split(",");
  turn_server_uris.forEach((turn_server)=>{configuration.iceServers.push({
                    urls: turn_server, username: process.env.TURN_SERVER_USERNAME,
                    credential: process.env.TURN_SERVER_PASSWORD})})
  return configuration;
}

app.get('/configuration', (request, response) => {
  console.log(get_config());
  response.json(get_config());
});

console.log("TURN_SERVER_URIS", process.env.TURN_SERVER_URIS)
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
