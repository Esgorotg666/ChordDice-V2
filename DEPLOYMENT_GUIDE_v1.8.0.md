# 🚀 Guitar Dice v1.8.0 Deployment Guide

## **Pre-Deployment Checklist** ✅

### **1. GitHub Secrets Configuration**

Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`

**Update these 4 secrets:**

| Secret Name | Value | Location |
|------------|-------|----------|
| `KEYSTORE_BASE64` | Copy from `CORRECT_KEYSTORE_BASE64.txt` | This file (base64 string) |
| `KEYSTORE_PASSWORD` | Your keystore password | Secure - do not commit to Git |
| `KEY_ALIAS` | `upload` | Use exactly as shown |
| `KEY_PASSWORD` | Your key password | Secure - do not commit to Git |

**Verification:**
- ✅ Keystore SHA1: `46:7C:37:6F:27:9B:B6:6B:3D:C6:0B:66:74:C1:59:CA:06:39:A8:45`
- ✅ Matches Google Play Console expectations
- ✅ Upload keystore: `upload-keystore-NEW.jks`

**Security Note:**  
⚠️ Never commit keystore passwords or secrets to Git. Store them only in GitHub Secrets and your secure password manager.

---

## **2. Version Information** 📱

**Current Version:**
- Version Name: `1.8.0`
- Version Code: `28`
- App ID: `com.chorddice.app`

**Location:** `android/app/build.gradle`

---

## **3. Deployment Process** 🎸

### **Step 1: Commit & Push Changes**

```bash
# From Replit Shell
git add .
git commit -m "Deploy v1.8.0 - Production ready"
git push origin main
```

### **Step 2: Create & Push Version Tag**

```bash
# Delete existing tag if necessary
git tag -d v1.8.0
git push origin :refs/tags/v1.8.0

# Create fresh tag
git tag v1.8.0
git push origin v1.8.0
```

### **Step 3: GitHub Actions Builds App**

- Workflow: `.github/workflows/android-build.yml`
- Trigger: Version tag push (`v1.8.0`)
- Build Time: ~10-15 minutes
- Output: APK + AAB (signed, release builds)

**Monitor Progress:**
1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
2. Click on "Android Build" workflow
3. Watch build logs in real-time

### **Step 4: Download Build Artifacts**

Once the GitHub Actions workflow completes:

1. Go to the completed workflow run
2. Scroll to **Artifacts** section
3. Download:
   - `signed-apk` (for direct installation testing)
   - `signed-aab` (for Play Store upload) ⭐

### **Step 5: Upload to Google Play Console**

1. Go to: [Google Play Console](https://play.google.com/console)
2. Select **Guitar Dice** app
3. Navigate to: **Testing → Internal testing** (or Closed testing)
4. Click **Create new release**
5. Upload the `app-release.aab` file
6. **Release notes:** Copy from `RELEASE_NOTES_SHORT.txt`
7. Click **Review release → Start rollout to Internal testing**

---

## **4. Grant Tester Premium Access** 🎯

After testers install the app, grant them premium access using **secure SQL commands**.

### **Method: Direct SQL (Secure)**

```sql
UPDATE users 
SET subscription_status = 'active', 
    subscription_expiry = '2026-10-29 23:59:59'::timestamp
