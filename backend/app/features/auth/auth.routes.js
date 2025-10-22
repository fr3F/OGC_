// routes/auth.routes.js
module.exports = function (app) {
  const controller = require("./auth.controller");
  const router = require("express").Router();

  router.post("/login", controller.login);
  router.post("/userinfo", controller.getUserInfo);

  app.use("/api", router);
};


