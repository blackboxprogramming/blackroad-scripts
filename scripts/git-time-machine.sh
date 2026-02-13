#!/usr/bin/env bash
# Git time machine - travel through history
set -euo pipefail

PROJECT_DIR="${1:-.}"
cd "$PROJECT_DIR"

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
NC='\033[0m'

echo -e "${MAGENTA}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${MAGENTA}║${NC}        ⏰ GIT TIME MACHINE ⏰                        ${MAGENTA}║${NC}"
echo -e "${MAGENTA}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Show timeline
echo -e "${CYAN}[PROJECT TIMELINE]${NC}"
echo ""

# Get first commit
FIRST=$(git log --reverse --format="%h %ad %s" --date=short 2>/dev/null | head -1)
LAST=$(git log -1 --format="%h %ad %s" --date=short 2>/dev/null)

echo -e "  ${GREEN}🌱 BORN:${NC} $FIRST"
echo -e "  ${CYAN}📍 NOW:${NC}  $LAST"
echo ""

# Calculate project age
FIRST_DATE=$(git log --reverse --format="%at" 2>/dev/null | head -1)
NOW=$(date +%s)
AGE_DAYS=$(( (NOW - FIRST_DATE) / 86400 ))

echo -e "${CYAN}[PROJECT AGE]${NC}"
echo "  📅 $AGE_DAYS days old"
echo ""

# Activity by month
echo -e "${CYAN}[ACTIVITY HEATMAP - LAST 12 MONTHS]${NC}"
for i in {11..0}; do
  MONTH=$(date -v-${i}m '+%Y-%m' 2>/dev/null || date -d "$i months ago" '+%Y-%m' 2>/dev/null)
  COUNT=$(git log --since="$MONTH-01" --until="$MONTH-31" --oneline 2>/dev/null | wc -l | xargs)
  BARS=$(printf '█%.0s' $(seq 1 $((COUNT > 0 ? COUNT : 0))))
  printf "  %s: %s (%d)\n" "$MONTH" "$BARS" "$COUNT"
done

echo ""
echo -e "${CYAN}[TIME TRAVEL OPTIONS]${NC}"
echo "  • git checkout <commit> - Travel to specific commit"
echo "  • git log --since='2 weeks ago' - Recent history"
echo "  • git log --author='name' - See someone's changes"
echo "  • git checkout main - Return to present"

echo ""
echo -e "${GREEN}✅ Time machine ready!${NC}"
