# 🚨 CRITICAL SECURITY ADVISORY - IMMEDIATE ACTION REQUIRED

## ⚠️ SECURITY ISSUE: Keystore Files Committed to Repository

**Severity**: CRITICAL  
**Impact**: Anyone with repository access can sign malicious app updates  
**Status**: REQUIRES IMMEDIATE REMEDIATION

### What Happened

The following sensitive signing files were committed to the Git repository:
- `android/upload-keystore.jks` - Upload signing keystore
- `android/keystore_base64.txt` - Base64-encoded keystore
- `android/upload_certificate.pem` - Upload certificate
- `android/encryption_public_key.pem` - Encryption public key

**These files are now in the repository history and can be accessed by anyone with read access.**

### Why This Is Critical

1. **Security Breach**: Anyone who has cloned or forked this repository can extract the signing key
2. **Play Store Compromise**: Bad actors could sign malicious updates and distribute them as your app
3. **Violates Google Play Policy**: Google requires signing keys to be kept secure
4. **No Rollback**: Once compromised, the keystore cannot be "uncompromised"

### Immediate Remediation Steps

#### Step 1: Assess Your Situation

**IF YOU HAVE NOT YET PUBLISHED TO GOOGLE PLAY STORE:**
✅ You're safe! Just generate a new keystore and delete the old one.

**IF YOU HAVE ALREADY PUBLISHED TO GOOGLE PLAY STORE:**
⚠️ Your current signing key is compromised. Follow the Play App Signing migration below.

---

#### Step 2A: If App NOT Yet Published (Easy Fix)

1. **Generate a New Keystore**:
   ```bash
   cd android
   
   # Generate new upload keystore
   keytool -genkey -v \
     -keystore upload-keystore-new.jks \
     -alias upload \
     -keyalg RSA \
     -keysize 2048 \
     -validity 10000 \
     -storepass YOUR_NEW_PASSWORD \
     -keypass YOUR_NEW_PASSWORD
   ```

2. **Answer the prompts**:
   - Name: Your name or company
   - Organization: Your company/project name
   - City/State/Country: Your location
   - Use a **strong password** (store in password manager)

3. **Generate Base64 for GitHub Secrets**:
   ```bash
   base64 -w 0 upload-keystore-new.jks > keystore-new-base64.txt
   ```

4. **Update GitHub Secrets**:
   - Go to GitHub → Settings → Secrets → Actions
   - Update `KEYSTORE_BASE64` with contents of `keystore-new-base64.txt`
   - Update `KEYSTORE_PASSWORD` with your new password
   - Update `KEY_PASSWORD` with your new password
   - `KEY_ALIAS` remains `upload`

5. **Delete OLD Compromised Files**:
   ```bash
   # IMPORTANT: Only after confirming new keystore works!
   rm android/upload-keystore.jks
   rm android/keystore_base64.txt
   rm android/upload_certificate.pem
   rm android/encryption_public_key.pem
   
   # Delete the new base64 file too (it's now in GitHub Secrets)
   rm android/keystore-new-base64.txt
   
   # Rename new keystore to standard name
   mv android/upload-keystore-new.jks android/upload-keystore.jks
   ```

6. **Update .gitignore** (already done, but verify):
   ```bash
   # Check these lines exist in .gitignore:
   grep -E '*.jks|keystore.*\.txt|*.pem' .gitignore
   ```

7. **NEVER commit the new keystore**:
   ```bash
   # Verify it's ignored:
   git status
   # Should NOT show upload-keystore.jks
   ```

8. **Test the build**:
   ```bash
   npm run build
   npx cap sync android
   cd android
   ./gradlew bundleRelease
   ```

---

#### Step 2B: If App ALREADY Published (Complex Fix)

**Option 1: Enroll in Google Play App Signing (RECOMMENDED)**

This is the safest option and Google's recommended approach.

1. **Go to Play Console**:
   - https://play.google.com/console/
   - Select your app → Setup → App signing

2. **Choose "Use Google-generated key"**:
   - Google will generate a new app signing key
   - You'll generate a new upload key (following Step 2A above)
   - Your old compromised key becomes invalid

3. **Benefits**:
   - Google manages the production signing key securely
   - You only manage the upload key
   - Can rotate upload keys if compromised again
   - Recommended by Google for all apps

4. **Follow Google's Migration Wizard**:
   - Play Console will guide you through the process
   - You'll need to generate a new upload keystore (Step 2A)
   - Upload the new upload certificate to Play Console

**Option 2: Contact Google Play Support**

If you can prove your identity and app ownership, Google may allow a one-time key reset.

