const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const BASE = process.env.HOME + '/lucidia-phase2/sessions';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  const sessions = fs.existsSync(BASE)
    ? fs.readdirSync(BASE).filter(d => fs.statSync(path.join(BASE, d)).isDirectory())
    : [];
  res.send(`
    <h1>Lucidia AUTO+ Dashboard</h1>
    <form method="POST" action="/run">
      <input name="session" placeholder="session name" value="web-session"/>
      <button type="submit">Run AUTO+</button>
    </form>
    <h2>Sessions</h2>
    <ul>
      ${sessions.map(s => `<li><a href="/session/${s}">${s}</a></li>`).join('')}
    </ul>
  `);
});

app.post('/run', (req, res) => {
  const session = req.body.session || 'web-session';
  exec(`autoplus <<< "${session}\nApprove execution\n"`, { shell: '/bin/bash' });
  res.redirect('/');
});

app.get('/session/:name', (req, res) => {
  const dir = path.join(BASE, req.params.name);
  if (!fs.existsSync(dir)) return res.send('Session not found');
  const files = fs.readdirSync(dir);
  res.send(`
    <h1>Session: ${req.params.name}</h1>
    <ul>
      ${files.map(f => `<li><a href="/log/${req.params.name}/${f}">${f}</a></li>`).join('')}
    </ul>
    <a href="/">Back</a>
  `);
});

app.get('/log/:session/:file', (req, res) => {
  const file = path.join(BASE, req.params.session, req.params.file);
  if (!fs.existsSync(file)) return res.send('Log not found');
  res.type('text').send(fs.readFileSync(file, 'utf8'));
});

app.listen(PORT, () => {
  console.log(`Lucidia Web UI running at http://localhost:${PORT}`);
});
