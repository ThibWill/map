import axios from 'axios';

// Client ID: gTcpTHQCEa_9LPhBQzmdbA
// API Key: 9q-DLD7Q_f3Q9-WiAc0SkaeZTpLGMcDWNHdS3OEpnLqxSFu6Hr-K52J81_X5h_fZz9RADdCEgSVyqGWN8kh77LZuFs5_dboC8NicJAAB4jc-3b-E5HlmwmXKVRMIW3Yx

// Foursquare
// Client ID  TCVQA5HHTCASCE0LROS4VEDVEFL0GP1GJITLHSC5JJQOVWCG
// Client Secret   1RVM30U4DB4HD00AHT2IMRXN2NWUOPMBXQ2BEZVWJSFWJQPN

const url = 'https://api.foursquare.com/v2/venues/explore';

const FSApi = {
  exploreBuisness(params, callback) {
    return get(url, params, {}).then(resp => callback(resp.data));
  },
  autoComplete(customURL, params, callback) {
    return get(customURL, params, {}).then(resp => callback(resp.data));
  }
}

const get = function(url, parameters, headers) {
  return axios.get(url, {
    headers: {
      ...headers,
    },
    params: parameters,
  })
    .then(response => response)
    .catch(error => error);
}

export default FSApi;