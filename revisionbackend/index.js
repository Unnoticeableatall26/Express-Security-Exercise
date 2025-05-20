// === Exercice 7 - Auth multi-utilisateur avec token ===
// === Exercice 8 - Enregistrement utilisateur (sans hash) ===

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
  getRegisteredUsers,
  checkCredentials,
  newUserRegistered,
} = require("./inMemoryUserRepository");
const app = express();
const PORT = 3000;

app.use(express.json());

const authenticatedUsers = {}; // { token: { email } }

app.use((req, res, next) => {
  console.log("Headers de la requête :", req.headers);
  next();
});

// Middleware pare-feu
const unprotectedUrls = ["/hello", "/authenticate", "/register"];

app.use((req, res, next) => {
  const url = req.path;
  const token = req.headers["authorization"];

  if (unprotectedUrls.includes(url)) {
    return next();
  }

  if (token && authenticatedUsers[token]) {
    return next();
  }

  return res.status(403).json({ error: "Accès refusé - token invalide" });
});

// Route publique
app.get("/hello", (req, res) => {
  res.send("<h1>hello</h1>");
});

// Routes protégées
app.get("/restricted1", (req, res) => {
  res.json({ message: "topsecret" });
});

app.get("/restricted2", (req, res) => {
  res.send("<h1>Admin space</h1>");
});

// Authentification
app.post("/authenticate", (req, res) => {
  const { email, password } = req.body;

  if (!checkCredentials(email, password)) {
    return res.status(403).json({ error: "Identifiants invalides" });
  }

  const token = uuidv4();
  authenticatedUsers[token] = { email };
  res.json({ token });
});

// === Exercice 8 : Route d'inscription ===
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Vérifie que l'email n'est pas déjà enregistré
  const userExists = getRegisteredUsers().some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: "Utilisateur déjà enregistré" });
  }

  newUserRegistered(email, password);
  res.status(201).json({ message: "Utilisateur enregistré avec succès" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
