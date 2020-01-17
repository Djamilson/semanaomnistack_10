import socketio from 'socket.io-client';
import host from '~/_config/host';

let UrlSocketWeb = '';

if (__DEV__) {
  UrlSocketWeb = `http://${host.WEBHOST}:${host.PORT}`;
} else {
  UrlSocketWeb = `https://${host.WEBHOST}`;
}

const socket = socketio(UrlSocketWeb, {
  autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
  socket.on('message', text => {
    console.log('Message:', text);
  });
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {connect, disconnect, subscribeToNewDevs};
