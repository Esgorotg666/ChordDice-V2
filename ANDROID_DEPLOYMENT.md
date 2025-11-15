# Android Deployment Guide - Guitar Dice

## Issue Resolution: Account Creation & Login on Android

### Problem
Users on the Android app were experiencing "Signup failed - An error occurred during signup" errors. After successful account creation, they were unable to log in.

### Root Cause
The mobile app (running via Capacitor) was making API requests using relative URLs like `/api/auth/register` and `/api/auth/login`. These relative URLs resolved to `capacitor://localhost` instead of the actual backend server, causing all API calls to fail.

### Solution
**Fixed in commit:** Updated `client/src/lib/queryClient.ts` to automatically detect native platforms and build full API URLs.

**Key Changes:**
1. Added platform detection using `isNativePlatform()` from `platform-utils.ts`
2. Created `getApiBaseUrl()` function that returns `VITE_API_URL` for mobile platforms
3. Created `buildApiUrl()` function that constructs full URLs for mobile, keeps relative URLs for web
4. Updated both `apiRequest()` and `getQueryFn()` to use the new URL building logic

### Configuration Required

#### Environment Variable Setup
The Android app **requires** the `VITE_API_URL` environment variable to connect to the backend.

**For Development:**
```bash
VITE_API_URL=https://b854b4e9-4cfa-4504-b80e-9184073568ee-00-7fsh5aya6npy.janeway.replit.dev
```

**For Production:**
```bash
VITE_API_URL=https://your-published-app.replit.app
```

⚠️ **Important:** The `VITE_` prefix is required for Vite to expose this variable to the frontend code.

#### Where to Set the Environment Variable

**Option 1: Replit Secrets (Recommended for Production)**
1. Go to Tools → Secrets in your Replit workspace
2. Add `VITE_API_URL` with your published app URL

**Option 2: .env.local (Development Only)**
1. Already configured in `.env.local` with current dev domain
2. See `.env.example` for template

### Testing the Fix

#### On Web (Browser)
1. Navigate to `/signup`
2. Create a new account
3. Login should work immediately (dev mode bypasses email verification)
4. ✅ Web continues to work with relative URLs

#### On Android Device/Emulator
1. Build the Android app with the updated code
2. Install on device/emulator
3. Open app and navigate to signup
4. Create account with test credentials
5. ✅ Should see success message (no "Signup failed" error)
6. Navigate to login page
7. Enter same credentials
8. ✅ Should successfully log in and redirect to home

### Build Process Updates

#### Before Building Android APK/AAB

1. **Verify VITE_API_URL is set:**
   ```bash
   echo $VITE_API_URL
   ```

2. **Ensure it points to the correct backend:**
   - Development: Use Replit dev domain
   - Staging: Use staging deployment URL
   - Production: Use published app URL (e.g., `https://guitardice.replit.app`)

3. **Build the app:**
   ```bash
   npm run build
   npx cap sync
   npx cap open android
   ```

4. **In Android Studio:**
   - Build → Generate Signed Bundle/APK
   - Select release configuration
   - Sign with your keystore

### GitHub Actions CI/CD

Update your GitHub Actions workflow to include the environment variable:

```yaml
- name: Build Android App
  env:
    VITE_API_URL: ${{ secrets.PRODUCTION_API_URL }}
  run: |
    npm run build
    npx cap sync
    # ... rest of build steps
```

**Required GitHub Secret:**
- `PRODUCTION_API_URL`: Your published backend URL

### Deployment Checklist

Before deploying a new version to Google Play:

- [ ] Publish backend to Replit (or your hosting provider)
- [ ] Copy the published URL
- [ ] Update `VITE_API_URL` in Replit Secrets (or GitHub Secrets for CI/CD)
- [ ] Verify environment variable is accessible:
  ```bash
  echo "API URL: $VITE_API_URL"
  ```
- [ ] Build Android app with updated environment
- [ ] Test signup on physical Android device
- [ ] Test login on physical Android device
- [ ] Verify API calls are reaching the backend (check server logs)
- [ ] Upload to Google Play Console

### Troubleshooting

#### "Signup failed" still appearing
1. Check if `VITE_API_URL` is set: `console.log(import.meta.env.VITE_API_URL)` in browser console
2. Verify the URL is correct and accessible
3. Check server logs to see if requests are arriving
4. Ensure you rebuilt the app after setting the environment variable

#### Login fails after successful signup
1. Check if cookies are being set properly (session management)
2. Verify CORS settings on backend allow credentials
3. Check if `credentials: "include"` is in fetch requests (✅ already configured)

#### API calls timeout
1. Ensure backend server is running and accessible
2. Check firewall settings on hosting provider
3. Verify HTTPS is properly configured (required for Android)

### Technical Details

#### How Platform Detection Works
```typescript
// platform-utils.ts
export function isNativePlatform(): boolean {
  return Capacitor.isNativePlatform();
}
```

#### URL Building Logic
```typescript
// queryClient.ts
function getApiBaseUrl(): string {
  if (isNativePlatform()) {
    // Mobile: use full backend URL
    return import.meta.env.VITE_API_URL || window.location.origin;
  }
  // Web: use relative URLs (handled by Vite proxy)
  return "";
}

function buildApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return baseUrl + path;
  // Mobile: https://your-app.replit.app/api/auth/login
  // Web: /api/auth/login
}
```

### Next Steps

1. **Publish the backend:**
   - Click "Publish" in Replit to deploy your backend
   - Note the published URL (e.g., `https://guitardice.replit.app`)

2. **Update environment variables:**
   - Set `VITE_API_URL` to your published URL
   - Update both Replit Secrets and `.env.local`

3. **Rebuild and test:**
   - Rebuild the Android app
   - Test on a real device
   - Verify signup and login work correctly

4. **Deploy to Google Play:**
   - Upload signed APK/AAB to Internal Testing
   - Test with real users
   - Promote to production when ready

### Support

If you encounter issues:
1. Check server logs for incoming API requests
2. Use Chrome DevTools on Android for debugging (chrome://inspect)
3. Verify environment variable is set correctly in the build
4. Ensure backend is accessible via HTTPS

---

**Last Updated:** November 15, 2025  
**App Version:** 1.10.0 (versionCode: 30)  
**Fix Applied:** Mobile API URL configuration in queryClient.ts
