module.exports = {
  urls: require('./urls'),
  basicAuth: {
    username: process.env.DEV_BASIC_AUTH_USERNAME,
    password: process.env.DEV_BASIC_AUTH_PASSWORD
  },
  loginAuth: {
    [process.env.LOGIN_FORM_PARAM_NAME_USER]: process.env.LOGIN_USER,
    [process.env.LOGIN_FORM_PARAM_NAME_PASSWORD]: process.env.LOGIN_USER_PASSWORD,
  },

  baseUrl: (function(){
    var host = process.env.BASE_DOMAIN;

    switch (process.env.NODE_ENV) {
    case 'dev':
      host = [process.env.DEV_SUBDOMAIN, host].join('.');
      break;
    case 'stg':
      host = [process.env.STG_SUBDOMAIN, host].join('.');
      break;
    case 'prod':
    default:
      //do nothing
    }
    return [process.env.PROTOCOL, host].join('://');
  })()
};
