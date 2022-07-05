const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const User = require('../models/user')

// GET /user/userId
// public
// create a new user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params
    if (!userId || userId === '') return res.status(400).json('Please enter a user name')

    return User.findById(userId)
        .then((user) => res.json(user))
        .catch(err => res.status(400).json(err))
})

// POST /user
// public
// create a new user
router.post('/', async (req, res) => {
    const { user } = req.body
    if (!user || user === '') return res.status(400).json('Please enter a user name')

    const existingUser = await User.findOne({ name: user })
    if (existingUser) return res.json(existingUser)

    return User
        .create({ name: user })
        .then((newUser) => res.json(newUser))
        .catch(err => res.status(400).json(err))
})

module.exports = router