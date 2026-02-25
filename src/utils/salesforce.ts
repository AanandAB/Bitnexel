// Salesforce REST API Integration for Browser
// Using OAuth 2.0 Web Server Flow

// Environment variables
const CONSUMER_KEY = import.meta.env.VITE_SALESFORCE_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_SALESFORCE_CONSUMER_SECRET;
const INSTANCE_URL = import.meta.env.VITE_SALESFORCE_INSTANCE_URL;
const CALLBACK_URL = import.meta.env.VITE_OAUTH_CALLBACK_URL;

// Token storage keys
const ACCESS_TOKEN_KEY = 'sf_access_token';
const REFRESH_TOKEN_KEY = 'sf_refresh_token';
const INSTANCE_URL_KEY = 'sf_instance_url';
const API_VERSION = 'v59.0'; // Salesforce API version

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  return !!accessToken;
}

/**
 * Get authorization URL for OAuth flow
 */
export function getAuthorizationUrl(): string {
  const authUrl = `${INSTANCE_URL || 'https://login.salesforce.com'}/services/oauth2/authorize`;
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CONSUMER_KEY || '',
    redirect_uri: CALLBACK_URL || '',
    scope: 'api refresh_token'
  });
  return `${authUrl}?${params.toString()}`;
}

/**
 * Exchange authorization code for tokens
 */
export async function handleCallback(code: string): Promise<void> {
  try {
    const tokenUrl = `${INSTANCE_URL || 'https://login.salesforce.com'}/services/oauth2/token`;
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: CONSUMER_KEY || '',
      client_secret: CONSUMER_SECRET || '',
      redirect_uri: CALLBACK_URL || ''
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!response.ok) {
      throw new Error('Failed to exchange authorization code');
    }

    const data = await response.json();

    // Store tokens
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    if (data.refresh_token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
    }
    localStorage.setItem(INSTANCE_URL_KEY, data.instance_url);
  } catch (error) {
    console.error('Salesforce authorization error:', error);
    throw new Error('Failed to authenticate with Salesforce');
  }
}

/**
 * Make a Salesforce REST API request
 */
async function apiRequest(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<any> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const instanceUrl = localStorage.getItem(INSTANCE_URL_KEY);

  if (!accessToken || !instanceUrl) {
    throw new Error('Not authenticated');
  }

  const url = `${instanceUrl}${endpoint}`;
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  const options: RequestInit = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  // Handle session expiration
  if (response.status === 401) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(INSTANCE_URL_KEY);
    throw new Error('INVALID_SESSION_ID');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error[0]?.message || 'API request failed');
  }

  return response.json();
}

/**
 * Create a Lead in Salesforce (for demo requests)
 */
export async function createLead(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  description?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Check if authenticated, if not, redirect to auth
    if (!isAuthenticated()) {
      window.location.href = getAuthorizationUrl();
      return { success: false, error: 'Authenticating...' };
    }

    const leadData = {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Phone: data.phone,
      Company: data.company,
      Description: data.description,
      LeadSource: 'Web',
      Status: 'Open - Not Contacted'
    };

    const result = await apiRequest(
      `/services/data/${API_VERSION}/sobjects/Lead/`,
      'POST',
      leadData
    );

    if (result.success) {
      return { success: true, id: result.id };
    } else {
      return { success: false, error: 'Failed to create Lead' };
    }
  } catch (error: any) {
    console.error('Error creating Lead:', error);
    
    // If token expired, clear storage and redirect to auth
    if (error.message === 'INVALID_SESSION_ID') {
      window.location.href = getAuthorizationUrl();
      return { success: false, error: 'Session expired. Please authenticate again.' };
    }

    return { success: false, error: error.message || 'Failed to create Lead' };
  }
}

/**
 * Create a Case in Salesforce (for complaints)
 */
export async function createCase(data: {
  contactName: string;
  email: string;
  phone?: string;
  subject: string;
  description: string;
  priority?: 'Low' | 'Medium' | 'High';
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Check if authenticated, if not, redirect to auth
    if (!isAuthenticated()) {
      window.location.href = getAuthorizationUrl();
      return { success: false, error: 'Authenticating...' };
    }

    const caseData = {
      SuppliedName: data.contactName,
      SuppliedEmail: data.email,
      SuppliedPhone: data.phone,
      Subject: data.subject,
      Description: data.description,
      Priority: data.priority || 'Medium',
      Type: 'Problem',
      Origin: 'Web',
      Status: 'New'
    };

    const result = await apiRequest(
      `/services/data/${API_VERSION}/sobjects/Case/`,
      'POST',
      caseData
    );

    if (result.success) {
      return { success: true, id: result.id };
    } else {
      return { success: false, error: 'Failed to create Case' };
    }
  } catch (error: any) {
    console.error('Error creating Case:', error);
    
    // If token expired, clear storage and redirect to auth
    if (error.message === 'INVALID_SESSION_ID') {
      window.location.href = getAuthorizationUrl();
      return { success: false, error: 'Session expired. Please authenticate again.' };
    }

    return { success: false, error: error.message || 'Failed to create Case' };
  }
}

/**
 * Clear authentication
 */
export function logout(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(INSTANCE_URL_KEY);
}
