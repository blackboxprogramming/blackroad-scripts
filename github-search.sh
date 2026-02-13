#!/bin/bash
# GitHub Repository Search Tool
# Usage: ./github-search.sh <search-term>

if [ -z "$1" ]; then
    echo "Usage: $0 <search-term>"
    echo "Example: $0 quantum"
    exit 1
fi

SEARCH_TERM="$1"

echo "🔍 Searching for: $SEARCH_TERM"
echo ""

jq -r --arg term "$SEARCH_TERM" '
  .[] | 
  select(
    (.name | ascii_downcase | contains($term | ascii_downcase)) or 
    (.description | ascii_downcase | contains($term | ascii_downcase))
  ) | 
  "[\(.org)] \(.name)\n  📝 \(.description // "No description")\n  🔗 \(.url)\n  ⭐ \(.stars) | 🕒 \(.updated[:10])\n"
' github-search-helper.json

