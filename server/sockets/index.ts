import * as Socket from 'socket.io';
import * as jwt from 'jsonwebtoken';
import config from '../config/config.dev';
import User from '../models/User';
import configureChannels from './channels';

const sockets = {};
const initSocket = (server) => {
  const io = new Socket(server);
	// socket.io connection
	io.on('connection', (socket) => {
	  console.log("Connected to Socket!!");

		const { token } = socket.handshake.query;
	  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('Unauthorized user');
        socket.disconnect();
        return;
      }

      const userId = decoded.id;

      if (sockets[userId]) {
        sockets[userId].disconnect();
      }

      sockets[userId] = socket;

      User.findById(userId, (err1, user) => {
        if (err1) {
          console.log('Connection error');
          socket.disconnect();
          return;
        }

        configureChannels(socket, user);
      });
    });
	});
};

export default initSocket;