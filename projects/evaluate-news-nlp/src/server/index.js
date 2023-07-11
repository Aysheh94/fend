var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());


app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
     res.sendFile('dist/index.html');
   // res.sendFile(path.resolve('src/client/views/index.html'))
});

//send api key to client side
/*app.get('/get_data', (req, res) => {
    res.send({ key: API_KEY });
});*/

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
})

// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
//console.log(`Your API Key is ${process.env.API_KEY}`);
let userInput = [] 


// POST Route
app.post('/api', async function(req, res) {
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`

    const response = await fetch(apiURL)
    const mcData = await response.json()
    console.log(mcData)
    res.send(mcData)
    /** server sends only specified data to the client with below codes
     * const projectData = {
     *  score_tag : mcData.score_tag,
     *  agreement : mcData.agreement,
     *  subjectivity : mcData.subjectivity,
     *  confidence : mcData.confidence,
     *  irony : mcData.irony
     * }
     * res.send(projectData);
     * */
})

