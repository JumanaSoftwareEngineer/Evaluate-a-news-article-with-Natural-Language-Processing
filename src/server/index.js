require('dotenv').config();

const path = require('path');
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const { analyse } = require('./analyse');

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))


app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})

app.post('/analyse', analyse)

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
