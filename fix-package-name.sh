#!/bin/bash

echo "🔧 Fixing Android package name to com.chorddice.app..."
echo ""

# Step 1: Create new package directory
echo "📁 Creating new package directory structure..."
mkdir -p android/app/src/main/java/com/chorddice/app

# Step 2: Create MainActivity.java with correct package
echo "📝 Creating MainActivity.java with correct package name..."
cat > android/app/src/main/java/com/chorddice/app/MainActivity.java << 'EOF'
package com.chorddice.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {}
EOF

# Step 3: Remove old package directory
echo "🗑️  Removing old package directory..."
rm -rf android/app/src/main/java/com/chordriff

# Step 4: Verify changes
echo ""
echo "✅ Package structure updated!"
echo ""
echo "📋 Verification:"
echo "   New file: $(ls -la android/app/src/main/java/com/chorddice/app/MainActivity.java 2>/dev/null && echo '✓ EXISTS' || echo '✗ MISSING')"
echo "   Old folder removed: $(ls -d android/app/src/main/java/com/chordriff 2>/dev/null && echo '✗ STILL EXISTS' || echo '✓ REMOVED')"
echo ""

# Step 5: Check build.gradle
echo "🔍 Verifying build.gradle has correct package name..."
grep -q 'applicationId "com.chorddice.app"' android/app/build.gradle && echo "   ✓ build.gradle: com.chorddice.app" || echo "   ✗ build.gradle needs update"
echo ""

# Step 6: Git status
echo "📊 Git status:"
git status --short android/app/src/main/java/
echo ""

# Step 7: Instructions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Commit and push these changes to GitHub:"
echo "    git add android/app/src/main/java/"
echo "    git commit -m 'Fix: Update package name to com.chorddice.app'"
echo "    git push"
echo ""
echo "2️⃣  Trigger GitHub Actions workflow:"
echo "    Go to: GitHub → Actions → 'Build and Deploy Android App'"
echo "    Click: 'Run workflow'"
echo "    Enable: 'Deploy to Google Play Store' ✓"
echo "    Click: 'Run workflow' button"
echo ""
echo "3️⃣  The new AAB will have package: com.chorddice.app"
echo "    This will work with your Play Console app!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Script complete! Ready to commit."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
