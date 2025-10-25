const express = require("express");
const generateCrudRoutes = require("../base/CRUD/baseRoute");

// Import des contrôleurs
const congesController = require("./conges.controller");

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
  registerModelRoutes("statusconge", congesController,[
    { method: "get", path: "/allStatusConge", handler: congesController.getStatusCongePaginated },
  ]);

  registerModelRoutes("typeConge", congesController,[
    { method: "get", path: "/allTypeConge", handler: congesController.getTypeCongePaginated },
  ]);

  registerModelRoutes("demandeconge", congesController, [
    { method: "post", path: "/ajouter", handler: congesController.createDemandeConge },
    { method: "get", path: "/allDemandeConge", handler: congesController.getDemandeCongePaginated },
    { method: "get", path: "/demandeCongeByManager", handler: congesController.getDemandeCongePaginatedByManager },
    { method: "post", path: "/valider", handler: congesController.validerDemandeConge },
  ]);
  
  registerModelRoutes("solde", congesController,[
    {method: "get", path:"/allSolde", handler: congesController.getSoldeCongePaginated},
    { method: "post", path: "/ajouter", handler: congesController.createSolde },
    
  ])
  // Ajoute d'autres modèles ici...

};
