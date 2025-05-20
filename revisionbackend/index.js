// === Exercice 5 - Pare-feu avec middleware générique ===

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware 1 : affichage des headers
app.use((req, res, next) => {
  console.log("Requête entrante - Headers :", req.headers);
  next();
});

// Middleware 2 : pare-feu pour contrôler l'accès aux routes protégées
const unprotectedUrls = ["/hello", "/authenticate", "/register"]; // Ces routes sont publiques

app.use((req, res, next) => {
  const url = req.path;
  const token = req.headers["authorization"]; // On passe au header 'authorization' pour plus de cohérence

  if (unprotectedUrls.includes(url)) {
    return next(); // URL publique → on continue normalement
  }

  if (token === "42") {
    return next(); // token correct → on autorise l'accès
  }

  // Sinon → accès interdit
  return res.status(403).json({ error: "Accès refusé - token manquant ou invalide" });
});

// Routes existantes (toujours en place)
app.get("/hello", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.get("/restricted1", (req, res) => {
  res.json({ message: "topsecret" });
});

app.get("/restricted2", (req, res) => {
  res.send("<h1>Admin space</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
