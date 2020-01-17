import * as Yup from 'yup';

export default async (req, res, next) => {
  console.log()

  try {
    const schema = Yup.object().shape({
      github_username: Yup.string().required(),
      techs: Yup.string().required(),
      latitude: Yup.string().required(),
      longitude: Yup.string().required(),
    });

    await schema.validate(req.body.data, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
