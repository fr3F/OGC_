const routes = (app)=>{
    require("./rh/rh.route")(app);
    require("./conges/conges.route")(app);
    require("./auth/auth.routes")(app);

}
module.exports = routes;