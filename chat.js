const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Définition du dossier de ressources statiques
app.use(express.static(path.join(__dirname, 'public')));

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté.');

  // Gestion des messages
  socket.on('chat message', (message) => {
    console.log('Message reçu : ' + message);
    io.emit('chat message', message); // Diffusion du message à tous les utilisateurs connectés
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté.');
  });
});

// Routage pour servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile('C:\\Users\\dell\\Desktop\\index.html');
});

// Démarrage du serveur
const port = 3000;
const ipAddress = '192.168.100.86';
http.listen(port, ipAddress, () => {
  console.log(`Le serveur est en cours d'exécution sur http://${ipAddress}:${port}.`);
});
