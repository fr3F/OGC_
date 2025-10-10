const express = require("express");
const generateCrudRoutes = require("../base/CRUD/baseRoute");
const collaborateursController = require("./collaborateurs.controller");

const nomModel = "collaborateur";

let routes = (app) => {
    // Middleware global pour headers
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // Router principal pour ce modèle
    const router = express.Router();

    // Route personnalisée
    router.get("/allDetail", collaborateursController.getAllDetailCollaborateur);

    const crudRouter = generateCrudRoutes(nomModel);
    router.use("/", crudRouter);

    // On monte le router complet sous /api/collaborateur
    app.use(`/api/${nomModel.toLowerCase()}`, router);
};

module.exports = routes;
