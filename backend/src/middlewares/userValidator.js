import Joi from 'joi';

async function userValidator(req, res, next) {
  try {
    const registerValidator = Joi.object({
      nickname: Joi.string().min(1).required(),
      // .pattern(new RegExp('/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g')),
      //한글, 영어, 숫자만 입력받기
      email: Joi.string()
        .email()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string()
        .required()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')),
      // 숫자, 특수문자가 각각 최소 1개이상
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
