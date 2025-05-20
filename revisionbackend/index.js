// === Exercice 5 - Middleware (Pare-feu statique avec token codé en dur) ===
// === Exercice 6 - Authentification naïve avec token dynamique ===

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 3000;

// === Middleware pour lire le corps JSON (nécessaire pour l'auth POST) ===
app.use(express.json());

// === Variable globale : token valide stocké après login ===
let validToken = null;

// === Middleware 1 : Log des headers (exercice 5) ===
app.use((req, res, next) => {
  console.log("Requête entrante - Headers :", req.headers);
  next();
});

// === Middleware 2 : Firewall (exercice 5 modifié dans exercice 6) ===
const unprotectedUrls = ["/hello", "/authenticate", "/register"];

app.use((req, res, next) => {
  const url = req.path;
  const token = req.headers["authorization"];

  if (unprotectedUrls.includes(url)) {
    return next();
  }

  // === Exercice 5 (ancienne vérif) ===
  // if (token === "42") return next();

  // === Exercice 6 (nouvelle vérif avec token généré dynamiquement) ===
  if (token === validToken) {
    return next();
  }

  return res.status(403).json({ error: "Accès refusé - token manquant ou invalide" });
});

// === Route GET publique (accessible sans token) ===
app.get("/hello", (req, res) => {
  res.send("<h1>hello</h1>");
});

// === Routes protégées (nécessitent token) ===
app.get("/restricted1", (req, res) => {
  res.json({ message: "topsecret" });
});

app.get("/restricted2", (req, res) => {
  res.send("<h1>Admin space</h1>");
});

// === Route POST /authenticate : génère un token pour le client ===
app.post("/authenticate", (req, res) => {
  const { email, password } = req.body;
  console.log(`Tentative de connexion : ${email}`);

  // Pas de vérification réelle ici (exercice 6)
  const token = uuidv4();
  validToken = token;

  res.json({ token });
});

// === Démarrage du serveur ===
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
