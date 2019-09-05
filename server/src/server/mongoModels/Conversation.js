const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Conversation = new mongoose.Schema(
    {
        participants: [
            {
                type: [Number],
            }
        ],
        messages: [
            {
                type: ObjectId, ref: 'Message'
            }
        ],
    },
    {
        autoIndex: true,
        timestamps: true,
        versionKey: false,
        collection: 'ConversationCollection'
    }
);


module.exports = {
    name: 'Conversation',
    schema: Conversation
};
