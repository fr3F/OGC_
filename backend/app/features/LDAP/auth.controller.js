// controllers/auth.controller.js
const ldapService = require("../LDAP/service/ldap.service");
<<<<<<< HEAD

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
=======
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "CHANGE_THIS_SECRET";

async function login(req, res) {
  const { username, password } = req.body; // username injecté automatiquement par Angular

  try {
    // Vérifier LDAP
    const ok = await ldapService.authenticateUser(username, password);
    if (!ok) {
      return res
        .status(401)
        .json({ success: false, message: "Mot de passe incorrect" });
    }

    // Récupérer infos LDAP
    const user = await ldapService.getUserInfo(username);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable" });
    }

    // Générer JWT
    const token = jwt.sign(
      { username: user.sAMAccountName, displayName: user.displayName },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({ success: true, token, user });
  } catch (err) {
    console.error("LDAP login error:", err);
    res
      .status(500)
      .json({ success: false, message: "Erreur lors de l’authentification LDAP" });
  }
}

module.exports = { login};
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
