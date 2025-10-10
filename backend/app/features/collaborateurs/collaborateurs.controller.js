const { sendError } = require('../../helpers/helpers.helper');
const collaborateurService =  require('./services/collaborateurs.service')


async function createCollaborateur(req, res){
    try {
        const data = req.body;
        let rep = await collaborateurService.createCollaborateur(data);
        res.send(rep)    
    } catch (error) {
        sendError(res, err);
    }
}

async function getAllDetailCollaborateur (req, res) {
    try{    
        let rep = await collaborateurService.getAllDetailCollaborateur();
        res.send(rep)
    }
    catch(err){
        sendError(res, err);
    }
}

module.exports = {
    getAllDetailCollaborateur,
    createCollaborateur
}