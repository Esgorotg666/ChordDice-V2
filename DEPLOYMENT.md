# Guitar Dice - Android Deployment Guide

## ⚠️ CRITICAL SECURITY NOTICE

**READ FIRST**: Before deploying, see `SECURITY_CRITICAL.md` for important security information about keystore management. The existing keystores in this repository have been exposed and must be regenerated before first deployment.

## Overview
Guitar Dice is deployed to Google Play Store using automated GitHub Actions workflows. This guide covers the complete deployment process from development to production release.

## Prerequisites

### Required GitHub Secrets
Configure these secrets in your GitHub repository (Settings → Secrets and variables → Actions):

1. **KEYSTORE_BASE64**
   - Base64-encoded upload keystore for signing releases
   - Location: `android/keystore_base64.txt` (already generated)
   - To regenerate: `base64 -w 0 android/upload-keystore.jks > android/keystore_base64.txt`

2. **KEYSTORE_PASSWORD**
   - Password for the upload keystore

3. **KEY_ALIAS**
   - Alias name for the signing key (default: `upload`)

4. **KEY_PASSWORD**
   - Password for the signing key

5. **SERVICE_ACCOUNT_JSON**
   - Google Play Console service account JSON for automated uploads
   - Create at: [Google Play Console](https://play.google.com/console/) → Settings → API access

## App Configuration

### Current Version
- **App ID**: `com.chorddice.app`
- **App Name**: Guitar Dice
- **Version Code**: 28
- **Version Name**: 1.8.0

### Version Management
Version codes are automatically incremented during tagged releases:
```bash
VERSION_CODE = 10000 + GITHUB_RUN_NUMBER
```

## Deployment Workflows

### 1. Continuous Integration (PR/Push)
**Workflow**: `build-android.yml`
- **Trigger**: Push to `main` branch or pull requests
- **Output**: Unsigned APK and AAB for testing
- **Use Case**: Verify builds work before merging

### 2. Production Release (Tagged)
**Workflow**: `android-build.yml`
- **Trigger**: Git tags matching `v*` (e.g., `v1.8.0`)
- **Output**: 
  - Signed APK (for sideloading)
  - Signed AAB (for Play Store)
  - Auto-upload to Google Play Internal Testing track
- **Use Case**: Official releases to Play Store

### 3. Manual Deployment
**Workflow**: `android-build.yml` with workflow_dispatch
- **Trigger**: Manual via GitHub Actions UI
- **Options**: Toggle Play Store deployment
- **Use Case**: Emergency releases or testing deployments

## Release Process

### Option A: Automated Release (Recommended)

1. **Prepare Release**
   ```bash
   # Ensure you're on main branch and up to date
   git checkout main
   git pull origin main
   ```

2. **Update Version in Android Config**
   ```bash
   # Edit android/app/build.gradle
   # Increment versionCode (e.g., 27 → 28)
   # Update versionName (e.g., "1.7.0" → "1.8.0")
   ```

3. **Commit and Tag**
   ```bash
   git add android/app/build.gradle
   git commit -m "Release v1.8.0: [Brief description of changes]"
   git tag v1.8.0
   git push origin main
   git push origin v1.8.0
   ```

4. **Monitor Deployment**
   - Go to GitHub → Actions tab
   - Watch the "Build and Deploy Android App" workflow
   - Download artifacts if needed (APK/AAB files)

5. **Verify in Play Console**
   - Visit [Google Play Console](https://play.google.com/console/)
   - Navigate to: Your App → Testing → Internal testing
   - Verify the new version appears
   - Promote to Alpha/Beta/Production as needed

### Option B: Manual Workflow Trigger

1. Go to GitHub → Actions → "Build and Deploy Android App"
2. Click "Run workflow"
3. Select branch (usually `main`)
4. Toggle "Deploy to Google Play Store" option
5. Click "Run workflow"
6. Monitor progress and download artifacts

### Option C: Local Development Build

For testing on your device without GitHub Actions:

```bash
# Build web assets
npm run build

# Sync with Android
npx cap sync android

# Build APK (requires Android Studio and SDK)
cd android
./gradlew assembleRelease

# Output: android/app/build/outputs/apk/release/app-release.apk
```

Note: Local builds require Android Studio, Java 21, and Android SDK installed.

## Testing Tracks

### Internal Testing
- **Purpose**: Team testing and QA
- **Automatic**: Yes (on tagged releases)
- **Access**: Closed group via email list

### Alpha Testing
- **Purpose**: Early adopters and beta testers
- **Promotion**: Manual via Play Console
- **Access**: Opt-in testers

### Beta Testing  
- **Purpose**: Public beta for wider feedback
- **Promotion**: Manual via Play Console
- **Access**: Open to anyone

### Production
- **Purpose**: Public release
- **Promotion**: Manual via Play Console (requires review)
- **Access**: All users

## Deployment Checklist

Before releasing to production:

- [ ] All critical bugs fixed
- [ ] Session authentication tested and working
- [ ] Subscription payments working (Stripe integration)
- [ ] Freemium limits enforced correctly
- [ ] Affiliate links working for all regions
- [ ] Daily streak system tracking properly
- [ ] Analytics events firing (Google Analytics 4)
- [ ] App tested on multiple Android versions (minSdk: 22, targetSdk: 34)
- [ ] Privacy policy and terms of service updated
- [ ] App store listing updated (screenshots, description)
- [ ] Version code incremented
- [ ] Version name updated
- [ ] Changelog prepared

## File Structure

```
android/
├── app/
│   ├── build.gradle              # Version config, signing
│   └── src/main/
│       ├── AndroidManifest.xml   # Permissions, app config
│       └── res/                  # App icons, splash screens
├── upload-keystore.jks           # Signing keystore (DO NOT COMMIT)
├── keystore_base64.txt           # Base64 keystore for CI/CD
├── upload_certificate.pem        # Upload certificate
└── encryption_public_key.pem     # Play Store encryption key

.github/workflows/
├── android-build.yml             # Full deployment workflow
└── build-android.yml             # CI testing workflow
```

## Troubleshooting

### Build Fails in GitHub Actions
1. Check workflow logs for specific error
2. Verify all secrets are configured correctly
3. Ensure `KEYSTORE_BASE64` is valid base64 of keystore file
4. Confirm keystore password and alias match

### Play Store Upload Fails
1. Verify `SERVICE_ACCOUNT_JSON` secret is valid
2. Check service account has "Release Manager" role
3. Ensure version code is higher than previous releases
4. Check app is created in Play Console

### APK/AAB Not Signed
1. Verify all 4 keystore secrets are set (PASSWORD, ALIAS, KEY_PASSWORD)
2. Check keystore file exists and is valid
3. Confirm `KEYSTORE_FILE` environment variable points to correct location

### Version Code Conflicts
- Version codes must always increase
- CI uses formula: `10000 + RUN_NUMBER`
- Manual builds use version from `build.gradle`
- Never reuse a version code that was uploaded to Play Store

## Security Notes

1. **Never commit keystore files** - Use `.gitignore` to exclude `*.jks` files
2. **Rotate secrets regularly** - Update keystore passwords periodically  
3. **Limit service account permissions** - Only grant necessary Play Console roles
4. **Use environment-specific keys** - Development vs production keystores
5. **Enable Play App Signing** - Let Google manage production signing key

## Support & Resources

- **Google Play Console**: https://play.google.com/console/
- **Capacitor Docs**: https://capacitorjs.com/docs/android
- **Android Developer Guide**: https://developer.android.com/studio/publish
- **GitHub Actions Docs**: https://docs.github.com/en/actions

## Quick Commands Reference

```bash
# Build web assets
npm run build

# Sync Capacitor with Android
npx cap sync android

# Open in Android Studio
npx cap open android

# Build release APK (local)
cd android && ./gradlew assembleRelease

# Build release AAB (local)
cd android && ./gradlew bundleRelease

# Create version tag
git tag v1.8.0 && git push origin v1.8.0

# Check build outputs
ls -lh android/app/build/outputs/apk/release/
ls -lh android/app/build/outputs/bundle/release/
```

## Current Status

✅ Capacitor configured  
✅ Android project initialized  
✅ Keystore generated and configured  
✅ GitHub Actions workflows created  
✅ Auto-deployment to Play Store Internal Testing  
✅ Session authentication working  
✅ Stripe subscriptions integrated  
✅ Freemium model implemented  

**Next Steps**: 
1. Configure GitHub secrets (KEYSTORE_*, SERVICE_ACCOUNT_JSON)
2. Create app in Google Play Console
3. Set up internal testing track
4. Tag first release: `v1.8.0`
