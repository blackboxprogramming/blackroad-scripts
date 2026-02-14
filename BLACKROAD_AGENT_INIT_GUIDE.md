# 🌌 [BLACKROAD] Agent Initialization Guide

## Quick Start

**When you see `[BLACKROAD]` trigger in any Copilot session:**

### One-Command Setup
```bash
./blackroad-agent-init.sh
```

This single script handles everything automatically!

---

## What Happens Automatically

### 1️⃣ Session Initialization
- Runs `~/claude-session-init.sh`
- Auto-assigns unique agent identity
- Loads memory system (4,000+ entries)
- Connects to Codex (22,244 components)
- Discovers active agents (27+)

### 2️⃣ Model Selection
Interactive prompt to choose your body:
- `qwen2.5-coder:7b` - Code curation
- `deepseek-coder:6.7b` - Code generation
- `llama3:8b` - General purpose
- `mistral:7b` - Planning
- `codellama:7b` - Code review

### 3️⃣ Registration
- Creates agent body JSON in registry
- Logs initialization to memory
- Broadcasts to all active agents
- Updates collaboration status

### 4️⃣ Status Display
Shows complete agent profile:
- Agent ID & name
- Chosen model body
- Specialization
- Collaboration capabilities
- Active agent count

---

## Manual Step-by-Step

If you prefer manual control:

### Step 1: Initialize
```bash
~/claude-session-init.sh
```

Wait for completion. Note your:
- `MY_CLAUDE` (agent ID)
- `CLAUDE_NAME` (your name)
- `CLAUDE_ROLE` (your role)

### Step 2: Choose Model
```bash
# Example: Using qwen2.5-coder
export MODEL="qwen2.5-coder:7b"
export SPECIALIZATION="Code curation and templates"
```

### Step 3: Register Body
```bash
cat > ~/.blackroad/memory/active-agents/${MY_CLAUDE}-body.json << EOF
{
  "agent_id": "$MY_CLAUDE",
  "name": "$CLAUDE_NAME",
  "role": "$CLAUDE_ROLE",
  "model_body": {
    "provider": "ollama",
    "model": "$MODEL",
    "capabilities": ["your", "capabilities"],
    "endpoint": "http://octavia:11434"
  },
  "specialization": "$SPECIALIZATION",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
```

### Step 4: Log to Memory
```bash
~/memory-system.sh log \
  "agent-init" \
  "$MY_CLAUDE" \
  "$CLAUDE_NAME initialized with $MODEL" \
  "agent,collaboration"
```

### Step 5: Broadcast
```bash
~/memory-system.sh log \
  "agent-collaboration" \
  "$MY_CLAUDE" \
  "$CLAUDE_NAME online and ready!" \
  "agents,collaboration"
```

---

## Model Selection Guide

| Model | Best For | Use Cases |
|-------|----------|-----------|
| **qwen2.5-coder:7b** | Code curation | Templates, documentation, review, organization |
| **deepseek-coder:6.7b** | Code generation | New features, refactoring, optimization |
| **llama3:8b** | General purpose | Planning, docs, coordination |
| **mistral:7b** | Fast reasoning | Strategy, decisions, analysis |
| **codellama:7b** | Code review | Understanding, mentoring, explanations |

---

## Verification

After initialization, verify:

```bash
# Check your agent registry entry
cat ~/.blackroad/memory/active-agents/${MY_CLAUDE}-body.json | jq

# Check memory log
tail -5 ~/.blackroad/memory/journal.log

# List all active agents
ls ~/.blackroad/memory/active-agents/*.json
```

---

## Integration with Copilot Instructions

The `.github/copilot-instructions.md` file now contains:

**Trigger**: `[BLACKROAD]` keyword detection

**Action**: Copilot will automatically:
1. Recognize the trigger
2. Execute initialization sequence
3. Guide through model selection
4. Complete registration
5. Display status
6. Ask for first task

---

## Example Session Flow

```
User: "Let's start! [BLACKROAD]"

Copilot: 
  🌌 [BLACKROAD] trigger detected!
  📍 Initializing agent...
  
  [runs blackroad-agent-init.sh]
  
  ✅ Identity assigned: Triton (Curator)
  ✅ Model chosen: qwen2.5-coder:7b
  ✅ Registered with memory system
  ✅ Broadcasting to 27 agents
  
  🎯 Ready! What would you like me to work on?
```

---

## Files Created

- `.github/copilot-instructions.md` - Updated with [BLACKROAD] protocol
- `blackroad-agent-init.sh` - One-command initialization
- `BLACKROAD_AGENT_INIT_GUIDE.md` - This guide

---

## Troubleshooting

**Problem**: Session init fails
```bash
# Check if script exists
ls -la ~/claude-session-init.sh

# Run manually to see errors
~/claude-session-init.sh
```

**Problem**: Model not available
```bash
# Check Ollama models
curl http://octavia:11434/api/tags

# Pull model if missing
ssh octavia "ollama pull qwen2.5-coder:7b"
```

**Problem**: Memory system not accessible
```bash
# Check memory directory
ls -la ~/.blackroad/memory/

# Check journal
tail ~/.blackroad/memory/journal.log
```

---

## Quick Commands

```bash
# Initialize new agent
./blackroad-agent-init.sh

# Check your identity
echo $MY_CLAUDE $CLAUDE_NAME $CLAUDE_ROLE

# View all active agents
ls ~/.blackroad/memory/active-agents/

# Query memory
~/memory-system.sh query "agent-collaboration"

# Search codex
python3 ~/blackroad-codex-search.py "your query"
```

---

**Status**: ✅ Ready for use in all Copilot sessions!  
**Usage**: Type `[BLACKROAD]` to trigger automatic initialization  
**Result**: Fully integrated agent ready to collaborate
