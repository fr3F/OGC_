// app/feature/reception/service/collaborateur.service.js
const { allColors } = require("winston/lib/winston/config");
const db = require("../../../../models");
const soldeModel = require("../../../../models/solde/solde.model");
const { getVarNecessairePagination, getFiltreRecherche, dataToJson, getPagingData } = require("../../../helpers/helpers.helper");
const { sequelize } = require('../../../../models'); // ton instance sequelize

const StatusConge = db.statusconge;
const TypeConge = db.typeConge;
const DemandeConge = db.demandeconge;
const Compte = db.compte;
const Solde = db.solde
const Collaborateur = db.collaborateur
// statusConges
async function getStatusCongePaginated(req) {
    let { page, limit, offset } = getVarNecessairePagination(req);
    let option = await getOptionGetStatusConge(req, limit, offset);
    let rep = await StatusConge.findAndCountAll(option);
    rep = dataToJson(rep);
    return getPagingData(rep, page, limit)
}
function getOptionGetStatusConge(req, limit, offset){
    let filters = getFiltreRechercheStatusConge(req);
    let order = [['createdAt', 'DESC']];
    return {
        where: filters,
        limit, offset,
        order
    };
}
function getFiltreRechercheStatusConge(req){
    let filters = getFiltreRecherche(req, ["nom_status_conge"]);
    if(!req.query.search)
        filters = {};
    return filters;
}

// TypeConge
async function getTypeCongePaginated(req) {
    let { page, limit, offset } = getVarNecessairePagination(req);
    let option = await getOptionGetTypeConge(req, limit, offset);
    let rep = await TypeConge.findAndCountAll(option);
    rep = dataToJson(rep);
    return getPagingData(rep, page, limit)
}

function getOptionGetTypeConge(req, limit, offset){
    let filters = getFiltreRechercheTypeConge(req);
    let order = [['createdAt', 'DESC']];
    return {
        where: filters,
        limit, offset,
        order
    };
}
function getFiltreRechercheTypeConge(req){
    let filters = getFiltreRecherche(req, ["nom_type_conge",  "max_jour"]);
    if(!req.query.search)
        filters = {};
    return filters;
}

// creation demande congé
async function createDemandeConge(req, data) {
  try {
    const loginAD = getLoginFromSession(req);
    const loginShort = extractShortLogin(loginAD);

    const collab = await db.collaborateur.findOne({
      where: { login: loginShort },
      include: [{ model: db.solde }]
    });

    if (!collab) throw new Error("Collaborateur non trouvé pour le login : " + loginShort);

    await ensureCompteExists(loginShort);

    data.id_status_conge = await getStatusEnAttenteId();

    const typeConge = await TypeConge.findByPk(data.id_type_conge);
    if (!typeConge) throw new Error("Type de congé introuvable");

    const dateDebut = new Date(data.date_debut_conge);
    const dateFin = new Date(data.date_fin_conge);
    dateDebut.setHours(0, 0, 0, 0);
    dateFin.setHours(0, 0, 0, 0);

    const diffTime = dateFin.getTime() - dateDebut.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let solde = null;
    if (typeConge.nom_type_conge.toLowerCase() !== 'maladie') {
      solde = await Solde.findOne({
        where: { id_collab: collab.id, id_type_conge: typeConge.id }
      });

      if (!solde) throw new Error("Solde non trouvé pour ce collaborateur et ce type de congé");

      if (diffDays > solde.nb_jours_restants) {
        throw new Error(`Impossible de créer le congé : ${solde.nb_jours_restants} jour(s) restant(s) seulement.`);
      }
    }

    // Créer la demande de congé
    data.login = loginShort;
    const demande = await DemandeConge.create(data);

    // Mettre à jour le solde si ce n'est pas un congé maladie
    if (solde) {
      solde.nb_jours_utilises += diffDays;
      solde.nb_jours_restants -= diffDays;
      await solde.save();
    }

    return demande;

  } catch (err) {
    console.error("Erreur createDemandeConge:", err);
    throw err;
  }
}


function getLoginFromSession(req) {
  const loginAD = req.session?.currentUser?.username;
  if (!loginAD) {
    throw new Error("Utilisateur non connecté via Active Directory");
  }
  return loginAD;
}