WHERE username = 'blackmetal1349';
```

**Or mark as permanent test user:**

```sql
UPDATE users 
SET is_test_user = true
WHERE username = 'blackmetal1349';
```

**See:** `TESTER_ACCESS_GUIDE.md` for detailed instructions.

---

## **5. Release Notes** 📝

**Short Version (Play Console):**
See `RELEASE_NOTES_SHORT.txt`

**Full Version (Internal docs):**
See `RELEASE_NOTES_v1.8.0.txt`

**Key Features in v1.8.0:**
- ✅ Personalized user preferences system
- ✅ Dynamic genre-based backgrounds
- ✅ Custom username/password authentication
- ✅ Email verification system
- ✅ 15-lesson beginner guitar curriculum
- ✅ Affiliate marketing integration
- ✅ Enhanced UI/UX improvements

---

## **6. Testing Checklist** 🧪

Ask your testers to verify:

### **Authentication**
- [ ] Sign up with username/email/password
- [ ] Receive verification email
- [ ] Verify email successfully
- [ ] Log in with credentials
- [ ] Password reset works

### **Premium Features** (After granting access)
- [ ] Unlimited dice rolls
- [ ] All exotic chords accessible (Purple/Red columns)
- [ ] Advanced genres available (Black Metal, Death Metal, etc.)
- [ ] Guitar Classroom accessible (15 lessons)
- [ ] Compatible Scales feature working
- [ ] Guitar Exercises accessible (8 categories)
- [ ] Enhanced Tapping page accessible
- [ ] No AdMob ads required

### **Personalization**
- [ ] Onboarding modal appears on first login
- [ ] User can select playing style, genre, skill level
- [ ] Settings modal accessible via gear icon
- [ ] Background changes based on genre preference
- [ ] "Recommended For You" section in Classroom shows relevant lessons

### **Core Features**
- [ ] Dice roll generates chords correctly
- [ ] Riff generation works for all genres
- [ ] Fretboard diagrams display correctly
- [ ] Navigation between pages works smoothly

---

## **7. Common Issues & Solutions** 🔧

### **Issue: GitHub Actions build fails**
**Solution:** Check that all 4 GitHub Secrets are set correctly. The keystore base64 should match `CORRECT_KEYSTORE_BASE64.txt`.

### **Issue: Play Console rejects upload (signature mismatch)**
**Solution:** Verify keystore SHA1 fingerprint matches the expected value shown in the verification section above.

### **Issue: Tester can't access premium features**
**Solution:** Make sure you granted premium access using SQL. Verify with:
```sql
SELECT username, subscription_status, subscription_expiry, is_test_user
FROM users 
WHERE username = 'blackmetal1349';
```

### **Issue: App crashes on launch**
**Solution:** Check Replit logs for backend errors. Ensure all environment secrets are set correctly (Stripe keys, database URL, etc.).

---

## **8. Post-Deployment** 🎉

After successful deployment:

1. **Notify testers:** Send them the internal testing link from Play Console
2. **Grant premium access:** Use SQL commands from TESTER_ACCESS_GUIDE.md
3. **Collect feedback:** Monitor crash reports in Play Console
4. **Iterate:** Address any bugs before promoting to Beta/Production

---

## **9. Security Reminders** 🔒

✅ **Implemented Security Measures:**
- Rate limiting on all API routes
- CSRF protection for mutations
- SQL injection protection (Drizzle ORM)
- Session-based authentication
- Email verification
- Secure password hashing

⚠️ **Before Public Launch:**
- Review and test all payment flows
- Ensure all environment secrets are rotated
- Monitor for unusual activity
- Set up error tracking (Sentry, etc.)

---

## **10. Next Steps** 🔜

After internal testing is successful:

1. **Promote to Beta testing:** Expand tester group
2. **Monitor analytics:** Track user behavior via Google Analytics
3. **Optimize performance:** Address any performance issues
4. **Prepare production release:** Final QA before public launch

---

## **Quick Reference Commands** 💻

```bash
# Check Android version
cat android/app/build.gradle | grep versionName

# Deploy to GitHub
git tag v1.8.0 && git push origin v1.8.0

# Grant tester premium access (from Replit Database tool)
UPDATE users SET subscription_status = 'active', 
  subscription_expiry = '2026-10-29 23:59:59'::timestamp 
WHERE username = 'USERNAME';
```

---

**You're ready to deploy!** 🚀🎸🔥

**Workflow:** Secrets → Tag → Build → Download → Upload → Grant Access → Test

---

## **File Reference**

- `CORRECT_KEYSTORE_BASE64.txt` - Keystore for GitHub Secrets (do not commit passwords)
- `TESTER_ACCESS_GUIDE.md` - Detailed SQL commands for granting test access
- `RELEASE_NOTES_SHORT.txt` - Release notes for Play Console
- `RELEASE_NOTES_v1.8.0.txt` - Full release notes for internal documentation
- `.github/workflows/android-build.yml` - GitHub Actions build workflow
