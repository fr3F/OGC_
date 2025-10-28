const ActiveDirectory = require('activedirectory');

const config = {
  url: "ldap://172.16.110.2:389",
  baseDN: "DC=sodim,DC=corp",
};

const ad = new ActiveDirectory(config);

function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      console.warn("Username ou password manquant");
      return resolve(false);
    }

    ad.authenticate(username, password, (err, auth) => {
      if (err) {
        console.error('LDAP ERROR:', err);
        return reject(err);
      }
      if (auth) {
        console.log('LDAP Authenticated!');
        resolve(true);
      } else {
        console.log('LDAP Authentication failed!');
        resolve(false);
      }
    });
  });
}

function getUserInfo(username) {
  return new Promise((resolve, reject) => {
    if (!username) return resolve(null);

    try {
      const sanitizedUsername = username.trim().toLowerCase();


      ad.findUsers(`sAMAccountName=${sanitizedUsername}`, true, function(err, users) {
        if (err) {
          console.log('ERROR: ' +JSON.stringify(err));
          return;
        }

        if ((! users) || (users.length == 0)) console.log('No users found.');
        else {
          console.log('findUsers: '+JSON.stringify(users));
        }
      })
      
      // ad.findUsers(`sAMAccountName=${sanitizedUsername}`, true, (err, users) => {
      //   console.log("users_1__", users);
      //   if (err) {
      //     console.error('LDAP ERROR (findUsers):', err.message);
      //     return resolve(null); // éviter crash
      //   }
      //   console.log("users___", users);

      //   if (!users || !Array.isArray(users) || users.length === 0) {
      //     console.log(`Utilisateur ${sanitizedUsername} non trouvé dans l'AD`);
      //     return resolve(null);
      //   }
      //   const user = users[0] || {};

      //   console.log("user___", user);
        
      //   const userInfo = {
      //     username: user.sAMAccountName || '',
      //     displayName: user.displayName || '',
      //     email: user.mail || '',
      //     title: user.title || '',
      //     department: user.department || ''
      //   };

      //   resolve(userInfo);
      // });



    } catch(e) {
      console.error('Wrapper Error (findUser):', e.message);
      resolve(null);
    }
  });
}
// Export
module.exports = {
  authenticateUser,
  getUserInfo
};