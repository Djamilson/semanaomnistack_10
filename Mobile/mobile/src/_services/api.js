import axios from 'axios';

import localhostConfig from '~/_config/host';

const {WEBHOST, PORT} = localhostConfig;
const api = axios.create({
  // baseURL: `http://${localhostConfig.LOCALHOST}:3000`,
  baseURL: `http://${WEBHOST}:${PORT}`,
   //baseURL: `https://${WEBHOST}`,
});

export default api;
