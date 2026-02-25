# Vercel Deployment Guide for Salesforce Integration

## Quick Deploy (5 Minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy from Project Root
```bash
cd /workspace/forkpoint-systems
vercel
```

### Step 3: Set Environment Variables
```bash
# Set Salesforce credentials
vercel env add SALESFORCE_INSTANCE_URL
vercel env add SALESFORCE_CLIENT_ID  
vercel env add SALESFORCE_CLIENT_SECRET
vercel env add SALESFORCE_ACCESS_TOKEN
```

### Step 4: Get Salesforce Credentials

#### Option A: Using Connected App (Recommended)
1. Go to Salesforce Setup → App Manager → Create Connected App
2. Set OAuth scopes: `Full access (full)`, `Perform requests on your behalf (api)`
3. Enable OAuth settings for API integration
4. Note down Consumer Key and Consumer Secret

#### Option B: Using Username-Password OAuth
```bash
curl -X POST "https://login.salesforce.com/services/oauth2/token" \
-d "grant_type=password" \
-d "client_id=YOUR_CLIENT_ID" \
-d "client_secret=YOUR_CLIENT_SECRET" \
-d "username=your-username@domain.com" \
-d "password=your-password-security-token"
```

### Step 5: Update form.ts with Vercel URL
After deployment, update `SERVERLESS_FUNCTION_URL` in `src/utils/form.ts`:
```typescript
const SERVERLESS_FUNCTION_URL = 'https://your-app-name.vercel.app/api/salesforce-lead';
```

### Step 6: Rebuild and Deploy Website
```bash
npm run build
vercel --prod
```

## Testing

### Test the Serverless Function
```bash
curl -X POST "https://your-app.vercel.app/api/salesforce-lead" \
-H "Content-Type: application/json" \
-d '{
  "FirstName": "Test",
  "LastName": "Lead",
  "Email": "test@example.com",
  "Phone": "+1234567890",
  "Company": "Test Restaurant",
  "Description": "Test lead from website",
  "LeadSource": "Website",
  "Status": "Open - Not Contacted"
}'
```

## Expected Response
```json
{
  "success": true,
  "id": "00Q5g000001234567890",
  "message": "Lead created successfully in Salesforce"
}
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Already handled in serverless function
2. **Authentication Failures**: Check environment variables
3. **Salesforce API Limits**: Monitor usage in Salesforce setup

### Debug Steps:
1. Check Vercel function logs: `vercel logs`
2. Test locally: `vercel dev`
3. Check Salesforce API status in Setup → System Overview

## Cost
- **Vercel Hobby Plan**: Free (100GB bandwidth, unlimited functions)
- **Salesforce API Calls**: Depends on your Salesforce plan
- **Total Cost**: $0 for basic usage
