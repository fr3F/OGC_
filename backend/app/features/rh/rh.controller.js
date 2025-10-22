const { sendError } = require('../../helpers/helpers.helper');
const collaborateurService =  require('./services/rh.service')


async function getAllDetailCollabPagine (req, res) {
    try{    
        let rep = await collaborateurService.getAllDetailCollabPagine(req); 
        res.send(rep)
    }
    catch(err){
        sendError(res, err);
    }
}

async function getCollabByLogin(req, res) {
    const {login} = req.body
    try{    
        let rep = await collaborateurService.findOneUserDemandeConge(login);
        res.send(rep)
    }
    catch(err){
        sendError(res, err);
    }
}

// compte
async function getComptePaginated(req, res) {
    try{    
        let rep = await collaborateurService.getComptePaginated(req);
        res.send(rep)
    }
    catch(err){
        sendError(res, err);
    }
}

// departement
async function getDepartementPaginated(req, res) {
    try{    
        let rep = await collaborateurService.getDepartementPaginated(req);
        res.send(rep)
    }
    catch(err){
        sendError(res, err);
    }
}

// manager
async function getManagerPaginated(req, res) {
    try{    
        let rep = await collaborateurService.getManagerPaginated(req);
        res.send(rep)
    }
    catch(err){
        sendError(res, err);
    }
}

module.exports = {
    getAllDetailCollabPagine,
    getComptePaginated,
    getDepartementPaginated,
    getManagerPaginated,
    getCollabByLogin
}