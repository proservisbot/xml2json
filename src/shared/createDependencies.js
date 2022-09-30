const AWS = require('aws-sdk');
const SSMCache = require('./ssm/SSMCache');
const Environment = require('./Environment');

let ssmCache;

module.exports = () => {
  const env = new Environment(process.env);
  console.log(env);
  const ssm = new AWS.SSM();
  if (!ssmCache) {
    ssmCache = new SSMCache({ ssm });
  }

  return {
    env,
    ssmCache
  };
};
