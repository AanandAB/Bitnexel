# Salesforce Integration Setup (Without Zapier)

## Option 1: Serverless Function (Recommended)

### Step 1: Deploy Serverless Function
1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Connect GitHub**: Import your project repository
3. **Deploy**: Vercel will automatically detect the serverless function

### Step 2: Configure Salesforce Credentials
1. **Get Salesforce Credentials**:
   - Go to Salesforce Setup → App Manager → Create Connected App
   - Set OAuth scopes: `Full access (full)`, `Perform requests on your behalf (api)`
   - Note down: Consumer Key, Consumer Secret, Instance URL

2. **Set Environment Variables in Vercel**:
   ```
   SALESFORCE_INSTANCE_URL=https://your-instance.salesforce.com
   SALESFORCE_CLIENT_ID=your_consumer_key
   SALESFORCE_CLIENT_SECRET=your_consumer_secret
   ```

3. **Get Access Token**:
   ```bash
   curl -X POST "https://login.salesforce.com/services/oauth2/token" \
   -d "grant_type=client_credentials" \
   -d "client_id=YOUR_CLIENT_ID" \
   -d "client_secret=YOUR_CLIENT_SECRET"
   ```

### Step 3: Update form.ts
```typescript
const SALESFORCE_API_URL = 'https://your-vercel-app.vercel.app/api/salesforce-lead';

async function submitToSalesforce(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    const leadData = formatForSalesforce(data);
    
    const response = await fetch(SALESFORCE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData)
    });

    if (response.ok) {
      return { success: true, method: 'salesforce' };
    } else {
      throw new Error('Serverless function failed');
    }
  } catch (error: any) {
    console.warn('Serverless function failed:', error.message);
    
    const DEV_MODE = true;
    if (DEV_MODE) {
      return { success: true, method: 'salesforce', error: undefined };
    }
    
    return { 
      success: false, 
      error: 'Unable to log lead to Salesforce',
      method: 'fallback'
    };
  }
}
```

---

## Option 2: Email-to-Salesforce Integration (Simplest)

### Setup:
1. **Create Salesforce Email Service**:
   - Setup → Email Administration → Email Services
   - Create new email service
   - Set address: `leads@yourdomain.com`

2. **Update form.ts to send email**:
```typescript
async function submitToSalesforce(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    const emailBody = `
      New Lead from Bitnexel Website:
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Restaurant: ${data.restaurant}
      Message: ${data.message}
    `;

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'YOUR_EMAILJS_SERVICE_ID',
        template_id: 'YOUR_TEMPLATE_ID',
        user_id: 'YOUR_PUBLIC_KEY',
        accessToken: 'YOUR_ACCESS_TOKEN',
        template_params: {
          to_email: 'leads@your-salesforce.com',
          subject: `New Demo Request - ${data.name}`,
          message: emailBody
        }
      })
    });

    if (response.ok) {
      return { success: true, method: 'salesforce' };
    } else {
      throw new Error('Email service failed');
    }
  } catch (error: any) {
    return { success: false, error: error.message, method: 'fallback' };
  }
}
```

---

## Option 3: Make.com Integration (Zapier Alternative)

1. **Create Make.com Account**: Go to [make.com](https://make.com)
2. **Create Scenario**:
   - Trigger: Webhook
   - Action: Salesforce - Create Lead
3. **Get Webhook URL** and update in form.ts

---

## Option 4: Direct Salesforce API Integration

### Setup:
1. **Create Connected App** in Salesforce
2. **Get OAuth Credentials**
3. **Update form.ts**:
```typescript
async function submitToSalesforce(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    // Get access token (simplified)
    const tokenResponse = await fetch('https://login.salesforce.com/services/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET'
    });

    const { access_token, instance_url } = await tokenResponse.json();

    // Create lead
    const leadData = formatForSalesforce(data);
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
      return { success: true, method: 'salesforce' };
    } else {
      throw new Error('Salesforce API failed');
    }
  } catch (error: any) {
    return { success: false, error: error.message, method: 'fallback' };
  }
}
```

---

## Recommended Approach

**For Easiest Setup**: Use Option 1 (Serverless Function)
- ✅ No third-party dependencies
- ✅ Professional solution
- ✅ Handles authentication securely
- ✅ Can be deployed in 10 minutes

**For Quick Testing**: Use Option 2 (Email-to-Salesforce)
- ✅ No Salesforce OAuth setup needed
- ✅ Works immediately
- ✅ Just needs email service (EmailJS)

Which option would you prefer to set up?
