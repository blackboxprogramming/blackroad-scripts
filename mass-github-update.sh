#!/bin/bash
# Update all repos with deployment status badge

ORGS=("BlackRoad-OS" "BlackRoad-AI" "BlackRoad-Labs")
cd /tmp

for org in "${ORGS[@]}"; do
  echo "🔄 $org"
  gh repo list "$org" --limit 50 --json name --jq '.[].name' | head -10 | while read repo; do
    if gh repo clone "$org/$repo" 2>/dev/null; then
      cd "$repo"
      if [ -f "package.json" ]; then
        # Add deployment script if Next.js
        if grep -q "next" package.json; then
          echo '  "deploy": "wrangler pages deploy .next --project-name='$repo'",' >> package.json
          git add package.json
          git commit -m "🚀 Add Cloudflare deployment script" 2>/dev/null
          git push 2>/dev/null
          echo "  ✓ $repo (deployment added)"
        fi
      fi
      cd /tmp
      rm -rf "$repo"
    fi
  done
done
