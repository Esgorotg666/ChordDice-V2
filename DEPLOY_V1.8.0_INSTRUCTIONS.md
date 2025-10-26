# 🚀 Deploy Guitar Dice v1.8.0 - Step-by-Step Guide

**Version**: 1.8.0 (Build 28)  
**New Features**: 15 beginner guitar lessons, Terms of Service page, Stripe integration complete

---

## 📋 Overview

You'll complete 3 simple steps:
1. Upload certificate to Google Play Console
2. Update GitHub Secrets  
3. Create git tag to trigger automatic deployment

**Total Time**: ~5 minutes

---

## STEP 1: Upload Certificate to Google Play Console 🔐

### What you need:
The certificate file is ready at: `android/upload-certificate.pem`

### How to do it:

1. **Download the certificate from Replit**:
   - Open file: `android/upload-certificate.pem`
   - Copy the entire contents (including `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`)
   - Save it as a text file on your device

2. **Go to Google Play Console**:
   - Open: https://play.google.com/console
   - Select "Guitar Dice" app
   - Go to: **Setup → App Signing**

3. **Upload the certificate**:
   - Find section: "Upload key certificate"
   - Click "Upload new certificate"
   - Paste the certificate content or upload the file
   - Click "Save"

✅ **Done!** Google will now accept APKs signed with your new keystore.

---

## STEP 2: Update GitHub Secrets 🔑

You need to update 4 secrets in your GitHub repository.

### Go to GitHub Secrets:
1. Open: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
2. Click "New repository secret" or "Update" for existing ones

### Add/Update these 4 secrets:

#### Secret 1: `KEYSTORE_BASE64`
**Value**: Copy from file `android/keystore-final-base64.txt`
- Open the file in Replit
- Copy the entire base64 string (it's very long, ~3660 characters)
- Paste as the secret value

#### Secret 2: `KEYSTORE_PASSWORD`
**Value**: `GuitarDice2025!`

#### Secret 3: `KEY_ALIAS`
**Value**: `upload`

#### Secret 4: `KEY_PASSWORD`
**Value**: `GuitarDice2025!`

✅ **Done!** GitHub Actions can now sign your APK.

---

## STEP 3: Deploy v1.8.0 🎸

### From Replit Shell:

Run these 3 commands:

```bash
git add .
git commit -m "Release v1.8.0 - New keystore, 15 guitar lessons, Terms of Service"
git tag v1.8.0
git push origin main
git push origin v1.8.0
```

### What happens next:

1. **GitHub Actions automatically**:
   - Builds the Android app
   - Signs it with your new keystore
   - Uploads to Google Play Store (Internal Testing track)

2. **Check progress**:
   - Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions
   - Watch the "Android Build and Deploy" workflow
   - Takes ~5-10 minutes

3. **When complete**:
   - Go to Google Play Console → Testing → Internal testing
   - You'll see version 1.8.0 ready
   - Your existing testers get the update automatically

✅ **Done!** Your app is deployed!

---

## 📱 What's New in v1.8.0

- ✅ **15 Beginner Guitar Lessons**: Complete curriculum from basics to chord progressions
- ✅ **Terms of Service Page**: Legal compliance at `/terms-of-service`
- ✅ **Stripe Integration**: Premium subscriptions fully configured
- ✅ **Mobile UX Improvements**: Onboarding modal optimized for small screens

---

## 🔒 Security Notes

**New Keystore Details**:
- Filename: `upload-keystore-final.jks`
- Password: `GuitarDice2025!`
- Alias: `upload`
- SHA1: `9E:DF:85:0B:F1:89:1D:A9:88:5A:50:86:19:63:A2:02:08:A0:77:B0`

**IMPORTANT**: The old keystore was compromised (in git history). This new keystore is secure and enrolled with Google Play App Signing.

---

## ❓ Troubleshooting

**If GitHub Actions fails**:
- Check that all 4 secrets are added correctly
- Verify the KEYSTORE_BASE64 is the complete string (no line breaks added by your text editor)

**If Google Play rejects the upload**:
- Verify you uploaded the certificate in Step 1
- Make sure you're using the correct certificate from `upload-certificate.pem`

**Need help?**:
- Check GitHub Actions logs for specific error messages
- Verify secrets one more time (typos in passwords are common)

---

## 🎯 Next Steps After Deployment

Once v1.8.0 is live in Internal Testing:

1. **Test the app yourself**
2. **Promote to Beta** when ready (Google Play Console)
3. **Then to Production** for public release

Your existing testers on the Closed Testing track will automatically get the update!

---

**Ready?** Start with Step 1! 🚀
