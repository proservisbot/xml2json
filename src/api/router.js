const Express = require('express');
const Joi = require('joi');
const xml2js = require('xml2js');
const checkAuthorizationMiddleware = require('./middleware/checkAuthorization');

module.exports = (dependencies) => {
  const app = Express();
  app.use(Express.json());
  app.disable('x-powered-by');

  const checkAuth = checkAuthorizationMiddleware(dependencies);

  app.post('/v1/xml2json', [checkAuth], async (req, res, next) => {
    const SCHEMA = Joi.object().keys({
      xml: Joi.string().required()
    });

    const validationResult = SCHEMA.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      const err = new Error(validationResult.error.message);
      err.status = 400;
      return next(err);
    }
    const parser = new xml2js.Parser();
    const json = await parser.parseStringPromise(req.body.xml);
    return res.json({ json });
  });

  // eslint-disable-next-line no-unused-vars
  app.use(async (err, req, res, next) => {
    const status = err.status ? err.status : 500;
    const message = err.publicMessage ? err.publicMessage : err.message;
    res.status(status).json({
      error: message
    });
  });

  return app;
};
