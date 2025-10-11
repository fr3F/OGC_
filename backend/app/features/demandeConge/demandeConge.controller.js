const DemandeCongeService = require('../demandeConge/service/demandeConge.service')

async function createDemandeConge(req, res){
    try {
        const data = req.body;
        let rep = await DemandeCongeService.createDemandeConge(data);
        res.send(rep)    
    } catch (error) {
        console.error("Erreur createDemandeConge:", err);
        throw err;
    }
}

module.exports = {
    createDemandeConge
}