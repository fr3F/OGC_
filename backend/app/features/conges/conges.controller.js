const congesService = require('./services/conges.service');
// StatusConge
async function getStatusCongePaginated (req, res) {
    try{    
        let rep = await congesService.getStatusCongePaginated(req); 
        res.send(rep)
    }
    catch(err){
        sendError(res, err);
    }
}

// typeConge
async function getTypeCongePaginated (req, res) {
    try{    
        let rep = await congesService.getTypeCongePaginated(req); 
        res.send(rep)
    }
    catch(err){
        sendError(res, err);
    }
}

// demandeConge
async function createDemandeConge(req, res) {
  try {
    const data = req.body; 
    const result = await congesService.createDemandeConge(req, data);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

async function getDemandeCongePaginated (req, res) {
    try{    
        let rep = await congesService.getDemandeCongePaginated(req); 
        res.send(rep)
    }
    catch(err){
    console.error(err);

        sendError(res, err);
    }
}

async function getDemandeCongePaginatedByManager (req, res) {
    try{    
        let rep = await congesService.getDemandeCongePaginatedByManager(req); 
        res.send(rep)
    }
    catch(err){
    console.error(err);

        sendError(res, err);
    }
}

async function validerDemandeConge(req, res) { 
  try {
    const { demandeId, valide, login_manager } = req.body;  
    const loginManager = req.user?.login || login_manager; 
    
    if (!demandeId || typeof valide !== 'boolean') {
      return res.status(400).json({ message: 'Paramètres manquants ou invalides' });
    }
    
    if (!loginManager) {
      return res.status(400).json({ message: 'Login manager manquant' });
    }
    
    const demande = await congesService.validerDemandeConge(loginManager, demandeId, valide);
    res.json({ success: true, demande });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

// solde
async function getSoldeCongePaginated (req, res) {
    try{    
        let rep = await congesService.getSoldePaginated(req); 
        res.send(rep)
    }
    catch(err){
    console.error(err);

        sendError(res, err);
    }
}

const createSolde = async (req, res) => {
  try {
    const result = await congesService.createSolde(req.body);
    res.status(201).json({
      message: 'Solde créé avec succès',
      data: result
    });
  } catch (error) {
    console.error('Erreur createSolde:', error);
    res.status(400).json({
      message: error.message || 'Erreur lors de la création du solde'
    });
  }
};
module.exports = { 
    getStatusCongePaginated,
    getTypeCongePaginated,
    createDemandeConge,
    getDemandeCongePaginated,
    getSoldeCongePaginated,
    createSolde,
    getDemandeCongePaginatedByManager,
    validerDemandeConge
}