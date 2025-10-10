const db = require("../../../../models");
const DemandeConge = db.demandeconge;
const Compte = db.compte;

async function createDemandeConge(data) {
    const session = await getCompteSession();
    await getOrCreateCompte(session);
    return await createDemandeCongeData(data, session);
}

async function getCompteSession() {
    const user = process.env.USER || process.env.USERNAME; 
    return user ? `${user}@sodim.corp` : null;
}

async function getOrCreateCompte(session) {
    let compte = await Compte.findByPk(session);
    if (!compte) {
        compte = await Compte.create({
            login: session,
            type: "collaborateur" 
        });
    }
    return compte;
}

async function createDemandeCongeData(data, login) {
    try {
        const demande = await DemandeConge.create({
            date_debut_conge: data.date_debut_conge,
            date_fin_conge: data.date_fin_conge,
            motifs_conge: data.motifs_conge,
            login: login,
            id_status_conge: data.id_status_conge,
            id_type_conge: data.id_type_conge
        });
        return demande;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createDemandeConge
};
