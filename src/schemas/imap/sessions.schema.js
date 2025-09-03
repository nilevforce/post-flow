import Joi from 'joi';

const createSessionSchema = Joi
  .object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

const sessionIdSchema = Joi.string();

export default {
  createSessionSchema,
  sessionIdSchema,
};
