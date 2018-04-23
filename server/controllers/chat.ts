import Message from '../models/message';

export const getLast7Days = async (req, res) => {
  try {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const messages = await Message.find({
      time: { $gt: date.getTime() },
    }).populate('userId');

    const data = messages.map(msg => ({
      ...msg.toObject(),
      username: msg.username,
    }));

    res.send(data);
  } catch (err) {
    res.send('Got error in getAll');
  }
};

export module ChatController{};
