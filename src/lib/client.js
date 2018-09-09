import axios from 'axios';

var client = axios.create({
    baseURL: 'http://localhost/api/v2',
    timeout: 3000,
});

client.setBaseParams = (params) => {
  return Object.assign(params, {
    api_key: 'JnXP77mTuDeGpF6nWcuFRX8XecjJAt6R',
    uuid: 'test',
  });
}

client.getPostData = (options) => {
  options = client.setBaseParams(options);

  var params = new URLSearchParams();
  for (var i in options) {
    params.append(i, options[i]);
  }

  return params;
}

client.getQueryData = (params) => {
  return {
    params: client.setBaseParams(params),
  }
}

export default client;
