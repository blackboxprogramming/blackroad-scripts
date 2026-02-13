#!/bin/bash
clear
cat <<'MENU'

  🌊🌊🌊 DIGITALOCEAN 🌊🌊🌊

  Known: shellfish @ 174.138.44.45

  📊 1  List Droplets
  🖥️  2  shellfish Status
  🔌 3  SSH to shellfish
  💰 4  Account Balance
  📋 5  Droplet Actions
  🌐 6  Domains
  💾 7  Volumes
  🔥 8  Firewalls
  📸 9  Snapshots
  🔑 a  Auth Status
  🔙 0  ← Main Menu

MENU
read -p "  ⌨️  > " c
API="https://api.digitalocean.com/v2"
case $c in
  1) curl -s "$API/droplets" -H "Authorization: Bearer $DO_TOKEN" 2>/dev/null | jq -r '.droplets[] | "\(.name) — \(.status) — \(.networks.v4[0].ip_address) — \(.size.slug)"' 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  2) echo "  🖥️  shellfish (174.138.44.45):"; ssh -o ConnectTimeout=3 root@174.138.44.45 "hostname; uptime; df -h / | tail -1; free -h | grep Mem" 2>/dev/null || echo "  ⚠️  Offline"; read -p "  ↩ ";;
  3) ssh root@174.138.44.45;;
  4) curl -s "$API/customers/my/balance" -H "Authorization: Bearer $DO_TOKEN" 2>/dev/null | jq '{month_to_date_balance,account_balance,month_to_date_usage}' 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  5) read -p "  📋 Droplet ID: " id; read -p "  Action (power_on/power_off/reboot/shutdown): " action; curl -s -X POST "$API/droplets/$id/actions" -H "Authorization: Bearer $DO_TOKEN" -H "Content-Type: application/json" -d "{\"type\":\"$action\"}" 2>/dev/null | jq '.action.status' 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  6) curl -s "$API/domains" -H "Authorization: Bearer $DO_TOKEN" 2>/dev/null | jq -r '.domains[].name' 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  7) curl -s "$API/volumes" -H "Authorization: Bearer $DO_TOKEN" 2>/dev/null | jq -r '.volumes[] | "\(.name) — \(.size_gigabytes)GB — \(.region.slug)"' 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  8) curl -s "$API/firewalls" -H "Authorization: Bearer $DO_TOKEN" 2>/dev/null | jq -r '.firewalls[] | "\(.name) — \(.status)"' 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  9) curl -s "$API/snapshots" -H "Authorization: Bearer $DO_TOKEN" 2>/dev/null | jq -r '.snapshots[] | "\(.name) — \(.size_gigabytes)GB — \(.created_at)"' 2>/dev/null || echo "  ⚠️  Failed"; read -p "  ↩ ";;
  a) echo "  🔑 DO_TOKEN: ${DO_TOKEN:+✅ SET (${DO_TOKEN:0:8}...)}${DO_TOKEN:-❌ UNSET}"; curl -s "$API/account" -H "Authorization: Bearer $DO_TOKEN" 2>/dev/null | jq '{email,status,droplet_limit}' 2>/dev/null; read -p "  ↩ ";;
  0) exec ./menu.sh;;
  *) echo "  ❌"; sleep 1;;
esac
exec ./digitalocean.sh
