// main.js
const { app } = require('electron');
const path = require('path');
const http = require('http');
const os = require('os');
const { spawn } = require('child_process');

const username = os.userInfo().username;
console.log('[DEBUG] Nom d’utilisateur Windows:', username);

function waitForAngular(callback) {
  http.get('http://localhost:8086', (res) => {
    if (res.statusCode === 200) {
      console.log('[DEBUG] Angular est prêt');
      callback();
    } else {
      setTimeout(() => waitForAngular(callback), 500);
    }
  }).on('error', () => {
    setTimeout(() => waitForAngular(callback), 500);
  });
}

function startAngular() {
  console.log('[DEBUG] Lancement du serveur Angular...');
  const ng = spawn('npm', ['run', 'ng', '--', 'serve', '--port', '8086'], {
    cwd: path.join(__dirname),
    shell: true,
    stdio: 'inherit'
  });

  ng.on('close', (code) => console.log(`Angular process exited with code ${code}`));

  waitForAngular(() => {
    // Une fois Angular prêt, envoie le username au backend
    http.get(`http://localhost:8082/api/set-username?u=${encodeURIComponent(username)}`, (res) => {
      console.log('[DEBUG] Username envoyé au backend');
    });
  });
}

app.whenReady().then(startAngular);
