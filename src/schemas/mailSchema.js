const requestSchema = {
  type: 'object',
  required: ['from', 'to', 'cc', 'bcc', 'body'],
  items: {
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
