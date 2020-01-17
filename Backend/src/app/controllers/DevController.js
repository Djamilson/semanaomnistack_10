import Dev from '../schemas/Dev';
import axios from 'axios';
import parseStringAsArray from '../utils/parseStringAsArray';
import { findConnections, sendSocketMessage } from '../../websocket';

class DevController {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  }

  async store(req, res) {
    console.log('Entrou::::', req.body);
    const { github_username, techs, latitude, longitude } = req.body.data;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResp = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = apiResp.data;

      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [Number(longitude), Number(latitude)],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
      // filtrar as conexoes no máximo 10km
      // e que tem tenha no uma tecnologia
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
    return res.json(dev);
  }
}

export default new DevController();
