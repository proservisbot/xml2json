const supertest = require('supertest');
const assert = require('assert');
const sinon = require('sinon');
const Router = require('../src/api/router');

describe('Unit: Router', () => {
  let app;
  let deps;
  const API_KEY = 'api_key';

  beforeEach(() => {
    deps = {
      ssmCache: {
        getSSMValue: sinon.stub().resolves(API_KEY)
      },
      environment: {
        getApiKeySSMParameter: sinon.stub().resolves('/ssm/key')
      }
    };
    const router = Router(deps);
    app = supertest(router);
  });

  it('Should return 200 on /xml2json when given valid XML', async () => {
    const result = await app.post('/v1/xml2json')
      .send({ xml: "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>" })
      .set('Authorization', `ApiKey ${API_KEY}`)
      .expect(200);

    assert.deepStrictEqual(result.body, {
      json: {
        note: {
          to: [
            'Tove'
          ],
          from: [
            'Jani'
          ],
          heading: [
            'Reminder'
          ],
          body: [
            "Don't forget me this weekend!"
          ]
        }
      }
    });
  });

  it('Should return 500 on /xml2json when given n0 XML', async () => {
    const result = await app.post('/v1/xml2json')
      .send({})
      .set('Authorization', `ApiKey ${API_KEY}`)
      .expect(400);

    assert.deepStrictEqual(result.body, { error: '"xml" is required' });
  });
});
