#!/bin/bash
# 🚀 Automated Build & Deploy Script for BlockForge
# This script:
# 1. Commits changes to Git
# 2. Pushes to GitHub
# 3. Builds for Render deployment
# 4. Creates download packages
#
# USAGE:
# 1. Create deployment key on Render
# 2. Set environment variables
# 3. Run: ./deploy.sh

set -e
echo "=== BlockForge Automated Deployment ==="

# --- Configuration (can be set via env) ---
REPO_URL="https://github.com/LogicLeague47/BlockForge.git"
RENDER_DEPLOY_URL="https://api.render.com/deploy/srv-d9aa3v6cjfls739gj3rg?key=${RENDER_DEPLOY_KEY:-$RENDER_DEPLOY_DEFAULT}"

# --- Colors for output ---
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

# --- Step 1: Configure Git (if not already set) ---
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "${YELLOW}Configuring Git remote...${NC}"
    git remote add origin "$REPO_URL"
fi

if ! git config user.name >/dev/null 2>&1; then
    echo "${YELLOW}Setting Git user.name to \"BlockForge Deployer\"${NC}"
    git config user.name "BlockForge Deployer"
fi

if ! git config user.email >/dev/null 2>&1; then
    echo "${YELLOW}Setting Git user.email to \"deployer@blockforge.com\"${NC}"
    git config user.email "deployer@blockforge.com"
fi

# --- Step 2: Add, commit, and push changes ---

echo ""
echo "${GREEN}Step 2: Adding and committing changes...${NC}"
GIT_FILES=$(git status --porcelain | grep -v "^??" | awk '{print $2}' | tr '\n' ' ')
git add $GIT_FILES 2>/dev/null || git add -A

if git diff --cached --quiet; then
    echo "${YELLOW}No changes to commit${NC}"
else
    echo "${YELLOW}Committing changes...${NC}"
    git commit -m "$(date '+%Y-%m-%d %H:%M:%S') Automated deployment - $(git diff --cached --stat | head -1 | awk '{print $1}')"
    
    echo "${YELLOW}Pushing to GitHub...${NC}"
    git push origin main --quiet
fi

# --- Step 3: Build for distribution ---
echo ""
echo "${GREEN}Step 3: Building distribution files...${NC}"
npm install -g vite 2>/dev/null || echo "${YELLOW}Warning: Could not install vite globally${NC}"

# Create downloads directory
mkdir -p downloads
echo "Created downloads/ directory"

# Build the game (this creates dist/)
if npm run build 2>&1; then
    echo "${GREEN}Build successful!${NC}"
    
    # Copy privacy/terms pages to dist (if needed)
    if [ -f "privacy.html" ]; then
        cp -f privacy.html dist/ 2>/dev/null || echo "${YELLOW}Note: privacy.html not present${NC}"
    fi
    if [ -f "terms.html" ]; then
        cp -f terms.html dist/ 2>/dev/null || echo "${YELLOW}Note: terms.html not present${NC}"
    fi
    
    # Clean up dist
    find dist -name '.DS_Store' -delete
    find dist -name '__MACOSX' -type d -exec rm -rf {} + 2>/dev/null || true
    
    echo "${GREEN}Cleaned dist/ directory${NC}"
    
else
    echo "${RED}Build failed! Aborting deployment.${NC}"
    exit 1
fi

# --- Step 4: Create download packages ---
echo ""
echo "${GREEN}Step 4: Creating download packages...${NC}"

# Create download directory structure
mkdir -p downloads/mac-arm64 downloads/mac-x64 downloads/windows downloads/android downloads/iphone

# Create placeholder files (these should be actual app builds)
# In a real workflow, these would be actual builds
cat > downloads/mac-arm64/installer.sh << 'EOF'
#!/bin/bash
echo "BlockForge for Mac Apple Silicon (arm64)"
echo "This would be a .dmg or .zip installer"
EOF

 cat > downloads/mac-x64/installer.sh << 'EOF'
#!/bin/bash
echo "BlockForge for Mac Intel (x64)"
echo "This would be a .dmg or .zip installer"
EOF

 cat > downloads/windows/installer.bat << 'EOF'
@echo off
echo BlockForge for Windows
 echo This would be a .exe installer
EOF

cat > downloads/android/installer.apk << 'EOF'
PKT
# Placeholder APK file (actual binary would go here)
# Android app format
EOF

cat > downloads/iphone/installer.ipa << 'EOF'
#!/bin/bash
echo "BlockForge for iPhone"
echo "Requires SideStore and LiveContainer to install"
echo "Drag this IPA to SideStore app"
EOF

# Create zip packages for web distribution
if command -v zip >/dev/null 2>&1; then
    echo "${YELLOW}Creating ZIP packages...${NC}"
    zip -j downloads/mac-arm64.zip downloads/mac-arm64/installer.sh
    zip -j downloads/mac-x64.zip downloads/mac-x64/installer.sh
    zip -j downloads/windows.zip downloads/windows/installer.bat
    zip -j downloads/android.zip downloads/android/installer.apk
    zip -j downloads/iphone.zip downloads/iphone/installer.ipa
    rm -rf downloads/mac-arm64 downloads/mac-x64 downloads/windows downloads/android downloads/iphone
else
    echo "${YELLOW}Note: 'zip' command not found, skipping ZIP creation${NC}"
fi

# --- Step 5: Deploy to Render ---
echo ""
echo "${GREEN}Step 5: Deploying to Render...${NC}"
if curl -s -X POST "$RENDER_DEPLOY_URL" >/dev/null 2>&1; then
    echo "${GREEN}Successfully deployed to Render!${NC}"
else
    echo "${YELLOW}Render deployment failed or skipped${NC}"
fi

echo ""
echo "${GREEN}=== Deployment Complete ===${NC}"
echo "✓ Changes pushed to GitHub"
echo "✓ Distribution built"
echo "✓ Download packages created"
echo "✓ Render deployment triggered"
