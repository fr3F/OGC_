const dayjs = require('dayjs');
const { ErrorCode } = require("./error");
const fs = require("fs");  /// pour lire et ecrire dans un fichier 
const path = require('path');

function trimStr(str){
    if(!str)
        return "";
    return str.toString().trim();
}

function sendErrorMessage(res, message, status = 500){
    loggerError.error(message);
    loggerError.error(message.stack);
    res.status(status).send({message: message});
}

function removeLeadingZeros(str) {
    if(!str)
        return "";
    return str.toString().replace(/^0+/, '');
}const { Op } = require("sequelize");
const { loggerError } = require("./logger");

function sendError(res, err, status = 500){
    if(err.code)
        status = err.code;
    console.log(err);
    loggerError.error(err);
    loggerError.error(err.stack);
    res.status(status).send({message: err.message});
}

async function verifierExistence(model ,id, nom="", include = [], transaction = null, nomId = "id", order = []){
    if(!id)
        throw new ErrorCode("Veuillez renseigner l'identifiant" + (nom? ` du "${nom}"`: ""))
    let t
    if(nomId == id)
        t = await model.findByPk(id, {include, transaction});
    else{
        let cond = {}
        cond[nomId] = id;
        t = await model.findOne({where: cond, include, transaction, order});
    }
    if(!t)
        throw new ErrorCode(nom + " introuvable")
    return dataToJson(t);
}

// Recuperer les variables necessaires pour la pagination
function getVarNecessairePagination(req){
    let { page, size } = req.query;
    page = page? page: 0;
    size = size? size: 10;
    const { limit, offset } = getPagination(page, size);
    return {page, size, limit, offset};
}

// Obtenir limit et offset
function getPagination(page, size){
    // size = size? size: 10;
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

function dataToJson(data){
    return JSON.parse(JSON.stringify(data));
}

// Obtenir un data avec pagination 
function getPagingData(data, page, limit, nomLigne = "data"){
    const { count: totalItems, rows: products } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    let rep = { totalItems, totalPages, currentPage };
    rep[nomLigne] = products;
    return rep; 
};

// generer condition pour la recherche
function getFiltreRecherche(req, fields = ["designation"]){
    let filters = {};
    const searchQuery = req.query.search? req.query.search.trim(): '';
    const value = { [Op.like]: `%${searchQuery}%` };
    fields.forEach((item) => (filters[item] = value));
    return {[Op.or]: filters};
}
function formatDate(date, format = "DD/MM/YYYY"){
    return dayjs(date).format(format);
}
// Formatter nb
function formaterNb(nombre, fixed = 4, sep = "."){
    if(nombre == '' || !nombre)
        nombre = 0;
    return parseFloat(nombre).toFixed(fixed).replace(".", sep);
}
// ecrire dans un fichier et remplacer si existe
function ecrireFichierSync(filePath, content, encoding = 'utf8') {
    // Créer le dossier parent si nécessaire
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, { encoding });
}


function setHeaderResponseAttachementPdf(res, filename){
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + filename + ";"
    );
}
module.exports  = {
    sendErrorMessage,
    sendError,
    formatDate,
    formaterNb,
    trimStr,
    removeLeadingZeros,
    verifierExistence,
    getVarNecessairePagination,
    dataToJson,
    getPagingData,
    getFiltreRecherche,
    ecrireFichierSync,
    setHeaderResponseAttachementPdf
}