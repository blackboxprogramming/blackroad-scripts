// Lucidia Web UI - Frontend Logic
// Vanilla JavaScript - No frameworks

class LucidiaUI {
  constructor() {
    this.API = window.location.origin;
    this.eventSource = null;
    this.setupEventListeners();
    this.loadSessions();
    this.connectSSE();
  }

  // Setup event listeners
  setupEventListeners() {
    document.getElementById('execute-btn').addEventListener('click', () => this.execute());
    document.getElementById('clear-btn').addEventListener('click', () => this.clear());
    document.getElementById('prompt').addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        this.execute();
      }
    });
  }

  // Execute task
  async execute() {
    const prompt = document.getElementById('prompt').value.trim();
    if (!prompt) return;

    const mode = document.getElementById('mode-select').value;
    const btn = document.getElementById('execute-btn');
    
    // Disable button
    btn.disabled = true;
    btn.textContent = '⏳ Executing...';

    // Show loading
    this.showLoading();

    try {
      let result;
      if (mode === 'collab') {
        result = await this.executeCollab(prompt);
      } else {
        result = await this.executeTask(prompt, mode);
      }
      
      this.displayResults(result, mode);
    } catch (err) {
      this.showError(err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = '🚀 Execute';
    }
  }

  // Execute single model task
  async executeTask(prompt, model) {
    const response = await fetch(`${this.API}/api/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model })
    });
    
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  }

  // Execute multi-model collaboration
  async executeCollab(prompt) {
    const response = await fetch(`${this.API}/api/collab`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  }

  // Display results
  displayResults(data, mode) {
    const results = document.getElementById('results');
    
    if (mode === 'collab') {
      // Multi-model results (side-by-side)
      results.innerHTML = `
        <div class="multi-model-results">
          ${data.models.map((model, i) => this.createModelPanel(model, i)).join('')}
        </div>
      `;
    } else {
      // Single model result
      results.innerHTML = this.createModelPanel(data, 0);
    }
  }

  // Create model panel HTML
  createModelPanel(model, index) {
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
    const color = colors[index % colors.length];
    
    return `
      <div class="model-panel">
        <div class="model-header" style="border-left: 4px solid ${color}">
          <div class="model-info">
            <h3>${model.model}</h3>
            <p class="model-role">${model.role} • ${model.reasoning}</p>
          </div>
          <div class="model-stats">
            <div class="time">${model.time.toFixed(2)}s</div>
            <div>${model.tokens} tokens</div>
          </div>
        </div>
        <div class="model-content">
          <div class="model-response">${this.formatResponse(model.response || model.error)}</div>
        </div>
      </div>
    `;
  }

  // Format response (basic markdown-style)
  formatResponse(text) {
    if (!text) return '';
    
    // Escape HTML
    text = text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
    
    // Highlight code blocks
    text = text.replace(/```(\w*)\n([\s\S]*?)```/g, 
      '<pre><code class="language-$1">$2</code></pre>');
    
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    return text;
  }

  // Show loading indicator
  showLoading() {
    document.getElementById('results').innerHTML = `
      <div class="loading-indicator">
        <div class="spinner"></div>
        <p>Models are thinking...</p>
      </div>
    `;
  }

  // Show error
  showError(message) {
    document.getElementById('results').innerHTML = `
      <div class="empty-state">
        <h2>❌ Error</h2>
        <p>${message}</p>
      </div>
    `;
  }

  // Clear input
  clear() {
    document.getElementById('prompt').value = '';
    document.getElementById('prompt').focus();
  }

  // Load recent sessions
  async loadSessions() {
    try {
      const response = await fetch(`${this.API}/api/sessions`);
      const sessions = await response.json();
      
      const list = document.getElementById('session-list');
      if (sessions.length === 0) {
        list.innerHTML = '<li class="loading">No sessions yet</li>';
        return;
      }
      
      list.innerHTML = sessions.map(s => `
        <li data-id="${s.id}">
          ${s.task.substring(0, 40)}...
          <br>
          <small>${new Date(s.created).toLocaleDateString()}</small>
        </li>
      `).join('');
      
      // Add click handlers
      list.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
          const id = li.dataset.id;
          this.loadSession(id);
        });
      });
    } catch (err) {
      console.error('Failed to load sessions:', err);
    }
  }

  // Load specific session
  async loadSession(id) {
    // TODO: Implement session loading
    console.log('Load session:', id);
  }

  // Connect to SSE stream
  connectSSE() {
    this.eventSource = new EventSource(`${this.API}/api/stream`);
    
    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'connected') {
        this.updateStatus('connected');
      } else if (data.type === 'ping') {
        // Keep-alive
      }
    };
    
    this.eventSource.onerror = () => {
      this.updateStatus('disconnected');
      setTimeout(() => this.connectSSE(), 5000);
    };
  }

  // Update connection status
  updateStatus(status) {
    const indicator = document.getElementById('status');
    const text = document.getElementById('status-text');
    
    if (status === 'connected') {
      indicator.style.color = '#10b981';
      text.textContent = 'Connected';
    } else {
      indicator.style.color = '#ef4444';
      text.textContent = 'Disconnected';
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new LucidiaUI();
});
