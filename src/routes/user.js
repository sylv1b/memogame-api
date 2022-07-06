const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const User = require('../models/user')

/** 
 * @swagger 
 * /user/:userId: 
 *   get: 
 *     summary: Get user by userId
 *     description: Get user with userId 
 *     responses:  
 *       200: 
 *         description: A user
 *       400:
 *         description: Error
 *   
 */
router.get('/:userId', async (req, res) => {
    const { userId } = req.params
    if (!userId || userId === '') return res.status(400).json('Please enter a user name')

    return User.findById(userId)
        .then((user) => res.json(user))
        .catch(err => res.status(400).json(err))
})

/** 
 * @swagger 
 * /game: 
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              user:
 *                type: string
 *             required:
 *               - user
 *     responses:  
 *       200: 
 *         description: The user
 *       400:
 *         description: Error 
 */
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