function extractShortLogin(loginAD) {
  return loginAD.split('@')[0];
}

async function ensureCompteExists(loginShort) {
  let compte = await Compte.findOne({ where: { login: loginShort } });
  if (!compte) {
    compte = await Compte.create({
      login: loginShort,
      type: "user" 
    });
  }
  return compte;
}

async function getStatusEnAttenteId() {
  try {
    let statusEnAttente = await StatusConge.findOne({ 
      where: { nom_status_conge: 'En attente' } 
    });

    if (!statusEnAttente) {
      statusEnAttente = await StatusConge.create({
        nom_status_conge: 'En attente'
      });
    }

    return statusEnAttente.id;
  } catch (error) {
    throw new Error("Impossible de traiter le statut 'En attente'");
  }
}

//Demande Conge Paginated
async function getDemandeCongePaginated(req) {
  let { page, limit, offset } = getVarNecessairePagination(req);
  let option = getOptionGetDemandeConge(req, limit, offset);

  option.include = getDemandeCongeInclude(req); 

  let rep = await DemandeConge.findAndCountAll(option);
  rep = dataToJson(rep);
  return getPagingData(rep, page, limit);
}

function getDemandeCongeInclude(req) {
  const login = req.query.login;
  return [
    {
      model: db.compte,
      attributes: ['login', 'type'],
      where: login ? { login } : undefined,
      include: [
        {
          model: db.collaborateur,
          attributes: [
            'id',
            'nom_collab',
            'prenom_collab',
            'email_collab',
            'matricule_collab',
            'date_embauche_collab',
            'id_manager',
            'id_departement'
          ],
          include: [
            {
              model: db.manager,
              as: 'manager',
              attributes: ['id', 'nom_manager']
            },
            {
              model: db.departement,
              attributes: ['id', 'nom_dep']
            },
            {
              model: db.solde,
              include: [
                {
                  model: db.typeConge,
                  attributes: ['id', 'nom_type_conge', 'max_jour']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      model: db.statusconge,
      attributes: ['id', 'nom_status_conge']
    },
    {
      model: db.typeConge,
      attributes: ['id', 'nom_type_conge', 'max_jour']
    }
  ];
}

function getOptionGetDemandeConge(req, limit, offset) {
  let filters = getFiltreRechercheDemandeConge(req);
  let order = [['createdAt', 'DESC']];
  return {
    where: filters,
    limit, offset,
    order
  };
}
function getFiltreRechercheDemandeConge(req) {
  let filters = getFiltreRecherche(req, ["login", "date_debut_conge", "date_fin_conge"]);
  if (!req.query.search)
    filters = {};
  return filters;
}

//Liste demande conge par son manager
function getQueryParams(req) {
    const query = req.query || {};
    const managerId = query.managerId;
    if (!managerId) throw new Error("managerId requis");

    const search = query.search || "";

    const { page, size, limit, offset } = getVarNecessairePagination(req);

    return { managerId, page, size, limit, offset, search };
}

function buildDataQuery({ managerId, limit, offset, search }) {
    const sql = `
        SELECT *
        FROM vue_demandes_manager
        WHERE manager_id = :managerId
        ${search ? "AND motifs_conge LIKE :search" : ""}
        LIMIT :limit OFFSET :offset
    `;

    const replacements = { managerId, limit, offset };
    if (search) replacements.search = `%${search}%`;

    return { sql, replacements };
}

function buildCountQuery({ managerId, search }) {
    const sql = `
        SELECT COUNT(*) AS total
        FROM vue_demandes_manager
        WHERE manager_id = :managerId
        ${search ? "AND motifs_conge LIKE :search" : ""}
    `;

    const replacements = { managerId };
    if (search) replacements.search = `%${search}%`;

    return { sql, replacements };
}

async function executeQuery(sql, replacements) {
    const results = await db.sequelize.query(sql, {
        replacements,
        type: db.Sequelize.QueryTypes.SELECT
    });
    return results;
}

async function getDemandeCongePaginatedByManager(req) {
    const params = getQueryParams(req);
    const { sql: dataSql, replacements: dataReplacements } = buildDataQuery(params);
    const results = await executeQuery(dataSql, dataReplacements);
    const { sql: countSql, replacements: countReplacements } = buildCountQuery(params);
    const countResults = await executeQuery(countSql, countReplacements);
    const totalItems = countResults[0].total;

    return {
        data: results,
        page: params.page,
        size: params.size,
        totalItems,
        totalPages: Math.ceil(totalItems / params.size)
    };
}




//Create solde personnaliser
async function createSolde(data) {
  try {
    const typeConge = await getTypeCongeOrThrow(data.id_type_conge);
    validateNbJoursTotal(data, typeConge);
    await getCollaborateurOrThrow(data.id_collab);
    await checkSoldeExistant(data.id_collab, data.id_type_conge, typeConge);
    validateNbJoursUtilises(data);

    const solde = await Solde.create(data);
    return solde;

  } catch (error) {
    console.error("Erreur createSolde:", error);
    throw error;
  }
}
async function getTypeCongeOrThrow(id_type_conge) {
  const typeConge = await TypeConge.findByPk(id_type_conge);
  if (!typeConge) throw new Error("Type de congé introuvable");
  return typeConge;
}
function validateNbJoursTotal(data, typeConge) {
  if (!data.nb_jours_total || data.nb_jours_total === 0) {
    data.nb_jours_total = typeConge.max_jour;
  }

  if (data.nb_jours_total > typeConge.max_jour) {
    throw new Error(
      `Le congé "${typeConge.nom_type_conge}" est limité à ${typeConge.max_jour} jours (vous avez demandé ${data.nb_jours_total}).`
    );
  }
}
async function getCollaborateurOrThrow(id_collab) {
  const collaborateur = await Collaborateur.findByPk(id_collab);
  if (!collaborateur) throw new Error("Collaborateur introuvable");
  return collaborateur;
}
async function checkSoldeExistant(id_collab, id_type_conge, typeConge) {
  const soldeExistant = await Solde.findOne({
    where: { id_collab, id_type_conge }
  });

  if (soldeExistant) {
    throw new Error(
      `Ce collaborateur possède déjà un solde pour le type de congé "${typeConge.nom_type_conge}"`
    );
  }
}
function validateNbJoursUtilises(data) {
  if (data.nb_jours_utilises > data.nb_jours_total) {
    throw new Error(
      `Le nombre de jours utilisés (${data.nb_jours_utilises}) ne peut pas dépasser le total (${data.nb_jours_total})`
    );
  }
}

// Solde Paginated
async function getSoldePaginated(req) {
  let { page, limit, offset } = getVarNecessairePagination(req);
  let option = getOptionGetSolde(req, limit, offset);

  option.include = getSoldeInclude(req); 

  let rep = await Solde.findAndCountAll(option);
  rep = dataToJson(rep);
  return getPagingData(rep, page, limit);
}

function getSoldeInclude(req) {
  const login = req.query.login;
  
  return [
    {
      model: db.collaborateur,
      attributes: ['id', 'nom_collab', 'prenom_collab', 'email_collab', 'date_embauche_collab'],
      include: [
        {
          model: db.compte,
          attributes: ['login', 'type'],
          where: login ? { login } : undefined 
        }
      ]
    },
    {
      model: db.typeConge,
      attributes: ['id', 'nom_type_conge', 'max_jour']
    }
  ];
}

function getOptionGetSolde(req, limit, offset) {
  let filters = getFiltreRechercheSolde(req);
  let order = [['createdAt', 'DESC']];
  return {
    where: filters,
    limit, offset,
    order
  };
}
function getFiltreRechercheSolde(req) {
  let filters = getFiltreRecherche(req, [ "nom_collab", "nb_jours_total", "nb_jours_utilises", "nb_jours_restants"]);
  if (!req.query.search)
    filters = {};
  return filters;
}


module.exports = {
  getStatusCongePaginated,
  getTypeCongePaginated,
  createDemandeConge,
  getDemandeCongePaginated,
  getSoldePaginated,
  createSolde,
  getDemandeCongePaginatedByManager
};
