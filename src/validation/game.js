const mongoose = require("mongoose");

const gameValidation = (game) => {
    const errors = { hasErrors: false }
    const {
        userId,
        numberOfTries,
        numberOfPairs,
    } = game
    if (!userId) {
        errors.userId = 'Missing user'
    }
    if (!userId || userId === '') errors.userId = 'Missing user id'
    if (!numberOfTries) errors.numberOfTries = 'Missing number of tries'
    if (!numberOfPairs) errors.numberOfPairs = 'Missing number of pairs'

    if (!mongoose.Types.ObjectId.isValid(userId)) errors.userId = 'Invalid user Id'
    if (typeof parseInt(numberOfTries) !== 'number') errors.numberOfTries = 'Invalid number of tries'
    if (typeof parseInt(numberOfPairs) !== 'number') errors.numberOfPairs = 'Invalid number of pairs'

    if (errors.userId || errors.numberOfTries || errors.numberOfPairs) errors.hasErrors = true

    return errors
}

module.exports = gameValidation 