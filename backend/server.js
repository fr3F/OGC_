const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const os = require("os"); // <-- ajouter
const routes = require("./app/features/index"); 
const db = require("./models/index");

const app = express();
const PORT = process.env.PORT || 8082;

global.__basedir = path.resolve(__dirname);
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
routes(app); 

// Route pour récupérer le nom d'utilisateur
app.get("/api/username", (res) => {
  const username = process.env.USERNAME || process.env.USER || os.userInfo().username;
  console.log("username",username);

  res.json({ username });
});

db.sequelize.sync({ force: true })
  .then(() => console.log("Base synchronisée"))
  .catch(err => console.error("Erreur sync :", err));

app.get("/", (req, res) => {
  res.send("Server Node.js pour gestion des réceptions Excel est actif !");
});

app.listen(PORT, () => {
  console.log(`Server démarré sur http://localhost:${PORT}`);
});
