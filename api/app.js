const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load mongoose models
const { User, Project } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

/**
 * GET /users
 * Purpose: Get all users
 */
app.get('/users', (req, res) => {
	// Return an array of all the users in the database
	User.find({}).then((users) => {
		res.send(users);
	});
});

/**
 * POST /users
 * Purpose: Create an user
 */
app.post('/users', (req, res) => {
	// Create a new user and return it back
	// User information (fields) are passed in via the JSON request body

	let newUser = new User({
		name: req.body.name,
		picture: req.body.picture,
	});

	newUser.save().then((userDoc) => {
		res.send(userDoc);
	});
});

/**
 * PATCH /users/:id
 * Purpose: Update a specified user
 */
app.patch('/users/:id', (req,res) =>{
	// Update specified user (with the id received in the url) with new values from the JSON request body
	User.findOneAndUpdate({ _id: req.params.id }, {
		$set: req.body
	}).then(() => {
		res.sendStatus(200);
	});
});

/**
 * DELETE /users/:id
 * Purpose: Delete a specified user
 */
app.delete('/users/:id', (req,res) =>{
	// Delete specified user (with the id received in the url)
	User.findOneAndRemove({
		_id: req.params.id
	}).then((removedUserDoc) => {
		res.send(removedUserDoc);
	});
});

/**
 * GET /users/:userID/projects
 * Purpose: Get all projects from a specific user
 */
app.get('/users/:userId/projects', (req, res) => {
	// Return all projects from user with the id specified in the url
	Project.find({
		_userId: req.params.userId
	}).then((projects) => {
		res.send(projects);
	});
});

/**
 * GET /users/:userId/projects/:projectId
 * Purpose: Get a specific project from a specific user
 */
app.get('/users/:userId/projects/:projectId', (req, res) => {
	Project.findOne({
		_id: req.params.projectId,
		_userId: req.params.userId
	}).then((project) => {
		res.send(project);
	});
});

/**
 * POST /users/:userId/projects
 * Purpose: Create a new project by specific user
 */
app.post('/users/:userId/projects', (req, res) => {
	// Create a new project by the user specified by userId
	let newProject = new Project({
		title: req.body.title,
		description: req.body.description,
		thumbnail: req.body.thumbnail,
		source: req.body.source,
		date: req.body.date,
		_userId: req.params.userId
	});
	newProject.save().then((newProjectDoc) => {
		res.send(newProjectDoc);
	});
});

/**
 * PATCH /users/:userId/projects/:projectId
 * Purpose: Update an existing project
 */
app.patch('/users/:userId/projects/:projectId', (req, res) => {
	// Update an existing project specified by projectId
	Project.findOneAndUpdate({
		_id: req.params.projectId,
		_userId: req.params.userId
	}, {
		$set: req.body
	}).then(() => {
		res.sendStatus(200);
	});
});

/**
 * DELETE /users/:userId/projects/:projectId
 * Purpose: Delete a specified project
 */
app.delete('/users/:userId/projects/:projectId', (req, res) => {
	Project.findOneAndRemove({
		_id: req.params.projectId,
		_userId: req.params.userId
	}).then((removedProjectDoc) => {
		res.send(removedProjectDoc);
	});
});

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
