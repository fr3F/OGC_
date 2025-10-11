// app/feature/reception/service/collaborateur.service.js
const db = require("../../../../models");
const Collaborateur = db.collaborateur;
const Departement = db.departement;
const Manager = db.manager;
const Compte = db.compte;
const Solde = db.Solde;
const TypeConge = db.typeConge;

async function getAllDetailCollaborateur() {
  try {
    const collaborateur = await Collaborateur.findAll({
      include: [
        {
          model: Manager,
          attributes: ["id_manager", "nom_manager"]
        },
        {
          model: Departement,
          attributes: ["id_departement", "nom_dep"]
        },
        {
          model: Compte,
          attributes: ["login", "type"]
        },
        {
          model: Solde,
          include: [
            {
              model: TypeConge,
              attributes: ["id_type_conge", "nom_type_conge", "max_jour"]
            }
          ]
        }
      ]
    });

    return collaborateur;
  } catch (err) {
    console.error("Erreur getAllDetailCollaborateur:", err);
    throw err;
  }
}

async function createCollaborateur(data) {
  try {
    const collaborateur = await Collaborateur.create(data);
    return collaborateur;
  } catch (err) {
    console.error("Erreur createCollaborateur:", err);
    throw err;
  }
}


module.exports = {
  getAllDetailCollaborateur,
  createCollaborateur
};
