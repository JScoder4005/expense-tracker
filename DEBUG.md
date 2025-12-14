# Debugging Registration Issues

## Quick Checks

### 1. Is Frontend Running?
```bash
cd /Users/uday/Documents/UdayPersonalProjects/expense-tracker/expense-tracker
pnpm run dev
```
Should show: `Local: http://localhost:5173/` (or similar)

### 2. Is Backend Running?
```bash
cd /Users/uday/Documents/UdayPersonalProjects/Back-end/auth-backend
PORT=3001 pnpm run dev
```
Should show: `Server running on port 3001`

### 3. Check Browser Console
- Open browser (Chrome/Firefox)
- Press F12 to open DevTools
- Go to "Console" tab
- Try to register
- Look for errors (red text)

### 4. Check Network Tab
- In DevTools, go to "Network" tab
- Try to register
- Look for the `/auth/register` request
- Check:
  - Status code (should be 201 or 400)
  - Response data
  - Request payload

## Common Issues

### Issue 1: CORS Error
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:** Check backend CORS configuration in `app.ts`:
```typescript
app.use(
  cors({
    origin: "http://localhost:5173", // Should match frontend URL
    credentials: true,
  })
);
```

### Issue 2: Network Error / Connection Refused
**Error:** `ERR_CONNECTION_REFUSED` or `Network Error`

**Causes:**
- Backend not running
- Wrong port in frontend `.env`
- Firewall blocking connection

**Solution:**
1. Verify backend is running on port 3001
2. Check frontend is using correct API URL
3. Create `.env` file in frontend:
```
VITE_API_URL=http://localhost:3001/api
```

### Issue 3: 400 Bad Request
**Error:** Status 400 with message "User already exists"

**Solution:** User with that email already exists. Try a different email or delete the user from database:
```bash
npx ts-node src/db-query.ts users
```

### Issue 4: 500 Server Error
**Error:** Status 500

**Causes:**
- Database connection issue
- Backend code error

**Solution:** Check backend terminal for error logs

## Test Backend Directly

Test if backend works with curl:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test123@example.com","password":"password123"}'
```

Should return:
```json
{"message":"User created","userId":4}
```

## Check Frontend Environment

Create `.env` file in frontend root if it doesn't exist:
```
VITE_API_URL=http://localhost:3001/api
```

Then restart frontend dev server.
