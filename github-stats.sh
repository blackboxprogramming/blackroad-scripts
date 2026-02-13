#!/bin/bash
# GitHub Repository Statistics

echo "📊 BlackRoad GitHub Statistics"
echo "================================"
echo ""

jq -r '
"Total Organizations: " + (.total_orgs | tostring),
"Total Repositories: " + (.total_repos | tostring),
"",
"Repositories by Organization:",
(.organizations | to_entries | sort_by(.value.repo_count) | reverse | .[] | 
  "  • " + .key + ": " + (.value.repo_count | tostring) + " repos")
' github-master-index.json

echo ""
echo "Top 10 Most Recently Updated:"
jq -r '.[] | "\(.updated[:10]) - [\(.org)] \(.name)"' github-search-helper.json | sort -r | head -10

echo ""
echo "Top 10 Most Starred:"
jq -r 'sort_by(.stars) | reverse | .[:10] | .[] | "⭐ \(.stars) - [\(.org)] \(.name)"' github-search-helper.json

