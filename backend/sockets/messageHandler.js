const { createMessage } = require('../controllers/messageSocketController') 

module.exports = (io, socket) => {
  socket.on("message:create", (payload) => createMessage(socket, io, payload));
};
