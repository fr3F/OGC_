const generateCrudRoutes = require("../base/CRUD/baseRoute");

let setupRoutes = (app) => {
    const nomModel = "statusconge"

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // CRUD
    const crudRoutes = generateCrudRoutes(nomModel);

    app.use(`/api/${nomModel.toLowerCase()}`, crudRoutes);      
};

module.exports = setupRoutes;
