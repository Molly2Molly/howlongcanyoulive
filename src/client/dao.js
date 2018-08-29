import axios from 'axios';

const urlprefix_online = 'https://xinge.ruolin-link.com/';
const urlprefix_oncompany = 'http://test.ruolin-link.com/';//8041
let urlprefix = urlprefix_oncompany;
let urlconfig = {
  baseURL : urlprefix+"s/",
  transformRequest: [function (data, headers) {
    return JSON.stringify(data);
  }],
  headers: {
    'Authentication': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json',
  },
  timeout: 40000,
};

export function getUserInfo() {
  return new Promise(function(resolve, reject){
      axios.post('AsyncPubService/hasThisMobile',['15851575410'],urlconfig)
      .then(res => {
        console.log(res);
        resolve(res.data.r);
      })
  });
}