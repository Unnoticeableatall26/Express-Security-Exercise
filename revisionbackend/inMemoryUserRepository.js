// === Exercice 7 & 8 - Répertoire utilisateur en mémoire ===

const registeredUsers = [
  { email: "alice@example.com", password: "1234" },
  { email: "bob@example.com", password: "5678" },
];

// Retourne la liste des utilisateurs enregistrés
function getRegisteredUsers() {
  return registeredUsers;
}

// Vérifie les identifiants d'un utilisateur
function checkCredentials(email, password) {
  return registeredUsers.some(
    (user) => user.email === email && user.password === password
  );
}

// Ajoute un nouvel utilisateur à la liste
function newUserRegistered(email, password) {
  registeredUsers.push({ email, password });
}

module.exports = {
  getRegisteredUsers,
  checkCredentials,
  newUserRegistered,
};
