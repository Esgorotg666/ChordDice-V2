# GitHub Secrets Configuration Guide

This guide helps you configure the required secrets for automated Android builds and Google Play Store deployments.

## Required Secrets

Add these secrets in your GitHub repository:
**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### 1. KEYSTORE_BASE64

**Purpose**: Base64-encoded upload keystore for signing Android releases

**How to get it**:
```bash
# The file already exists in your repository
cat android/keystore_base64.txt
```

**How to set it**:
1. Copy the entire contents of `android/keystore_base64.txt`
2. In GitHub: Add secret named `KEYSTORE_BASE64`
3. Paste the entire base64 string (should be very long, ~7000 characters)

---

### 2. KEYSTORE_PASSWORD

**Purpose**: Password to unlock the keystore file

**How to get it**: 
- This was set when the keystore was created
- Check your secure password manager or documentation
- If lost, you'll need to generate a new keystore (which requires a new app listing in Play Store)

**How to set it**:
1. In GitHub: Add secret named `KEYSTORE_PASSWORD`
2. Enter the keystore password

**Example**: `MySecurePassword123!`

---

### 3. KEY_ALIAS

**Purpose**: Alias name for the signing key within the keystore

**How to get it**:
- Default alias used: `upload`
- You can verify with: `keytool -list -v -keystore android/upload-keystore.jks`

**How to set it**:
1. In GitHub: Add secret named `KEY_ALIAS`
2. Enter: `upload`

---

### 4. KEY_PASSWORD

**Purpose**: Password for the specific key within the keystore

**How to get it**:
- Often the same as `KEYSTORE_PASSWORD`
- Check your password manager or documentation

**How to set it**:
1. In GitHub: Add secret named `KEY_PASSWORD`
2. Enter the key password

**Example**: `MySecurePassword123!`

---

### 5. SERVICE_ACCOUNT_JSON

**Purpose**: Google Play Console API access for automated uploads

**How to get it**:

1. **Open Google Play Console**
   - Go to: https://play.google.com/console/
   - Select your app (or create one if needed)

2. **Navigate to API Access**
   - Click **Settings** (gear icon) → **API access**

3. **Create Service Account** (if you don't have one)
   - Click **Create new service account**
   - Click **Google Cloud Platform** link
   - In GCP Console, click **CREATE SERVICE ACCOUNT**
   - Name: `github-actions-deploy`
   - Role: None needed at GCP level
   - Click **CREATE AND CONTINUE** → **DONE**

4. **Create JSON Key**
   - Find the service account you just created
   - Click on it → **KEYS** tab
   - Click **ADD KEY** → **Create new key**
   - Choose **JSON** format
   - Click **CREATE**
   - Save the downloaded JSON file securely

5. **Grant Permissions in Play Console**
   - Back in Play Console → **API access**
   - Find your service account
   - Click **Grant access**
   - Grant these permissions:
     - ✅ **Releases** → Create and edit releases
     - ✅ **Release to testing tracks**
   - Click **Invite user**

6. **Add to GitHub Secrets**
   - Open the downloaded JSON file in a text editor
   - Copy the **entire** JSON content (should start with `{` and end with `}`)
   - In GitHub: Add secret named `SERVICE_ACCOUNT_JSON`
   - Paste the entire JSON content

**JSON Example** (DO NOT use this, use your own):
```json
{
  "type": "service_account",
  "project_id": "api-1234567890-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "github-actions-deploy@api-1234567890-123456.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

---

## Verification Checklist

After adding all secrets, verify:

- [ ] `KEYSTORE_BASE64` - Very long string (~7000 chars), all one line
- [ ] `KEYSTORE_PASSWORD` - Matches your keystore password
- [ ] `KEY_ALIAS` - Set to `upload` (or your custom alias)
- [ ] `KEY_PASSWORD` - Matches your key password (often same as KEYSTORE_PASSWORD)
- [ ] `SERVICE_ACCOUNT_JSON` - Valid JSON, starts with `{`, ends with `}`

## Testing the Configuration

1. **Trigger a test build**:
   - Go to GitHub → **Actions** tab
   - Select **Build Android App** workflow
   - Click **Run workflow**
   - Select `main` branch
   - Click **Run workflow**

2. **Monitor the build**:
   - Watch the workflow run
   - All steps should pass ✅
   - Download the APK artifact to test

3. **Test deployment** (optional):
   - Create a test tag: `git tag v1.7.1-test && git push origin v1.7.1-test`
   - This will trigger full deployment workflow
   - Check Google Play Console → Internal Testing for the upload

## Troubleshooting

### "Keystore file is too small or invalid"
- The `KEYSTORE_BASE64` secret is incomplete or corrupted
- Copy the entire content of `android/keystore_base64.txt` again
- Ensure no line breaks or extra spaces were added

### "Keystore validation failed"
- `KEYSTORE_PASSWORD` or `KEY_ALIAS` is incorrect
- Verify the password: `keytool -list -v -keystore android/upload-keystore.jks`
- Check the alias name in the output

### "Play Store upload failed - 401 Unauthorized"
- `SERVICE_ACCOUNT_JSON` is invalid or incomplete
- Re-download the JSON key from Google Cloud Platform
- Ensure the entire JSON was copied (including `{` and `}`)

### "Play Store upload failed - 403 Forbidden"
- Service account doesn't have correct permissions
- In Play Console → API access → Grant "Release Manager" role
- Wait 10-15 minutes for permissions to propagate

### "Version code already exists"
- You're trying to upload the same version code twice
- Increment `versionCode` in `android/app/build.gradle`
- Version codes must always increase

## Security Best Practices

1. **Never commit secrets to Git**
   - Secrets should only be in GitHub Settings
   - Double-check before pushing code

2. **Rotate secrets periodically**
   - Change keystore passwords annually
   - Generate new service account keys every 90 days

3. **Limit service account permissions**
   - Only grant minimum required permissions
   - Don't give "Admin" role if not needed

4. **Use Play App Signing**
   - Enable in Play Console → Setup → App signing
   - Let Google manage your production signing key
   - You only manage the upload key

5. **Backup your keystore**
   - Keep secure backups of `upload-keystore.jks`
   - If lost, you cannot update your app (must create new listing)

## Quick Command Reference

```bash
# List keystore contents
keytool -list -v -keystore android/upload-keystore.jks

# Regenerate base64 (if needed)
base64 -w 0 android/upload-keystore.jks > android/keystore_base64.txt

# Test keystore password
keytool -list -keystore android/upload-keystore.jks -storepass YOUR_PASSWORD

# Verify key alias exists
keytool -list -v -keystore android/upload-keystore.jks -alias upload
```

## Support

If you encounter issues:
1. Check workflow logs in GitHub Actions
2. Review the error messages carefully
3. Verify all 5 secrets are set correctly
4. Test keystore locally before pushing
5. Check Google Play Console for upload errors
