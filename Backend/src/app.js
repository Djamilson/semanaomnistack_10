import 'dotenv/config';
import * as Sentry from '@sentry/node';
import cors from 'cors';

import express from 'express';
import 'express-async-errors';

import http from 'http';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';
import parseStringAsArray from './app/utils/parseStringAsArray';

import { setupWebsocket } from './websocket';

class App {
  constructor() {
    this.appExpress = express();
    this.server = http.Server(this.appExpress);
    //this.io = socket_io(this.server);

    setupWebsocket(this.server);

    this.corS();

    Sentry.init(sentryConfig);

   // this.connectedUsers = {};

   // this.conectaIO();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  corS() {
    this.appExpress.use(Sentry.Handlers.requestHandler());
    // this.appExpress.use(cors({ origin: false }));
    if (process.env.NODE_ENV === 'development') {
      this.appExpress.use(cors({ origin: 'http://192.168.10.103:3001' }));
    } else {
      this.appExpress.use(
        cors({
          origin: process.env.FRONT_URL,
        })
      );
    }
  }

  /* conectaIO() {
    this.io.on('connection', async socket => {
      const { latitude, longitude, techs } = socket.handshake.query;
      this.connectedUsers.push({
        id: socket.id,
        coordinates: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        techs: parseStringAsArray(techs),
      });

      const socketID = socket.id;
      if (id !== undefined) {
        this.connectedUsers[id] = { socketID, value };
        console.log('id: ', id);
        console.log('socketID, value  ', socketID, value);
        setTimeout(() => {
          socket.emit('message', 'Minhas mensagem, olá mundo!');
        });
      }

      socket.on('disconnect', function() {
         console.info(`disconnected user (id=${socket.id}).`);
      });
    });
  }
*/
  /*criaListaUser() {
    this.appExpress.use(async (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      // SocketIOListUser.allUser();
      // console.log('Minha lista connectedUsers:: ', this.connectedUsers);
      console.log('Agora vai:: ');
      //  const  lis = await Cache.allKey(socket_io);
      console.log('Agora vai:: ', await Cache.allKey(socket_io));

      return next();
    });
  }*/

  middlewares() {
    this.appExpress.use(express.json());
  }

  routes() {
    this.appExpress.use(routes);
    this.appExpress.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.appExpress.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        return res.status(500).json(err);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
