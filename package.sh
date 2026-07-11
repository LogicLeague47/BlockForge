#!/bin/bash
# Build and package BlockForge for submission
# Usage: ./package.sh

set -e

echo "=== Building BlockForge ==="
npm run build

echo ""
echo "=== Copying standalone pages (privacy/terms) ==="
cp -f privacy.html terms.html dist/ 2>/dev/null || true

echo ""
echo "=== Cleaning metadata files ==="
find dist -name '.DS_Store' -delete
find dist -name '__MACOSX' -type d -exec rm -rf {} + 2>/dev/null || true

echo ""
echo "=== Creating clean ZIP ==="
ZIP_NAME="BlockForge-dist.zip"
cd dist
zip -r "../$ZIP_NAME" . -x "*.DS_Store" "*__MACOSX*"
cd ..

echo ""
echo "=== Done! ==="
echo "Created: $ZIP_NAME"
echo "Size: $(du -h "$ZIP_NAME" | cut -f1)"
echo ""
echo "Tip: Verify the ZIP contents:"
echo "  unzip -l $ZIP_NAME | head -20"
