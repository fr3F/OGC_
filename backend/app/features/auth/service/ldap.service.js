const ActiveDirectory = require('activedirectory');

// 🔧 Configuration LDAP
const config = {
  url: "ldap://172.16.110.2:389",
  baseDN: "DC=sodim,DC=corp",
};

const ad = new ActiveDirectory(config);

// 👤 Compte par défaut (fallback si LDAP indisponible)
const DEFAULT_ACCOUNT = {
  username: "admin@sodim.corp",
  password: "admin123",
  displayName: "Administrateur Local",
  email: "admin@sodim.corp",
  title: "Administrateur",
  department: "Informatique",
};

/**
 * 🔐 Authentifie un utilisateur
 * Essaie d’abord sur LDAP, sinon sur le compte par défaut
 */
function authenticateUser(username, password) {
  return new Promise((resolve) => {
    if (!username || !password) {
      console.warn("⚠️ Username ou password manquant");
      return resolve(false);
    }

    ad.authenticate(username, password, (err, auth) => {
      if (err) {
        console.error("⚠️ LDAP non disponible ou erreur:", err.message);

        // ✅ Fallback sur le compte par défaut
        if (
          username === DEFAULT_ACCOUNT.username &&
          password === DEFAULT_ACCOUNT.password
        ) {
          console.log("✅ Authentifié via compte local par défaut");
          return resolve(true);
        }

        return resolve(false);
      }

      if (auth) {
        console.log(`✅ LDAP: utilisateur "${username}" authentifié`);
        resolve(true);
      } else {
        console.warn(`❌ LDAP: échec d’authentification pour "${username}"`);

        // ✅ Fallback local si LDAP répond mais refuse
        if (
          username === DEFAULT_ACCOUNT.username &&
          password === DEFAULT_ACCOUNT.password
        ) {
          console.log("✅ Authentifié via compte local par défaut");
          return resolve(true);
        }

        resolve(false);
      }
    });
  });
}

/**
 * 👤 Récupère les infos d’un utilisateur
 * Si LDAP échoue, renvoie le compte local par défaut
 */
function getUserInfo(username) {
  return new Promise((resolve) => {
    if (!username) {
      console.warn("⚠️ Username manquant");
      return resolve(null);
    }

    const sanitizedUsername = username.trim().toLowerCase();

    ad.findUser(sanitizedUsername, (err, user) => {
      if (err) {
        console.error("⚠️ LDAP indisponible, retour compte par défaut");
        if (sanitizedUsername === DEFAULT_ACCOUNT.username) {
          return resolve(DEFAULT_ACCOUNT);
        }
        return resolve(null);
      }

      if (!user) {
        console.warn(`ℹ️ Utilisateur ${sanitizedUsername} non trouvé dans LDAP`);
        if (sanitizedUsername === DEFAULT_ACCOUNT.username) {
          return resolve(DEFAULT_ACCOUNT);
        }
        return resolve(null);
      }

      const userInfo = {
        username: user.sAMAccountName || "",
        displayName: user.displayName || "",
        email: user.mail || "",
        title: user.title || "",
        department: user.department || "",
      };

      console.log("👤 LDAP User Info:", userInfo);
      resolve(userInfo);
    });
  });
}

module.exports = {
  authenticateUser,
  getUserInfo,
};
