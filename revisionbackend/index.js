// === Exercice 4 - Système d'autorisation simple ===

const express = require("express");
const app = express();
const PORT = 3000;

// Route 1 — Accessible à tous
app.get("/hello", (req, res) => {
  res.send("<h1>hello</h1>");
});

// Route 2 — Restreinte avec vérification du token (dans header 'token')
app.get("/restricted1", (req, res) => {
  const token = req.headers["token"];
  if (token !== "42") {
    return res.status(403).json({ message: "Interdit" });
  }
  res.json({ message: "topsecret" });
});

// Route 3 — Restreinte avec même logique, mais réponse HTML
app.get("/restricted2", (req, res) => {
  const token = req.headers["token"];
  if (token !== "42") {
    return res.status(403).send("Interdit");
  }
  res.send("<h1>Admin space</h1>");
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
