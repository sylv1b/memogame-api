const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        numberOfTries: {
            type: Number,
            required: true
        },
        numberOfPairs: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);

module.exports = Game = mongoose.model("game", GameSchema);