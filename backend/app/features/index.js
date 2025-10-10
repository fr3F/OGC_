const routes = (app)=>{
    require("./collaborateurs/collaborateurs.route")(app);
    require("./compte/compte.route")(app);
    require("./departement/departements.route")(app);
    require("./manager/manager.route")(app);
    require("./demandeConge/demandeConge.route")(app);
    require("./typeConge/typeConge.route")(app);
    require("./statusconge/statusconge.route")(app);

    require("./base/CRUD/baseRoute")(app);

    require("./LDAP/auth.routes")(app);

}
module.exports = routes;