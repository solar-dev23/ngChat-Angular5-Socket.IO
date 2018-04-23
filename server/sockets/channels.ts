import Message from '../models/message';

const configureChannels = (socket, user) => {
  socket.on('disconnect', () => {
    console.log(`[INFO] User ${user._id} disconnected!`);
    socket.broadcast.emit('userDisconnect', { user: user._id });
  });

  socket.on('send', (data) => {
    const msg = new Message({
      user: user._id,
      username: user.username,
      time: new Date(),
      content: data,
    });

    msg.save();

    const msgData = {
      msg: {
        ...msg.toObject(),
        username: user.username,
      },
    };

    socket.emit('receive', msgData);
    socket.broadcast.emit('receive', msgData);
  });

  socket.on('typing', (data) => {
    if(data && data.length > 0){
      const msgData = {
        msg: {
          username: user.username,
          status: true
        },
      };
    }else {
      const msgData = {
        msg: {
          username: user.username,
          status: false
        },
      };
    }

    socket.emit('receiveTyping', msgData);
    socket.broadcast.emit('receiveTyping', msgData);
  });

  console.log(`[INFO] User ${user._id} connected`);
};

export default configureChannels;
