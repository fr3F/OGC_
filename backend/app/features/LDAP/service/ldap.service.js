// services/ldap.service.js
const ActiveDirectory = require("activedirectory");

const config = {
  url: "ldap://172.16.110.2:389",
  baseDN: "DC=sodim,DC=corp",
};

const ad = new ActiveDirectory(config);

function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    ad.authenticate(username, password, (err, auth) => {
      if (err) {
        console.error("LDAP ERROR:", err);
        return reject(err);
      }
      resolve(!!auth);
    });
  });
}

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
