const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const os = require("os");
const fs = require("fs");
const routes = require("./app/features/index");
const db = require("./models/index");

const app = express();
const PORT = process.env.PORT || 8082;

global.__basedir = path.resolve(__dirname);

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

let lastUsername ;
routes(app);

app.get("/api/set-username", (req, res) => {
  lastUsername = req.query.u || "";
  console.log("[API] Username reçu depuis Electron:", lastUsername);
  res.json({ success: true });
});

app.get("/api/username", (req, res) => {
  res.json({ username: lastUsername });
});

const angularDistPath = path.join(__dirname, "dist/skote");
app.use(express.static(angularDistPath));

app.use((req, res, next) => {
  const filePath = path.join(angularDistPath, req.path);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }

  if (!req.path.startsWith("/api/")) {
    return res.sendFile(path.join(angularDistPath, "index.html"));
  }

  next(); 
});

db.sequelize
  .sync({ force: true })
  .then(() => console.log("Base synchronisée"))
  .catch((err) => console.error("Erreur sync :", err));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
