import Joi from 'joi';

async function userValidator(req, res, next) {
  try {
    const registerValidator = Joi.object({
      nickname: Joi.string().min(1).max(30).required(),
      email: Joi.string()
        .email()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().min(8).max(30),
      checkPassword: Joi.any().valid(Joi.ref('password')).required(),
    });
    const { nickname, email, password, checkPassword } =
      await registerValidator.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { userValidator };
