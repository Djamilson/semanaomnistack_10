import Dev from '../schemas/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

class SearchController {
  async index(req, res) {
    console.log('req.query:', req.query);
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringAsArray(techs);
    console.log('1 ===::', techsArray);
    const devs = await Dev.find({
      techs: { $in: techsArray },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: 10000,
        },
      },
    });
    console.log('===::', devs);
    return res.json({ devs });
  }
}

export default new SearchController();
