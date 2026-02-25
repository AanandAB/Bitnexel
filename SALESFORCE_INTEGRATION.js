// Zapier Webhook Integration for Salesforce
// This script provides a working Salesforce integration using Zapier webhooks

// Configuration - Replace with your actual Zapier webhook URL
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/';

// Backup webhook for redundancy
const BACKUP_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/YOUR_BACKUP_WEBHOOK_ID/';

// Salesforce field mapping
const SALESFORCE_FIELD_MAPPING = {
  FirstName: 'firstName',
  LastName: 'lastName', 
  Email: 'email',
  Phone: 'phone',
  Company: 'company',
  Description: 'description',
  LeadSource: 'leadSource',
  Status: 'status'
};

/**
 * Submit lead to Zapier webhook for Salesforce integration
 */
async function submitToZapierWebhook(leadData) {
  try {
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        leadData: leadData,
        timestamp: new Date().toISOString(),
        source: 'Bitnexel Website'
      })
    });

    if (response.ok) {
      console.log('Lead submitted to Zapier successfully');
      return { success: true, method: 'zapier' };
    } else {
      throw new Error(`Zapier webhook failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Zapier webhook error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Submit to backup webhook if primary fails
 */
async function submitToBackupWebhook(leadData) {
  try {
    const response = await fetch(BACKUP_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        leadData: leadData,
        timestamp: new Date().toISOString(),
        source: 'Bitnexel Website (Backup)',
        isBackup: true
      })
    });

    if (response.ok) {
      console.log('Lead submitted to backup webhook successfully');
      return { success: true, method: 'backup' };
    } else {
      throw new Error(`Backup webhook failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Backup webhook error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Main function to handle lead submission
 */
async function createSalesforceLead(formData) {
  try {
    // Format data for Salesforce
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;

    const leadData = {
      FirstName: firstName,
      LastName: lastName,
      Email: formData.email,
      Phone: formData.phone,
      Company: formData.restaurant || 'Unknown Restaurant',
      Description: formData.message || 'Demo request from Bitnexel website',
      LeadSource: 'Website',
      Status: 'Open - Not Contacted',
      Website: 'https://bitnexel.com',
      Lead_Referred_Source__c: 'Website Demo Request'
    };

    // Try primary webhook
    let result = await submitToZapierWebhook(leadData);
    
    // If primary fails, try backup
    if (!result.success && BACKUP_WEBHOOK_URL !== 'https://hooks.zapier.com/hooks/catch/YOUR_BACKUP_WEBHOOK_ID/') {
      result = await submitToBackupWebhook(leadData);
    }

    return result;
  } catch (error) {
    console.error('Lead submission error:', error);
    return { 
      success: false, 
      error: error.message,
      method: 'error'
    };
  }
}

// Export for use in form utilities
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSalesforceLead };
} else if (typeof window !== 'undefined') {
  window.createSalesforceLead = createSalesforceLead;
}