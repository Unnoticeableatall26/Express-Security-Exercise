// === Exercice 7 - Gestion des utilisateurs enregistrés ===

const registeredUsers = [
  { email: "alice@example.com", password: "1234" },
  { email: "bob@example.com", password: "5678" },
];

// Retourne tous les utilisateurs
function getRegisteredUsers() {
  return registeredUsers;
}

// Vérifie si un email/mot de passe correspond à un utilisateur inscrit
function checkCredentials(email, password) {
  return registeredUsers.some(
    (user) => user.email === email && user.password === password
  );
}

// Pourrait être utilisé plus tard pour ajouter des utilisateurs
function newUserRegistered(email, password) {
  registeredUsers.push({ email, password });
}

module.exports = {
  getRegisteredUsers,
  checkCredentials,
  newUserRegistered,
};
