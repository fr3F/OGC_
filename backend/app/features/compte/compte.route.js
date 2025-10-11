const generateCrudRoutes = require("../base/CRUD/baseRoute");

let routes = (app) => {
    const nomModel = "compte"
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // CRUD
    const routes = generateCrudRoutes(nomModel)

    app.use(`/api/${nomModel.toLowerCase()}`, routes);
        
};

module.exports = routes;
