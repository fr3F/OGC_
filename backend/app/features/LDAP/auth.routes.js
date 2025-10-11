// routes/auth.routes.js
module.exports = function (app) {
  const controller = require("../LDAP/auth.controller");
  const router = require("express").Router();

  router.post("/login", controller.login);

  app.use("/api", router);
};
<<<<<<< HEAD
=======

>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
