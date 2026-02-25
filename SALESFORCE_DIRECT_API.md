# Direct Salesforce API Integration (No Third Parties)

## Option 2: Direct REST API (Advanced)

While Web-to-Lead is simplest, here's how to use Salesforce's REST API directly.

## Setup Requirements

### 1. Create Connected App in Salesforce
```
Setup → App Manager → New Connected App
```
**OAuth Scopes**:
- Full access (full)
- Perform requests on your behalf (api)

### 2. Configure OAuth Settings
```
Callback URL: https://yourdomain.com/callback
Active: ✅ Enable OAuth Settings for API Integration
```

## Implementation

### OAuth Flow (Frontend)
```typescript
// Get your Connected App credentials
const CLIENT_ID = 'YOUR_CONSUMER_KEY';
const CLIENT_SECRET = 'YOUR_CONSUMER_SECRET';
const INSTANCE_URL = 'https://yourinstance.salesforce.com';
const OAUTH_CALLBACK_URL = 'https://yourdomain.com/callback';

// Initiate OAuth
const initiateOAuth = () => {
  const authUrl = `${INSTANCE_URL}/services/oauth2/authorize` +
    `?response_type=code` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(OAUTH_CALLBACK_URL)}` +
    `&scope=api%20refresh_token`;
  
  window.location.href = authUrl;
};

// Handle OAuth callback
const handleCallback = async (code: string) => {
  const tokenResponse = await fetch(`${INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=authorization_code` +
          `&code=${code}` +
          `&client_id=${CLIENT_ID}` +
          `&client_secret=${CLIENT_SECRET}` +
          `&redirect_uri=${encodeURIComponent(OAUTH_CALLBACK_URL)}`
  });
  
  const tokens = await tokenResponse.json();
  
  // Store securely (use HttpOnly cookies in production)
  localStorage.setItem('sf_access_token', tokens.access_token);
  localStorage.setItem('sf_refresh_token', tokens.refresh_token);
  localStorage.setItem('sf_instance_url', tokens.instance_url);
  
  return tokens;
};

// Refresh expired tokens
const refreshToken = async () => {
  const refresh_token = localStorage.getItem('sf_refresh_token');
  
  if (!refresh_token) return false;
  
  const response = await fetch(`${INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=refresh_token` +
          `&refresh_token=${refresh_token}` +
          `&client_id=${CLIENT_ID}` +
          `&client_secret=${CLIENT_SECRET}`
  });
  
  if (response.ok) {
    const tokens = await response.json();
    localStorage.setItem('sf_access_token', tokens.access_token);
    return true;
  }
  
  return false;
};
```

### Create Lead (Direct API Call)
```typescript
const createLeadInSalesforce = async (data: ContactFormData): Promise<boolean> => {
  try {
    const access_token = localStorage.getItem('sf_access_token');
    const instance_url = localStorage.getItem('sf_instance_url');
    
    if (!access_token || !instance_url) {
      throw new Error('Not authenticated with Salesforce');
    }
    
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;
    
    const leadData = {
      FirstName: firstName,
      LastName: lastName,
      Email: data.email,
      Phone: data.phone,
      Company: data.restaurant || 'Restaurant',
      Description: data.message,
      LeadSource: 'Website',
      Status: 'Open - Not Contacted'
    };
    
    const response = await fetch(`${instance_url}/services/data/v59.0/sobjects/Lead/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Lead created:', result.id);
      return true;
    } else {
      console.error('Salesforce API error:', result);
      
      // If token expired, try refresh
      if (result.error === 'INVALID_SESSION_ID') {
        const refreshed = await refreshToken();
        if (refreshed) {
          return createLeadInSalesforce(data); // Retry
        }
      }
      
      return false;
    }
  } catch (error) {
    console.error('Failed to create lead:', error);
    return false;
  }
};
```

### Complete Integration Example
```typescript
// Updated form.ts for direct Salesforce API
export async function submitContactForm(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    // Check if user is authenticated
    const access_token = localStorage.getItem('sf_access_token');
    
    if (!access_token) {
      // User not authenticated, initiate OAuth
      initiateOAuth();
      return {
        success: true,
        method: 'fallback',
        error: 'Redirecting to Salesforce for authentication...'
      };
    }
    
    // Try to create lead
    const success = await createLeadInSalesforce(data);
    
    if (success) {
      return {
        success: true,
        method: 'salesforce',
        error: undefined
      };
    } else {
      // Store locally as backup
      storeLocally(data);
      return {
        success: false,
        error: 'Unable to create lead in Salesforce',
        method: 'fallback'
      };
    }
  } catch (error: any) {
    console.error('Form submission error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to process form. Please try again.',
      method: 'fallback'
    };
  }
}
```

## Security Considerations

### For Production Use:
1. **Use HTTPS** for all communications
2. **HttpOnly cookies** for token storage (not localStorage)
3. **Refresh tokens** for long sessions
4. **Rate limiting** to prevent abuse
5. **IP restrictions** on Connected App

### CORS Handling:
```typescript
// Salesforce allows CORS for specific domains
// Add your domain to Salesforce CORS allowed origins:
Setup → CORS → Add your domain
```

## Alternative: Server-Side Proxy (Still No Third Parties)

If you have any backend capability, here's a minimal server-side approach:

```javascript
// simple-node-proxy.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/api/salesforce-lead', async (req, res) => {
  const { access_token, instance_url } = req.body;
  
  const response = await fetch(`${instance_url}/services/data/v59.0/sobjects/Lead/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body.leadData)
  });
  
  const result = await response.json();
  res.json(result);
});

app.listen(3000, () => {
  console.log('Salesforce proxy running on port 3000');
});
```

## Comparison

| Feature | Web-to-Lead | Direct API |
|---------|-------------|------------|
| Setup Time | 5 minutes | 30+ minutes |
| Customization | Limited | Full control |
| Security | Salesforce managed | You manage |
| Maintenance | Zero | Token refresh |
| UX Impact | None | OAuth redirect |

## Recommendation

**For Most Users**: Use **Web-to-Lead** (Option 1)
- Easier setup
- No OAuth complexity  
- Enterprise-ready

**For Advanced Users**: Use **Direct API** (Option 2)
- Full customization
- Complex workflows
- Better UX (no form redirects)
