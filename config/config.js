const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 9191,
    dbConnectionString: 'mongodb://localhost:27017/victorprograming',
    authCookieName: 'auth_cookie',
    authHeaderName: 'auth',
    jwtSecret: 'secret',
    saltRounds: 10,
  },
  production: {},
};

module.exports = config[env];
