#!/usr/bin/env bash
# Clean up old/merged branches
set -euo pipefail

PROJECT_DIR="${1:-.}"
cd "$PROJECT_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}[BRANCH-CLEANER]${NC} Analyzing branches..."

# Get current branch
CURRENT=$(git branch --show-current 2>/dev/null || echo "main")

# List merged branches
echo ""
echo -e "${YELLOW}[MERGED BRANCHES]${NC}"
MERGED=$(git branch --merged 2>/dev/null | grep -v "^\*" | grep -v "main" | grep -v "master" | grep -v "develop" || echo "")

if [[ -n "$MERGED" ]]; then
  echo "$MERGED" | while read branch; do
    echo "  🌿 $branch (safe to delete)"
  done
  
  echo ""
  read -p "Delete these branches? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "$MERGED" | xargs git branch -d 2>/dev/null || true
    echo -e "${GREEN}✓${NC} Branches cleaned!"
  fi
else
  echo "  No merged branches to clean"
fi

# List old branches
echo ""
echo -e "${YELLOW}[OLD BRANCHES (>30 days)]${NC}"
git for-each-ref --sort=-committerdate refs/heads/ --format='%(refname:short) %(committerdate:relative)' 2>/dev/null | grep "month\|year" | head -5 || echo "  No old branches"

echo ""
echo -e "${GREEN}✅ Branch analysis complete!${NC}"
