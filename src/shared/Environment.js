const assert = require('assert');

module.exports = class Environment {
  constructor({
    API_KEY_SSM_PARAMETER
  }) {
    assert(API_KEY_SSM_PARAMETER, 'API_KEY_SSM_PARAMETER is required');
    this.API_KEY_SSM_PARAMETER = API_KEY_SSM_PARAMETER;
  }

  getApiKeySSMParameter() {
    return this.API_KEY_SSM_PARAMETER;
  }
};
