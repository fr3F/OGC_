// services/ldap.service.js
<<<<<<< HEAD
const ActiveDirectory = require('activedirectory');

const config = {
  url: 'ldap://172.16.110.2:389',
  baseDN: 'DC=sodim,DC=corp',
=======
const ActiveDirectory = require("activedirectory");

const config = {
  url: "ldap://172.16.110.2:389",
  baseDN: "DC=sodim,DC=corp",
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
};

const ad = new ActiveDirectory(config);

function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    ad.authenticate(username, password, (err, auth) => {
      if (err) {
<<<<<<< HEAD
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
=======
        console.error("LDAP ERROR:", err);
        return reject(err);
      }
      resolve(!!auth);
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
    });
  });
}

<<<<<<< HEAD
function getWindowsUser(req) {
  return req.connection.user || null;
}
module.exports = {
  authenticateUser,
  getWindowsUser
};
=======
function getUserInfo(username) {
  return new Promise((resolve, reject) => {
    ad.findUser(username, (err, user) => {
      if (err) {
        console.error("LDAP findUser error:", err);
        return reject(err);
      }
      resolve(user || null);
    });
  });
}

module.exports = { authenticateUser, getUserInfo };
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
