const { dataToJson, formatDate, setHeaderResponseAttachementPdf } = require("../../../helpers/helpers.helper");
const db  = require("../../../../models");
const { getAllModuleAvecFonctionnalite } = require("./fonctionnalite.service");
const { getAllMenu } = require("./menu.service");

const pdf = require("html-pdf");
const fs = require("fs");
const Handlebars = require("handlebars");
const { OPTION_PDF_PORTRAIT } = require("../../../helpers/pdf-helper");
const { zoomPdf, urlBackLocal } = require("../../../config/environnements/dev/environment");

const Role = db.role;

async function getRoles(){
    const resp = await Role.findAll({
        include: ["menus", "fonctionnalites"]
    });
    return dataToJson(resp);
}

async function getDataToPrint(){
    const roles = await getRoles();
    const modules = await getAllModuleAvecFonctionnalite();
    const menus = await getAllMenu();
    setMenuModulesRoles(roles, menus, modules);
    return roles;
}

function setMenuModulesRoles(roles, menus, modules){
    for(const role of roles){
        setMenuRole(role, menus);
        setModuleRole(role, modules);
    }
}

function setModuleRole(role, modules){
    role.modules = dataToJson(modules);
    for(const module of role.modules){
        for(const fonc of module.fonctionnalites){
            const tmp = role.fonctionnalites.find((r)=> r.id == fonc.id);
            if(tmp)
                fonc.checked = "Oui";
            else
                fonc.checked = "Non";
        }
    }
    delete role.fonctionnalites;
}


function setMenuRole(role, menus){
    role.allMenus = dataToJson(menus)
    for(const menu of role.allMenus){
        setMenuRoleRecursive(role, menus, menu);
    }
    delete role.menus;
}

function setMenuRoleRecursive(role, menus, menu){
    const tmp = role.menus.find((r)=> r.id == menu.id);
    if(tmp) menu.checked = "Oui";
    else menu.checked = "Non";
    if(menu.subItems.length){
        for(const subItem of menu.subItems)
            setMenuRoleRecursive(role, menus, subItem);
    }
}

async function getOptionPdf(user){    
    let source = await fs.readFileSync(__basedir + "/app/templates/pdf/acces-pdf.html", "utf8");
    let template = await Handlebars.compile(source);
    const roles = await getDataToPrint();
    let date =  formatDate(new Date(), "DD/MM/YYYY à HH:mm");
    const date2 = formatDate(new Date(), "DD-MM-YYYY");
    let html = await template({roles, zoomPdf, date, user, urlBackLocal});
    let options = OPTION_PDF_PORTRAIT;
    return {date: date2, html, options};
}


async function printAccesPdf(user, res){
    let {html, options, date} = await getOptionPdf(user);
    await pdf.create(html, options).toStream(async function (err, stream) {
        if (err) {
            res.status(500).send({message: "Il y a une erreur lors de l'impression en pdf"})
            return;
        }               
        let pdfName = `Accès-caisse-${date}.pdf`;
        setHeaderResponseAttachementPdf(res, pdfName);
        stream.pipe(res);
    });
}
module.exports = {
    getDataToPrint,
    printAccesPdf
}