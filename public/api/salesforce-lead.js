// Serverless function for Salesforce Lead integration
// This can be deployed to Vercel, Netlify, or similar platforms
// Alternative to Zapier for direct Salesforce integration

// Salesforce configuration (set these in your environment variables)
const SALESFORCE_INSTANCE_URL = process.env.SALESFORCE_INSTANCE_URL || 'https://login.salesforce.com';
const SALESFORCE_CLIENT_ID = process.env.SALESFORCE_CLIENT_ID;
const SALESFORCE_CLIENT_SECRET = process.env.SALESFORCE_CLIENT_SECRET;
const SALESFORCE_ACCESS_TOKEN = process.env.SALESFORCE_ACCESS_TOKEN;
const SALESFORCE_API_VERSION = 'v59.0';

// Cache for access token to avoid repeated requests
let tokenCache = {
  accessToken: null,
  instanceUrl: null,
  expiresAt: 0
};

/**
 * Get fresh access token from Salesforce
 */
async function getAccessToken() {
  // Check if we have a valid cached token
  if (tokenCache.accessToken && Date.now() < tokenCache.expiresAt) {
    return {
      accessToken: tokenCache.accessToken,
      instanceUrl: tokenCache.instanceUrl
    };
  }

  try {
    // Method 1: OAuth Username-Password Flow (if access token not provided)
    if (!SALESFORCE_ACCESS_TOKEN && SALESFORCE_CLIENT_ID && SALESFORCE_CLIENT_SECRET) {
      const tokenResponse = await fetch(`${SALESFORCE_INSTANCE_URL}/services/oauth2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${SALESFORCE_CLIENT_ID}&client_secret=${SALESFORCE_CLIENT_SECRET}`
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok) {
        throw new Error(`OAuth failed: ${tokenData.error}`);
      }

      // Cache the token for 1 hour
      tokenCache = {
        accessToken: tokenData.access_token,
        instanceUrl: tokenData.instance_url,
        expiresAt: Date.now() + (55 * 60 * 1000) // 55 minutes
      };

      return {
        accessToken: tokenData.access_token,
        instanceUrl: tokenData.instance_url
      };
    }

    // Method 2: Use provided access token
    if (SALESFORCE_ACCESS_TOKEN) {
      tokenCache = {
        accessToken: SALESFORCE_ACCESS_TOKEN,
        instanceUrl: SALESFORCE_INSTANCE_URL,
        expiresAt: Date.now() + (60 * 60 * 1000) // Assume valid for 1 hour
      };

      return {
        accessToken: SALESFORCE_ACCESS_TOKEN,
        instanceUrl: SALESFORCE_INSTANCE_URL
      };
    }

    throw new Error('No Salesforce credentials provided');
  } catch (error) {
    console.error('Failed to get access token:', error.message);
    throw error;
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData = req.body;

    // Validate required fields
    if (!leadData.FirstName || !leadData.LastName || !leadData.Email) {
      return res.status(400).json({ 
        error: 'Missing required fields: FirstName, LastName, Email',
        received: Object.keys(leadData)
      });
    }

    // Get fresh access token
    const { accessToken, instanceUrl } = await getAccessToken();

    console.log('Creating lead in Salesforce:', {
      name: `${leadData.FirstName} ${leadData.LastName}`,
      email: leadData.Email,
      company: leadData.Company
    });

    // Create lead in Salesforce
    const response = await fetch(`${instanceUrl}/services/data/${SALESFORCE_API_VERSION}/sobjects/Lead/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Lead created successfully:', result.id);
      
      // Log to serverless function logs for debugging
      console.log('Lead Details:', {
        id: result.id,
        name: `${leadData.FirstName} ${leadData.LastName}`,
        email: leadData.Email,
        phone: leadData.Phone,
        company: leadData.Company,
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({ 
        success: true, 
        id: result.id,
        message: 'Lead created successfully in Salesforce',
        salesforce_url: `${instanceUrl}/${result.id}`
      });
    } else {
      console.error('❌ Salesforce API error:', {
        status: response.status,
        statusText: response.statusText,
        details: result
      });

      return res.status(response.status).json({
        error: result[0]?.message || 'Failed to create lead in Salesforce',
        details: result,
        salesforce_error: true
      });
    }
  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
};