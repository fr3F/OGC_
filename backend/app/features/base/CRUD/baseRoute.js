const express = require("express");
const db = require("../../../../models/index");
const BaseService = require("./services/baseService");
const BaseController = require("./baseController");

function generateCrudRoutes(nomModel) {
    const router = express.Router();

    const model = db[nomModel];
    console.log("model", model);
    
    const baseService = new BaseService(model);
    const baseController = new BaseController(baseService);

    router.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // Routes CRUD
    router.post("/", (req, res) => baseController.create(req, res));
    router.get("/", (req, res) => baseController.getAll(req, res));
    router.get("/:id", (req, res) => baseController.getById(req, res));
    router.put("/:id", (req, res) => baseController.update(req, res));
    router.delete("/:id", (req, res) => baseController.delete(req, res));

    return router;
}

module.exports = generateCrudRoutes;
