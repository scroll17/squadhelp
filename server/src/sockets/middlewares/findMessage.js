const mongoose = require("mongoose");
const { Message } = require('../../server/mongoModels/index');

module.exports = (roomId) => Message.aggregate([
    {$match: {
            conversationId: mongoose.Types.ObjectId(roomId)
        }},
    {$project: {
            _id: 0,
            conversationId: 0,
        }},
]);