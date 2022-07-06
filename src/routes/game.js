const express = require("express");
const router = express.Router();
const gameValidation = require('../validation/game')

const Game = require('../models/game')
const User = require('../models/user')

/** 
 * @swagger 
 * /game: 
 *   post:
 *     summary: Save a game score
 *     requestBody:
 *       required: true
 *       content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *              userId:
 *                type: string
 *              numberOfPairs:
 *                 type: integer
 *              numberOfTries:
 *                 type: integer
 *             required:
 *               - userId
 *               - numberOfPairs
 *               - numberOfTries
 *     responses:  
 *       200: 
 *         description: The saved game score
 *       400:
 *         description: Error 
 */
router.post('/', async (req, res) => {
    const errors = gameValidation(req.body)
    if (errors.hasErrors) return res.status(400).json(errors)

    const {
        userId,
        numberOfTries,
        numberOfPairs,
    } = req.body

    const userExists = await User.findById(userId)
    if (!userExists) return res.status(400).send('User does not exists')

    return Game.create({
        user: userId,
        numberOfPairs,
        numberOfTries
    })
        .then((newGame) => res.json(newGame))
        .catch((err) => res.status(400).json(err))
})

/** 
 * @swagger 
 * /game/user/:userId: 
 *   get: 
 *     summary: Get user scores by userId
 *     description: Get user scores by userId 
 *     responses:  
 *       200: 
 *         description: The requested user
 *       400:
 *         description: Error
 */
router.get('/user/:userId', (req, res) => {
    return Game.find({ user: req.params.userId })
        .then(games => res.json(games))
        .catch(err => res.json(err))
})

/** 
 * @swagger 
 * /game/leatherboard: 
 *   get: 
 *     summary: Get best scores
 *     description: Get best scores 
 *     responses:  
 *       200: 
 *         description: Success
 */
router.get('/leatherboard', async (req, res) => {
    const topUsers = await Game.aggregate([
        {
            $group: {
                _id: "$user",
                numberOfTries: { $min: "$numberOfTries" }
            }
        },
        {
            $sort: { numberOfTries: 1 }
        },
        {
            $limit: 10
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: "$user",
        },
        {
            $project: {
                name: '$user.name',
                numberOfTries: 1,
            }
        }
    ])
    return res.json(topUsers)
})

module.exports = router