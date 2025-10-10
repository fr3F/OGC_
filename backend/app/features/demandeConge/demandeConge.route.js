const express = require("express");
const router = express.Router();
const authJwt = require("../../middleware/authJwt");
const generateCrudRoutes = require("../base/CRUD/baseRoute");
const demandeCongeController = require("./DemandeConge.controller");

const nomModel = "demandeconge"
// Utiliser BaseRoute pour CRUD standard
const crudRouter = generateCrudRoutes(nomModel);

let routes = (app) => {
    // Middleware global pour headers
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // Routes CRUD automatiques
    app.use(`/api/${nomModel.toLowerCase()}`, crudRouter);


    // Routes personnalisées
    router.post("/compte", demandeCongeController.createDemandeConge);
    app.use(`/api/${nomModel.toLowerCase()}`, router);

};

module.exports = routes;
