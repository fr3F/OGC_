const express = require("express");
const generateCrudRoutes = require("../base/CRUD/baseRoute");

// Import des contrôleurs
const collaborateursController = require("./rh.controller");

module.exports = (app) => {
  // Middleware global (CORS)
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * Fonction utilitaire pour enregistrer un modèle avec ses routes CRUD et personnalisées
   */
  const registerModelRoutes = (nomModel, controller, customRoutes = []) => {
    const router = express.Router();

    // Routes personnalisées si nécessaires
    customRoutes.forEach((route) => {
      const { method, path, handler } = route;
      router[method](path, handler);
    });

    // Routes CRUD automatiques
    const crudRouter = generateCrudRoutes(nomModel);
    router.use("/", crudRouter);

    // Montage du router principal
    app.use(`/api/${nomModel.toLowerCase()}`, router);
  };

  /**
   * Enregistrement de tous les modèles ici
   */
  registerModelRoutes("collaborateur", collaborateursController, [
    { method: "get", path: "/allDetail", handler: collaborateursController.getAllDetailCollabPagine },
    { method: "post", path: "/login", handler: collaborateursController.getCollabByLogin },
  ]);

  registerModelRoutes("departement", collaborateursController,[
    { method: "get", path: "/allDepartement", handler: collaborateursController.getDepartementPaginated },
  ]);

  registerModelRoutes("manager", collaborateursController,[
    { method: "get", path: "/allManager", handler: collaborateursController.getManagerPaginated },
  ]);

  registerModelRoutes("compte", collaborateursController,[
    { method: "get", path: "/allCompte", handler: collaborateursController.getComptePaginated },
  ]);
  // Ajoute d'autres modèles ici...

};
