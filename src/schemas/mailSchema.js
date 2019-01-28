const requestSchema = {
  type: 'object',
  required: ['to', 'from', 'body'],
  properties: {
    from: {
      type: 'string',
    },
    to: {
      type: 'array',
      items: { type: 'string' },
    },
    cc: {
      type: 'array',
      items: { type: 'string' },
    },
    bcc: {
      type: 'array',
      items: { type: 'string' },
    },
    body: {
      type: 'string',
    },
  },
};

module.exports = requestSchema;
