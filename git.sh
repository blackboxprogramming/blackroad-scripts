#!/bin/bash
clear
cat <<'MENU'

  🔀🔀🔀 GIT + GITHUB + WORKING COPY 🔀🔀🔀

  ── LOCAL ──────────────────
  📊 1  Status
  📋 2  Log (last 10)
  🔀 3  Branch List
  ⬆️  4  Add + Commit + Push
  ⬇️  5  Pull
  🔃 6  Stash / Pop
  ── GITHUB API ─────────────
  🐙 7  My Repos (gh)
  ⭐ 8  Starred Repos
  🔑 9  Auth + Token Status
  🏢 a  Org Repos (blackroad-os)
  🐛 b  Create Issue
  🔃 c  Create PR
  📊 d  Repo Traffic
  🔔 e  Notifications
  ── iOS SYNC ───────────────
  📱 f  Working Copy Paths
  📝 g  Koder Project Dirs
  🔙 0  ← Main Menu

MENU
read -p "  ⌨️  > " c
case $c in
  1) git status 2>/dev/null || echo "  ⚠️  Not a git repo"; read -p "  ↩ ";;
  2) git log --oneline -10 2>/dev/null || echo "  ⚠️  Not a git repo"; read -p "  ↩ ";;
  3) git branch -a 2>/dev/null; read -p "  ↩ ";;
  4) git add -A && read -p "  💬 Commit msg: " msg && git commit -m "$msg" && git push && echo "  ✅ Pushed" || echo "  ❌ Failed"; read -p "  ↩ ";;
  5) git pull 2>/dev/null && echo "  ✅ Pulled" || echo "  ❌ Failed"; read -p "  ↩ ";;
  6) echo "  1) stash  2) pop"; read -p "  > " s; [ "$s" = "1" ] && git stash || git stash pop; read -p "  ↩ ";;
  7) gh repo list --limit 20 2>/dev/null || echo "  ⚠️  gh not authed"; read -p "  ↩ ";;
  8) gh api user/starred --jq '.[].full_name' 2>/dev/null | head -20; read -p "  ↩ ";;
  9) gh auth status 2>&1; echo ""; echo "  🔑 Tokens:"; echo "  GITHUB_TOKEN: ${GITHUB_TOKEN:+SET}${GITHUB_TOKEN:-UNSET}"; read -p "  ↩ ";;
  a) gh repo list blackroad-os --limit 30 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  b) read -p "  🐛 Repo (org/name): " r; read -p "  Title: " t; read -p "  Body: " body; gh issue create -R "$r" -t "$t" -b "$body" 2>/dev/null && echo "  ✅ Created" || echo "  ❌ Failed"; read -p "  ↩ ";;
  c) read -p "  🔃 Repo: " r; read -p "  Title: " t; read -p "  Base branch: " base; base=${base:-main}; gh pr create -R "$r" -t "$t" -B "$base" --fill 2>/dev/null && echo "  ✅ Created" || echo "  ❌ Failed"; read -p "  ↩ ";;
  d) read -p "  📊 Repo: " r; gh api "repos/$r/traffic/views" --jq '.count' 2>/dev/null && echo " views (14d)" || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  e) gh api notifications --jq '.[].subject.title' 2>/dev/null | head -10 || echo "  (none)"; read -p "  ↩ ";;
  f) cat <<'WC'
  📱 Working Copy (iOS Git Client)
  ─────────────────────────────────
  Repos sync to: ~/Documents/Working Copy/
  Push/pull via SSH keys stored in app
  Supports LFS, submodules, diff viewer
  Tip: clone via SSH for iPad Pro workflow
WC
     read -p "  ↩ ";;
  g) cat <<'KD'
  📝 Koder (iOS Code Editor)
  ──────────────────────────
  Open from: Working Copy → Share → Koder
  Supports: Python, JS, HTML, CSS, Shell, YAML
  SSH: connects to Pis via key auth
  Tip: pair with iSH for local terminal
KD
     read -p "  ↩ ";;
  0) exec ./menu.sh;;
  *) echo "  ❌"; sleep 1;;
esac
exec ./git.sh
