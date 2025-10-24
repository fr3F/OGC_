// app/feature/reception/service/collaborateur.service.js
const db = require("../../../../models");
const { getVarNecessairePagination, getFiltreRecherche, dataToJson, getPagingData } = require("../../../helpers/helpers.helper");
const Collaborateur = db.collaborateur;
const Departement = db.departement;
const Manager = db.manager;
const Compte = db.compte;
const Solde = db.solde;
const TypeConge = db.typeConge;

/**
 * Liste paginée des collaborateurs et filtres de recherche
*/

async function getAllDetailCollabPagine(req){
  let { page, limit, offset } = getVarNecessairePagination(req);
  let option = await getOptionGetCollab(req, limit, offset);
  let rep = await Collaborateur.findAndCountAll({ 
    ...option, 
    include: getCollaborateurInclude()
  });
  rep = dataToJson(rep);
  return getPagingData(rep, page, limit)
}

// collaborateur
function getCollaborateurInclude() {
  return [
    {
      model: Manager,
      as: "manager",
      attributes: ["id", "nom_manager"]
    },
    {
      model: Departement,
      attributes: ["id", "nom_dep"]
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
          attributes: ["id", "nom_type_conge", "max_jour"]
        }
      ]
    }
  ];
}
async function findOneUserDemandeConge(login) {
  const collaborateur = await Collaborateur.findOne({
    where: { login },
    include: getCollaborateurInclude() 
  });

  if (collaborateur) {
    return collaborateur.toJSON(); 
  } else {
    return null;
  }
}


function getOptionGetCollab(req, limit, offset){
    let filters = getFiltreRechercheCollab(req);
    let order = [['createdAt', 'DESC']];
    return {
        where: filters,
        limit, offset,
        order
    };
}

function getFiltreRechercheCollab(req){
    let filters = getFiltreRecherche(req, ["nom_collab", "prenom_collab"]);
    if(!req.query.search)
        filters = {};
    return filters;
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

// compte
async function getComptePaginated(req) {
    let { page, limit, offset } = getVarNecessairePagination(req);
    let option = await getOptionGetCompte(req, limit, offset);
    let rep = await Compte.findAndCountAll(option);
    rep = dataToJson(rep);
    return getPagingData(rep, page, limit)
}
function getOptionGetCompte(req, limit, offset){
    let filters = getFiltreRechercheCompte(req);
    let order = [['createdAt', 'DESC']];
    return {
        where: filters,
        limit, offset,
        order
    };
}
function getFiltreRechercheCompte(req){
    let filters = getFiltreRecherche(req, ["login", "type"]);
    if(!req.query.search)
        filters = {};
    return filters;
}

// Departement
async function getDepartementPaginated(req) {
    let { page, limit, offset } = getVarNecessairePagination(req);
    let option = await getOptionGetDepartement(req, limit, offset);
    let rep = await Departement.findAndCountAll(option);
    rep = dataToJson(rep);
    return getPagingData(rep, page, limit)
}
function getOptionGetDepartement(req, limit, offset){
    let filters = getFiltreRechercheDepartement(req);
    let order = [['createdAt', 'DESC']];
    return {
        where: filters,
        limit, offset,
        order
    };
}
function getFiltreRechercheDepartement(req){
    let filters = getFiltreRecherche(req, ["nom_dep"]);
    if(!req.query.search)
        filters = {};
    return filters;
}

// Manager
async function getManagerPaginated(req) {
    let { page, limit, offset } = getVarNecessairePagination(req);
    let option = await getOptionGetManager(req, limit, offset);
    let rep = await Manager.findAndCountAll(   
      {
        ...option, 
        include: getManagerInclude()
      }
      );
    rep = dataToJson(rep);
    return getPagingData(rep, page, limit)
}

function getManagerInclude() {
  return [
    {
      model: db.manager,
      as: 'superior',      
      attributes: ['id', 'nom_manager', 'email_manager']
    }
  ];
}

function getOptionGetManager(req, limit, offset){
    let filters = getFiltreRechercheManager(req);
    let order = [['id', 'DESC']];
    return {
        where: filters,
        limit, offset,
        order
    };
}
function getFiltreRechercheManager(req){
    let filters = getFiltreRecherche(req, ["nom_manager"]);
    if(!req.query.search)
        filters = {};
    return filters;
}

module.exports = {
  createCollaborateur,
  getAllDetailCollabPagine,
  getComptePaginated,
  getDepartementPaginated,
  getManagerPaginated,
  findOneUserDemandeConge
};
