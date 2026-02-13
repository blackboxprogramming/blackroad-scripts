#!/usr/bin/env bash
# BlackRoad Auto-Git Environment
set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

REPO_ROOT="${1:-$(pwd)}"
cd "$REPO_ROOT"

echo -e "${BLUE}[AUTO-GIT]${NC} Initializing automatic git environment..."

# Ensure we're in a git repo
if [[ ! -d .git ]]; then
  echo -e "${YELLOW}⚠${NC} Not a git repo. Initialize one? (y/n)"
  read -r INIT
  if [[ "$INIT" == "y" ]]; then
    git init
    echo -e "${GREEN}✓${NC} Git initialized"
  else
    echo "Cancelled."
    exit 1
  fi
fi

# Check if repo has a remote
if ! git remote get-url origin >/dev/null 2>&1; then
  echo -e "${YELLOW}⚠${NC} No remote 'origin' found."
  echo "Would you like to:"
  echo "1. Create new GitHub repo"
  echo "2. Add existing remote manually"
  echo "3. Skip (local only)"
  read -r CHOICE
  
  case $CHOICE in
    1)
      REPO_NAME=$(basename "$REPO_ROOT")
      echo -e "${BLUE}[GitHub]${NC} Creating repo: $REPO_NAME"
      gh repo create "$REPO_NAME" --private --source=. --remote=origin --push || true
      ;;
    2)
      echo "Enter remote URL:"
      read -r REMOTE_URL
      git remote add origin "$REMOTE_URL"
      ;;
    3)
      echo "Skipping remote setup"
      ;;
  esac
fi

# Setup git hooks for auto-commit
HOOKS_DIR=".git/hooks"
mkdir -p "$HOOKS_DIR"

# Post-commit hook to auto-push
cat > "$HOOKS_DIR/post-commit" <<'HOOK'
#!/bin/bash
# Auto-push after commit
BRANCH=$(git branch --show-current)
if git remote get-url origin >/dev/null 2>&1; then
  echo "[AUTO-GIT] Auto-pushing to origin/$BRANCH..."
  git push origin "$BRANCH" 2>/dev/null || {
    echo "[AUTO-GIT] Push failed, may need to pull first"
    git pull --rebase origin "$BRANCH" 2>/dev/null && git push origin "$BRANCH"
  }
fi
HOOK
chmod +x "$HOOKS_DIR/post-commit"

# Create auto-commit function
cat > "$REPO_ROOT/.git-auto-commit.sh" <<'AUTOCOMMIT'
#!/bin/bash
# Auto-commit changed files
set -e

if [[ -z "$(git status --porcelain)" ]]; then
  echo "[AUTO-GIT] No changes to commit"
  exit 0
fi

MESSAGE="${1:-Auto-commit: $(date +%Y-%m-%d\ %H:%M:%S)}"

echo "[AUTO-GIT] Auto-committing changes..."
git add -A
git commit -m "$MESSAGE"
echo "[AUTO-GIT] ✓ Committed and pushed!"
AUTOCOMMIT
chmod +x "$REPO_ROOT/.git-auto-commit.sh"

# Add to memory system
echo -e "${GREEN}✓${NC} Auto-git environment ready!"
echo ""
echo "Usage:"
echo "  ./.git-auto-commit.sh                    # Auto-commit with timestamp"
echo "  ./.git-auto-commit.sh 'your message'     # Auto-commit with message"
echo ""
echo "Features enabled:"
echo "  ✓ Auto-push after every commit"
echo "  ✓ Auto-rebase if behind"
echo "  ✓ Git hooks installed"
echo ""

# Log to memory
MEMORY_DIR="$HOME/.codex/memory"
mkdir -p "$MEMORY_DIR"
cat >> "$MEMORY_DIR/git-environments.log" <<LOG
[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Auto-git enabled: $REPO_ROOT
LOG

echo -e "${BLUE}[MEMORY]${NC} Logged to: $MEMORY_DIR/git-environments.log"
