// routes/auth.routes.js
module.exports = function (app) {
  const controller = require("../LDAP/auth.controller");
  const router = require("express").Router();

  router.post("/login", controller.login);

  app.use("/api", router);
};
