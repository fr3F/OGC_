// controllers/auth.controller.js
const ldapService = require("../LDAP/service/ldap.service");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const auth = await ldapService.authenticateUser(username, password);
    if (auth) {
      return res.status(200).json({ 
        success: true,
        message: 'Bienvenue !' 
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Échec de l’authentification.' 
      });
    }
  } catch (err) {
    console.error('Erreur LDAP:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur LDAP', 
      error: err 
    });
  }
}

module.exports = {
  login
};
