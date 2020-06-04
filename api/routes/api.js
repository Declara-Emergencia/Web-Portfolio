const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../db/models/user.model');
const jwt = require('jsonwebtoken')
const db = "mongodb://testuser:testpw@ds123136.mlab.com:23136/eventsdb";
// mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});

/**
 * GET /users
 * Purpose: Get all users
 */
router.get('/users', (req, res) => {
    // Return an array of all the users in the database
    User.find({}).then((users) => {
        res.send(users);
    });
});

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            //user.remove(({ "_id": { "$oid": "5ed88e0d06d3692608ff94ae" } }));
            res.status(200).send(registeredUser)
        }
    })
})  

router.delete("/user/:id", function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, deletedUser) {
        if(err){
            res.send("error deleting user");
        }
        else{
            res.json(deletedUser);
        }
    });
});

module.exports = router;
