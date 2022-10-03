const AWS = require('aws-sdk');
const SSMCache = require('./ssm/SSMCache');
const Environment = require('./Environment');

let ssmCache;

module.exports = () => {
  const environment = new Environment(process.env);
  const ssm = new AWS.SSM();
  if (!ssmCache) {
    ssmCache = new SSMCache({ ssm });
  }

  return {
    environment,
    ssmCache
  };
};
