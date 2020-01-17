import socket_io from 'socket.io';
import parseStringAsArray from './app/utils/parseStringAsArray';
import calculateDistance from './app/utils/calculateDistance';

let io;
const connectedUsers = [];

exports.setupWebsocket = server => {
  //console.log('server', server)
  io = socket_io(server);
  io.on('connection', async socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connectedUsers.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.include(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(element => {
    io.to(connection.id).emit(message, data);
  });
};
