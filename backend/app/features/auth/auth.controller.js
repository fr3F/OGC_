// controllers/auth.controller.js
const ldapService = require("./service/ldap.service");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const auth = await ldapService.authenticateUser(username, password);

    if (auth) {
      req.session.currentUser = { username };
      req.session.save(err => { 
        if (err) {
          console.error('Erreur sauvegarde session:', err);
          return res.status(500).json({ success: false, message: 'Erreur session', error: err });
        }
        console.log("Utilisateur connecté :", req.session.currentUser);
        return res.status(200).json({ success: true, message: 'Bienvenue !' });
      });
    } else {
      return res.status(401).json({ success: false, message: 'Échec de l’authentification.' });
    }
  } catch (err) {
    console.error('Erreur LDAP:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur LDAP', error: err });
  }
}

async function getUserInfo(req, res) {
 try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ success: false, message: "Nom d'utilisateur requis" });

    const user = await ldapService.getUserInfo(username);
    if (!user) return res.status(404).json({ success: false, message: "Utilisateur introuvable dans l'AD" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erreur serveur LDAP", error: err.message });
  }
}


module.exports = {
  login,
  getUserInfo
};
