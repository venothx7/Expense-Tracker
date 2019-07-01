// all api endpoints go here

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthroized request")
    }
    //split it into array and get the 2nd value of the array
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send("Unauthroized request")
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send("Unauthroized request")
    }
    //reach this part if evrytin is valid
    req.userId = payload.subject
    next()
}

// Expense Routes

//Expense Model
const Expense = require('../models/Expense');

// @route GET api/expenses
// @desc Gets all expenses
// @access private
router.get('/expense', verifyToken, (req, res) => {
    Expense.find()
        .then(expenses => res.json(expenses))
        .catch(err => res.status(400).send(err));
});

// @route POST api/expense
// @desc Create a expense
// @access Public
router.post('/expense/add', (req, res) => {
    const newExpense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        types: req.body.types
    });

    //saved the new expense data to db, 
    //on success send back to server the new expense data
    newExpense.save()
        .then(expense => res.status(200).json(expense))
        .catch(err => res.status(400).send(err));
});

// @route GET api/expense/edit/:id
// @desc Gets a specific expense on id
// @access Public
router.get('/expense/edit/:id', (req, res) => {
    Expense.findById(req.params.id)
        .then(expense => res.json(expense))
        .catch(err => res.status(400).send(err));
});



// @route Post api/expense/update/:id
// @desc Updates a specific expense on id
// @access Public
router.post('/expense/update/:id', (req, res) => {
    Expense.findById(req.params.id, (err, expense) => {
        if (!expense) {
            res.status(404).send("Record not found");
        } else {
            expense.description = req.body.description;
            expense.amount = req.body.amount;
            expense.date = req.body.date;
            expense.types = req.body.types;

            expense.save().then(expense => {
                    res.json('Updated Record');
                })
                .catch(err => {
                    res.status(400).send('unable to update the database')
                });
        }
    });
});

// @route DELETE api/expense/:id
// @desc Delete a expense on id
// @access Public
router.delete('/expense/delete/:id', (req, res) => {
    Expense.findById(req.params.id)
        .then(expense => expense.remove().then(() => res.json({ sucess: true })))
        .catch(err => res.status(404).send(err));
});

//User Routes
//User Model
const User = require('../models/User');

// @route GET api/users
// @desc Gets all users
// @access Public
router.get('/user', (req, res) => {
    User.find()
        .then(users => res.json(users));
});

// @route POST api/user/register
// @desc Create a user
// @access Public
router.post('/user/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    //saved the new user data to db, 
    //on success send back to server the new user data
    newUser.save()
        .then(user => {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token })
        })
        .catch(err => res.status(400).send(err));


});

// @route POST api/user/login
// @desc login
// @access Public
router.post('/user/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send("Invalid email");
            } else { // found user, check if passwords match
                if (user.password !== userData.password) {
                    res.status(401).send("Invalid Password");
                } else { // found user and password match
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token });
                }
            }
        }
    })
})


module.exports = router;