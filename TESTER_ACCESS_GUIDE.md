# Tester Premium Access Guide

## 🎸 Grant Premium Access to Test Users

Use **direct SQL commands** to securely grant premium access to your tester group.

---

## **Step 1: User Creates Account**

Ask your tester to:
1. Go to your app (deployed on Play Store or web)
2. Click "Sign Up"
3. Create account with username: `blackmetal1349` (or any username)
4. Complete email verification

---

## **Step 2: Grant Premium Access via SQL**

Once the user has signed up, run one of these SQL commands:

### **Option A: Grant Premium Until Specific Date** (Recommended)

```sql
UPDATE users 
SET subscription_status = 'active', 
    subscription_expiry = '2026-10-29 23:59:59'::timestamp
WHERE username = 'blackmetal1349';
```

**Use this for:**
- Time-limited testing (e.g., 12 months)
- Simulating real subscription behavior
- Multiple testers with different expiry dates

### **Option B: Mark as Test User (Unlimited Access)**

```sql
UPDATE users 
SET is_test_user = true
WHERE username = 'blackmetal1349';
```

**Use this for:**
- Permanent test accounts
- Complete access bypass (no expiry checks)
- Internal QA team members

**Note:** Test users (`is_test_user = true`) have **complete access bypass** - unlimited riff generations, all premium features, no ads required.

---

## **How to Run SQL Commands**

### **From Replit Database Tool:**

1. Go to Replit project
2. Click on "Database" in the left sidebar
3. Click "Query" tab
4. Paste SQL command
5. Click "Run"

### **From Replit Shell:**

```bash
psql $DATABASE_URL -c "UPDATE users SET subscription_status = 'active', subscription_expiry = '2026-10-29 23:59:59'::timestamp WHERE username = 'blackmetal1349';"
```

---

## **Verify Premium Access**

After granting access, the tester should see:
- ✅ **Unlimited dice rolls** (no token limits)
- ✅ **All exotic chords** (Purple/Red columns unlocked)
- ✅ **Advanced genres** (Black Metal, Death Metal, etc.)
- ✅ **Guitar Classroom** (15 beginner lessons)
- ✅ **Compatible Scales** feature
- ✅ **Guitar Exercises** (8 categories, 4 skill levels)
- ✅ **Enhanced Tapping** page
- ✅ **No AdMob ads required**

---

## **Multiple Testers**

To add more testers, repeat for each username:

```sql
-- Tester 1: Premium until Oct 2026
UPDATE users 
SET subscription_status = 'active', 
    subscription_expiry = '2026-10-29 23:59:59'::timestamp
WHERE username = 'blackmetal1349';

-- Tester 2: Permanent test user
UPDATE users 
SET is_test_user = true
WHERE username = 'guitarhero2025';

-- Tester 3: Premium for 3 months
UPDATE users 
SET subscription_status = 'active', 
    subscription_expiry = (CURRENT_TIMESTAMP + INTERVAL '3 months')::timestamp
WHERE username = 'testuser123';
```

---

## **Check User Status**

To verify a user's premium status:

```sql
SELECT 
  username, 
  subscription_status, 
  subscription_expiry,
  is_test_user,
  created_at
FROM users 
WHERE username = 'blackmetal1349';
```

**Expected Result:**
```
 username        | subscription_status | subscription_expiry      | is_test_user | created_at
-----------------+--------------------+--------------------------+--------------+-------------------------
 blackmetal1349  | active             | 2026-10-29 23:59:59      | f            | 2025-10-29 12:00:00
```

---

## **Revoke Premium Access**

To revoke access later:

```sql
UPDATE users 
SET subscription_status = 'free', 
    subscription_expiry = NULL,
    is_test_user = false
WHERE username = 'blackmetal1349';
```

---

## **Security Best Practices** 🔒

✅ **DO:**
- Use SQL commands directly from Replit Database tool or shell
- Set specific expiry dates for testers
- Revoke access after testing is complete
- Keep database credentials secure

❌ **DON'T:**
- Create unsecured API endpoints for granting premium access
- Share database credentials with testers
- Grant permanent premium access to real users
- Forget to revoke access after testing

---

## **Quick Reference**

| What You Need | SQL Command |
|--------------|-------------|
| Grant 12 months premium | `UPDATE users SET subscription_status = 'active', subscription_expiry = (CURRENT_TIMESTAMP + INTERVAL '12 months')::timestamp WHERE username = 'USER';` |
| Grant 3 months premium | `UPDATE users SET subscription_status = 'active', subscription_expiry = (CURRENT_TIMESTAMP + INTERVAL '3 months')::timestamp WHERE username = 'USER';` |
| Grant unlimited access | `UPDATE users SET is_test_user = true WHERE username = 'USER';` |
| Check user status | `SELECT username, subscription_status, subscription_expiry, is_test_user FROM users WHERE username = 'USER';` |
| Revoke access | `UPDATE users SET subscription_status = 'free', subscription_expiry = NULL, is_test_user = false WHERE username = 'USER';` |

---

**Ready to test!** 🎸🔥
