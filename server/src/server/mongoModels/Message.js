const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Message = new mongoose.Schema(
    {
        time:{
            type: Date,
            required: true,
        },
        content: {
            type: String,
            required: true,
            minLength: 1,
        },
        ownerId: {
            type: Number,
            required: true,
        },
        conversationId: {
            type: ObjectId,
            ref: 'Conversation',
            required: true,
        }
    },
    {
        autoIndex: true,
        timestamps: false,
        versionKey: false,
        collection: 'MessageCollection'
    }
);


module.exports = {
    name: 'Message',
    schema: Message
};