1. Go to Play Console → Help → Contact Support
2. Explain: "My signing key was accidentally exposed in a public repository"
3. Provide proof of ownership (email, developer account)
4. Follow their instructions (may take 1-2 weeks)

**Option 3: Create New App Listing** (Last Resort)

If Google cannot help and you haven't published widely:
- Create a new app listing with a new package name
- Use a fresh keystore (never commit it!)
- Publish as a new app
- Migrate users to the new app

---

### Step 3: Clean Repository History (CRITICAL)

**The compromised keystore is still in Git history!**

You have two options:

#### Option A: BFG Repo Cleaner (Recommended)

```bash
# Install BFG (https://rtyley.github.io/bfg-repo-cleaner/)
# macOS:
brew install bfg

# Linux:
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# Clean the history
java -jar bfg.jar --delete-files upload-keystore.jks
java -jar bfg.jar --delete-files keystore_base64.txt
java -jar bfg.jar --delete-files upload_certificate.pem
java -jar bfg.jar --delete-files encryption_public_key.pem

# Force push (WARNING: Rewrites history)
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

**⚠️ WARNING**: This rewrites Git history. Anyone who has cloned the repo will need to re-clone.

#### Option B: Migrate to New Repository

If rewriting history is too complex:

```bash
# Create a new empty repository on GitHub
# Clone this repo
git clone <your-repo-url> chord-dice-clean

# Remove git history
cd chord-dice-clean
rm -rf .git

# Initialize fresh repository
git init
git add .
git commit -m "Initial commit (clean)"

# Push to new repository
git remote add origin <new-repo-url>
git push -u origin main
```

**⚠️ WARNING**: Update all GitHub Actions secrets in the new repository!

---

### Step 4: Verify Security

After remediation:

- [ ] New keystore generated with strong password
- [ ] New keystore stored ONLY in GitHub Secrets (not in repo)
- [ ] Old keystore files deleted from repository
- [ ] Old keystore files purged from Git history
- [ ] .gitignore prevents future keystore commits
- [ ] GitHub Actions build succeeds with new keystore
- [ ] Play Console enrolled in App Signing (if applicable)
- [ ] Password manager has secure backup of keystore password
- [ ] Physical backup of keystore file in secure location (encrypted USB, password manager)

---

### Step 5: Prevent Future Issues

1. **Password Manager**: Store keystore passwords in 1Password, Bitwarden, or similar
2. **Secure Backup**: Keep encrypted backup of keystore on secure cloud storage
3. **Access Control**: Limit repository access to trusted developers only
4. **Code Review**: Always review commits for sensitive files
5. **Pre-commit Hooks**: Consider adding hooks to block `.jks`, `.pem` files
6. **Play App Signing**: Let Google manage the production key

---

### Timeline

**Immediate** (Today):
- Generate new keystore
- Update GitHub Secrets
- Test build with new keystore

**This Week**:
- Enroll in Play App Signing (if published)
- Clean Git history OR migrate to new repo
- Verify all builds work with new credentials

**This Month**:
- Rotate all other secrets (API keys, database passwords)
- Audit repository for other sensitive data
- Implement pre-commit hooks

---

### Questions & Support

**Q: Can I just delete the files and move on?**
A: No! They're still in Git history. Anyone who cloned the repo still has them.

**Q: How do I know if the key was actually compromised?**
A: You can't know. Assume it was. Rotate the key.

**Q: Will this affect my published app?**
A: If you use Play App Signing: No impact on users. If not enrolled: Follow migration steps carefully.

**Q: Do I need to tell my users?**
A: If the app is not yet published: No. If published and using Play App Signing: No. If published without App Signing: Monitor for suspicious updates and consider notifying users.

---

### Additional Resources

- [Google Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)
- [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [Android Keystore Best Practices](https://developer.android.com/studio/publish/app-signing)
- [GitHub Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## Post-Remediation Checklist

After completing all steps:

```bash
# Verify keystore is NOT in repo
git ls-files | grep -E '\.jks|keystore.*\.txt|\.pem'
# Should return nothing

# Verify .gitignore is working
echo "test" > android/upload-keystore.jks
git status
# Should show "nothing to commit" (file is ignored)
rm android/upload-keystore.jks

# Verify GitHub Actions build works
git tag v1.7.1-test
git push origin v1.7.1-test
# Watch the GitHub Actions workflow
```

---

**Remember**: This is a critical security issue, but it's fixable. Take your time, follow the steps carefully, and don't hesitate to ask for help if needed.

**Update DEPLOYMENT.md and GITHUB_SECRETS.md** after remediation to reflect the new keystore generation process.
