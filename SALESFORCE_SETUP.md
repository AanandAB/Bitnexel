# Salesforce Integration Setup Guide

## Overview
This guide will help you configure Salesforce lead logging for your website without affecting the UI.

## Option 1: Serverless Function Deployment (Recommended)

### Step 1: Create Salesforce Connected App

1. Go to Salesforce Setup > App Manager > New Connected App
2. Fill in the basic information:
   - Connected App Name: "Bitnexel Website Integration"
   - API Name: "Bitnexel_Website"
   - Contact Email: your-email@example.com

3. Enable OAuth Settings:
   - Check "Enable OAuth Settings"
   - Callback URL: `https://your-domain.com/api/callback`
   - Selected OAuth Scopes: Access and manage your data (api), Perform requests on your behalf (refresh_token, offline_access)

4. Save and note down:
   - Consumer Key (Client ID)
   - Consumer Secret (Client Secret)

### Step 2: Get Access Token

You have two options:

#### Option A: Username-Password OAuth Flow
```bash
curl -X POST https://login.salesforce.com/services/oauth2/token \
  -d "grant_type=password" \
  -d "client_id=YOUR_CONSUMER_KEY" \
  -d "client_secret=YOUR_CONSUMER_SECRET" \
  -d "username=your-username@example.com" \
  -d "password=your-password" \
  -d "security_token=your-security-token"
```

#### Option B: Web Server OAuth Flow (for production)
- Implement the full OAuth flow using the existing `salesforce.ts` utilities

### Step 3: Deploy Serverless Function

**For Vercel:**
1. Install Vercel CLI: `npm i -g vercel`
2. Create `api/salesforce-lead.js` file
3. Set environment variables in Vercel dashboard:
   - SALESFORCE_INSTANCE_URL=https://login.salesforce.com
   - SALESFORCE_CLIENT_ID=your-consumer-key
   - SALESFORCE_CLIENT_SECRET=your-consumer-secret
   - SALESFORCE_ACCESS_TOKEN=your-access-token
4. Deploy: `vercel --prod`

**For Netlify:**
1. Create `netlify.toml` with function configuration
2. Set environment variables in Netlify dashboard
3. Deploy with Netlify CLI

**For Railway/Render:**
1. Deploy the serverless function as a web service
2. Configure environment variables
3. Update API endpoint in form.ts

### Step 4: Update Form Configuration

Update the `submitToSalesforce` function in `/src/utils/form.ts`:

```javascript
const response = await fetch('https://your-deployed-function.vercel.app/api/salesforce-lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(leadData)
});
```

## Option 2: Direct Salesforce API Integration

### Create a Salesforce User for API Access

1. Create a dedicated Salesforce user for website integration
2. Assign necessary permissions (Create Lead permission)
3. Generate an API security token for this user

### Update Environment Variables

Create `.env` file in your project root:
```env
# Salesforce Configuration
VITE_SALESFORCE_INSTANCE_URL=https://login.salesforce.com
VITE_SALESFORCE_CONSUMER_KEY=your-connected-app-consumer-key
VITE_SALESFORCE_CONSUMER_SECRET=your-connected-app-consumer-secret
VITE_SALESFORCE_USERNAME=your-api-user@example.com
VITE_SALESFORCE_PASSWORD=your-user-password
VITE_SALESFORCE_SECURITY_TOKEN=your-security-token
VITE_OAUTH_CALLBACK_URL=https://your-domain.com/auth/callback
```

## Option 3: Zapier Integration (Simplest)

### Step 1: Create Zapier Webhook

1. Go to Zapier and create a new Zap
2. Choose "Webhooks by Zapier" as trigger
3. Select "Catch Hook"
4. Copy the webhook URL

### Step 2: Configure Salesforce Action

1. Add "Create Lead" action to your Zap
2. Connect your Salesforce account
3. Map the webhook payload fields to Salesforce Lead fields
4. Test and activate the Zap

### Step 3: Update Form Code

Update the webhook URL in `form.ts`:

```javascript
const webhookUrl = 'https://hooks.zapier.com/hooks/catch/YOUR_ZAPIER_WEBHOOK_ID/';
```

## Testing Your Integration

### Test with cURL:
```bash
curl -X POST https://your-endpoint.com/api/salesforce-lead \
  -H "Content-Type: application/json" \
  -d '{
    "FirstName": "John",
    "LastName": "Doe", 
    "Email": "john@example.com",
    "Phone": "+1234567890",
    "Company": "Test Restaurant",
    "Description": "Test lead from website",
    "LeadSource": "Website",
    "Status": "Open - Not Contacted"
  }'
```

### Check Salesforce for New Leads

1. Go to Salesforce > Leads tab
2. Filter by "Created Date = Today"
3. Look for new leads with "Website" as Lead Source

## Troubleshooting

### Common Issues:

1. **401 Unauthorized**: Check your access token and credentials
2. **403 Forbidden**: Verify user permissions in Salesforce
3. **404 Not Found**: Check your endpoint URL and deployment
4. **Field Validation Errors**: Ensure all required Lead fields are provided

### Debug Steps:

1. Check browser console for errors
2. Monitor network requests in DevTools
3. Check serverless function logs
4. Verify Salesforce API limits and quotas

## Security Notes

- Never expose client secrets in frontend code
- Use environment variables for all sensitive data
- Implement rate limiting on your endpoints
- Consider using webhook signatures for validation
- Regularly rotate API credentials

## Current Status

The website is currently configured to:
- ✅ Store form data locally as backup
- ✅ Attempt Salesforce integration
- ✅ Gracefully fallback if integration fails
- ✅ Show success messages regardless of backend status

## Next Steps

1. Choose your preferred integration method
2. Configure the necessary credentials
3. Deploy the serverless function or webhook
4. Test the integration end-to-end
5. Monitor lead creation in Salesforce

The form will continue to work even if Salesforce integration fails, ensuring no leads are lost.