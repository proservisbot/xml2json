const assert = require('assert');
const Environment = require('../src/shared/Environment');

describe('Unit -  Environment', () => {
  it('Should be possible to create environment and get values', () => {
    const environment = new Environment({ API_KEY_SSM_PARAMETER: 'api_key' });
    assert.deepStrictEqual(environment.getApiKeySSMParameter(), 'api_key');
  });

  it('should error if not all required parameters are given', () => {
    assert.throws(() => new Environment({}), { message: 'API_KEY_SSM_PARAMETER is required' });
  });
});
