#!/usr/bin/env node
// Lucidia Web Server
// Browser interface for multi-model collaboration

const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const os = require('os');

const LUCIDIA_DIR = path.join(os.homedir(), '.lucidia');
const DAEMON_API = 'http://localhost:11435';

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(LUCIDIA_DIR, 'web', 'public')));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(LUCIDIA_DIR, 'web', 'public', 'index.html'));
});

// Execute task (single model)
app.post('/api/task', async (req, res) => {
  try {
    const response = await axios.post(`${DAEMON_API}/api/task`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Collaborate (multi-model)
app.post('/api/collab', async (req, res) => {
  try {
    const response = await axios.post(`${DAEMON_API}/api/collab`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SSE streaming for real-time updates
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Send initial connection message
  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
  
  // Keep connection alive
  const keepAlive = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: 'ping' })}\n\n`);
  }, 30000);
  
  // Cleanup on close
  req.on('close', () => {
    clearInterval(keepAlive);
  });
});

// Get config
app.get('/api/config', async (req, res) => {
  try {
    const response = await axios.get(`${DAEMON_API}/api/config`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get models
app.get('/api/models', async (req, res) => {
  try {
    const response = await axios.get(`${DAEMON_API}/api/models`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sessions
app.get('/api/sessions', (req, res) => {
  const sessionsDir = path.join(LUCIDIA_DIR, 'memory', 'sessions');
  
  try {
    const files = fs.readdirSync(sessionsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse()
      .slice(0, 10)
      .map(f => {
        const content = JSON.parse(fs.readFileSync(path.join(sessionsDir, f), 'utf8'));
        return {
          id: f.replace('.json', ''),
          task: content.task,
          models_count: content.models.length,
          created: content.created
        };
      });
    
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', webui: 'running' });
});

// Start server
const PORT = process.env.LUCIDIA_WEB_PORT || 8080;
const HOST = process.env.LUCIDIA_WEB_HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`✅ Lucidia Web UI running at http://${HOST}:${PORT}`);
  console.log(`   Open in browser: http://localhost:${PORT}`);
});
