const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send("Hello World");
})

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
