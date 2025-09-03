import Joi from 'joi';
import SessionSchemas from './sessions.schema.js';

const searchMessagesSchema = Joi
  .object({
    folder: Joi.string().default('INBOX'),
    sentSince: Joi.date().iso(),
    sentBefore: Joi.date().iso(),
    from: Joi.string().email(),
    to: Joi.string().email(),
    sessionId: SessionSchemas.sessionIdSchema.required(),
    limit: Joi.number().integer().min(1).max(100)
      .default(10),
    offset: Joi.number().integer().min(0)
      .default(0),
  })
  .required()
  .messages({
    'any.required': 'Request params are required and cannot be empty.',
    'object.base': 'Request body must be a valid object.',
  });

export default { searchMessagesSchema };
