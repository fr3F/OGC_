const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const os = require("os");
const fs = require("fs");
const session = require("express-session");

const routes = require("./app/features/index");
const db = require("./models/index");

const app = express();
const PORT = process.env.PORT || 8082;

// ----------------- Middleware -----------------

// Configuration CORS pour Angular
const allowedOrigin = "http://192.168.2.41:8086"; 
app.use(cors({
  origin: allowedOrigin,
  credentials: true 
}));

// Body parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'uiUjkl4k3r9p!s@lT#2025!',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: 'lax' } // compatible HTTP local
}));


// ----------------- Routes -----------------

routes(app);

let lastUsername = "";

// API pour récupérer le username du serveur
// app.get("/api/username", (req, res) => {
//   const username = process.env.USERNAME || process.env.USER || os.userInfo().username;
//   console.log("[API] Username serveur :", username);
//   res.json({ username });
// });

// API pour renvoyer le username stocké
// app.get("/api/get-username", (req, res) => {
//   res.json({ username: lastUsername });
// });

// ----------------- Angular static -----------------

const angularDistPath = path.join(__dirname, "dist/skote");
app.use(express.static(angularDistPath));

app.use((req, res, next) => {
  const filePath = path.join(angularDistPath, req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }
  // Toutes les routes non-API renvoient index.html
  if (!req.path.startsWith("/api/")) {
    return res.sendFile(path.join(angularDistPath, "index.html"));
  }
  next();
});

// ----------------- DB -----------------

db.sequelize
  .sync({ alter: true })
  .then(() => console.log("Base synchronisée"))
  .catch((err) => console.error("Erreur sync :", err));

// ----------------- Lancement -----------------

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
