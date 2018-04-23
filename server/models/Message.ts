import * as mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
  },
  time: Date,
  content: {
    type: String,
    required: true,
  },
});

if (!messageSchema.options.toObject) {
  messageSchema.options.toObject = {};
}

messageSchema.options.toObject.transform = (doc, ret) => ({
  id: ret._id,
  time: ret.time,
  content: ret.content,
});

const Message = mongoose.model('messages', messageSchema);

export default Message;
