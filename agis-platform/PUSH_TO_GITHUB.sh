#!/bin/bash

# AGIS Platform - Push to GitHub
# This script pushes your code to GitHub and deploys to Netlify

echo "🚀 AGIS Platform - GitHub Push Script"
echo ""
echo "Before running this script:"
echo "1. Create a repo at https://github.com/new"
echo "2. Name it: agis-platform"
echo "3. Don't initialize with README"
echo ""
echo "Then update USERNAME below and run this script"
echo ""

# ⚠️ UPDATE THIS WITH YOUR GITHUB USERNAME
USERNAME="thefiredev-cloud"
REPO_URL="https://github.com/${USERNAME}/agis-platform.git"

echo "📝 Using repository: $REPO_URL"
echo ""

# Add remote
echo "Adding GitHub remote..."
git remote add origin $REPO_URL 2>/dev/null || echo "Remote already exists, skipping..."

# Push to GitHub
echo "Pushing code to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "📊 Repository URL: https://github.com/${USERNAME}/agis-platform"
echo ""
echo "🚀 Next steps:"
echo "1. Go to https://app.netlify.com"
echo "2. Click 'New site from Git'"
echo "3. Select your GitHub repo"
echo "4. Netlify will auto-detect settings and deploy!"
echo ""
echo "Your site will be live at: https://agis-platform.netlify.app"
