// services/ldap.service.js
const ActiveDirectory = require('activedirectory');

const config = {
  url: 'ldap://172.16.110.2:389',
  baseDN: 'DC=sodim,DC=corp',
};

const ad = new ActiveDirectory(config);

function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    ad.authenticate(username, password, (err, auth) => {
      if (err) {
        console.error('LDAP ERROR:', err);
        return reject(err);
      }
      if (auth) {
        console.log('LDAP Authenticated!');
        return resolve(true);
      } else {
        console.log('LDAP Authentication failed!');
        return resolve(false);
      }
    });
  });
}

function getWindowsUser(req) {
  return req.connection.user || null;
}
module.exports = {
  authenticateUser,
  getWindowsUser
};
