import Joi from 'joi';
import SessionSchemas from './sessions.schema.js';

const getMailboxesSchema = Joi
  .object({
    sessionId: SessionSchemas.sessionIdSchema.required(),
  })
  .required()
  .messages({
    'any.required': 'Request params are required and cannot be empty.',
    'object.base': 'Request body must be a valid object.',
  });

export default { getMailboxesSchema };
