#!/bin/bash
set -e
echo "=== BlockForge Auto Deploy ==="
git add -A
if git diff --cached --quiet; then
  echo "No changes to commit"
else
  git commit -m "$(date '+%Y-%m-%d %H:%M:%S') auto-deploy"
  git push origin main
  echo "✓ Pushed to GitHub"
fi
echo "✓ Triggering Render deploy..."
curl -s -X POST "https://api.render.com/deploy/srv-d9aa3v6cjfls739gj3rg?key=62rFnWWb5YM" -H "Content-Type: application/json"
echo ""
echo "✓ Done"
