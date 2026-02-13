#!/bin/bash
clear
cat <<'MENU'

  🐙🐙🐙 GITHUB 🐙🐙🐙

  🏢 1  List Orgs (15)
  📦 2  List Repos
  📊 3  Repo Stats
  🔀 4  Recent Commits
  🐛 5  Open Issues
  🔃 6  Pull Requests
  🔑 7  Auth Status
  🔙 0  ← Main Menu

MENU
read -p "  ⌨️  > " c
case $c in
  1) echo "  🏢 BlackRoad Orgs:"; echo "  blackroad-os (Enterprise)"; echo "  Blackbox-Enterprises BlackRoad-AI BlackRoad-Archive"; echo "  BlackRoad-Cloud BlackRoad-Education BlackRoad-Foundation"; echo "  BlackRoad-Gov BlackRoad-Hardware BlackRoad-Interactive"; echo "  BlackRoad-Labs BlackRoad-Media BlackRoad-Security"; echo "  BlackRoad-Studio BlackRoad-Ventures"; read -p "  ↩ ";;
  2) read -p "  📦 Org (enter for blackroad-os): " org; org=${org:-blackroad-os}; gh repo list "$org" -L 20 2>/dev/null || echo "  ⚠️  gh not authed"; read -p "  ↩ ";;
  3) read -p "  📊 Repo (org/name): " r; gh repo view "$r" 2>/dev/null || echo "  ⚠️  Not found"; read -p "  ↩ ";;
  4) read -p "  🔀 Repo: " r; gh api "repos/$r/commits?per_page=5" --jq '.[].commit.message' 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  5) read -p "  🐛 Repo: " r; gh issue list -R "$r" -L 10 2>/dev/null || echo "  ⚠️  None"; read -p "  ↩ ";;
  6) read -p "  🔃 Repo: " r; gh pr list -R "$r" -L 10 2>/dev/null || echo "  ⚠️  None"; read -p "  ↩ ";;
  7) gh auth status 2>&1; read -p "  ↩ ";;
  0) exec ./menu.sh;;
  *) echo "  ❌"; sleep 1;;
esac
exec ./github.sh
