// === Exercice 6 - Authentification naïve (1 seul utilisateur) ===
// === Exercice 7 - Authentification multi-utilisateur avec token par utilisateur ===

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { getRegisteredUsers, checkCredentials } = require("./inMemoryUserRepository");
const app = express();
const PORT = 3000;

app.use(express.json());

// === Variables globales ===
const authenticatedUsers = {}; // { token: { email } }

// === Middleware de log des headers (inchangé) ===
app.use((req, res, next) => {
  console.log("Headers de la requête :", req.headers);
  next();
});

// === Middleware pare-feu générique ===
const unprotectedUrls = ["/hello", "/authenticate", "/register"];

app.use((req, res, next) => {
  const url = req.path;
  const token = req.headers["authorization"];

  if (unprotectedUrls.includes(url)) {
    return next(); // route publique
  }

  // Vérifie si le token appartient à un utilisateur connecté
  if (token && authenticatedUsers[token]) {
    return next(); // token valide → accès autorisé
  }

  return res.status(403).json({ error: "Accès refusé - token invalide" });
});

// === Routes publiques ===
app.get("/hello", (req, res) => {
  res.send("<h1>hello</h1>");
});

// === Routes restreintes ===
app.get("/restricted1", (req, res) => {
  res.json({ message: "topsecret" });
});

app.get("/restricted2", (req, res) => {
  res.send("<h1>Admin space</h1>");
});

// === Authentification utilisateur (Exo 7) ===
app.post("/authenticate", (req, res) => {
  const { email, password } = req.body;

  if (!checkCredentials(email, password)) {
    return res.status(403).json({ error: "Identifiants invalides" });
  }

  const token = uuidv4();
  authenticatedUsers[token] = { email };
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
