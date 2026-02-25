// Form submission utility with Salesforce integration
// This provides a reliable way to collect demo requests and log them to Salesforce

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  restaurant: string;
  message: string;
  requestType?: 'demo' | 'complaint';
  priority?: 'high' | 'medium' | 'low';
  numberOfLocations?: string;
  city?: string;
  state?: string;
  country?: string;
  subject?: string;
  reason?: string;
  product?: string;
}

export interface FormSubmissionResult {
  success: boolean;
  error?: string;
  method?: 'salesforce' | 'fallback';
}

/**
 * Store form submission locally for manual Salesforce sync
 */
function storeLocally(data: ContactFormData): void {
  const submissions = JSON.parse(localStorage.getItem('demoRequests') || '[]');
  submissions.push({
    ...data,
    timestamp: new Date().toISOString(),
    id: Date.now().toString()
  });
  localStorage.setItem('demoRequests', JSON.stringify(submissions));
}

/**
 * Format data for Salesforce Lead creation
 */
function formatForSalesforce(data: ContactFormData): any {
  const nameParts = data.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || firstName;

  return {
    FirstName: firstName,
    LastName: lastName,
    Email: data.email,
    Phone: data.phone,
    Company: data.restaurant || 'Unknown Restaurant',
    Description: data.message || 'Demo request from website',
    LeadSource: 'Website',
    Status: 'Open - Not Contacted'
  };
}

/**
 * Submit form data to Salesforce using Web-to-Lead
 * This is Salesforce's native form integration - NO THIRD PARTIES NEEDED
 */
async function submitToSalesforce(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    const leadData = formatForSalesforce(data);
    
    // ✅ SALESFORCE ORG ID: Configured from your Web-to-Lead/Case HTML
    // Found: 00DdM000008JmNo from your provided HTML forms
    const SALESFORCE_ORG_ID = '00DdM000008JmNo';
    
    // ✅ Salesforce is configured with Org ID: 00DdM000008JmNo
    console.log('🚀 Salesforce Web-to-Lead configured with Org ID:', SALESFORCE_ORG_ID);
    
    // Create hidden form for Salesforce Web-to-Lead submission
    const form = document.createElement('form');
    form.action = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
    form.method = 'POST';
    form.style.display = 'none';
    form.target = '_blank'; // Open in new tab to avoid page redirect

    // Salesforce required fields
    const formFields = {
      'oid': SALESFORCE_ORG_ID,
      'retURL': `${window.location.origin}/thank-you`,
      
      // Lead data mapping
      'first_name': leadData.FirstName,
      'last_name': leadData.LastName,
      'email': leadData.Email,
      'phone': leadData.Phone,
      'company': leadData.Company,
      'description': leadData.Description,
      'lead_source': 'Website Demo Request',
      
      // Custom fields from your Salesforce org
      '00NdM000003WJu5': data.numberOfLocations || '', // Number of Locations
      'city': data.city || '',
      'state': data.state || '',
      'country': data.country || '',
      
      // Additional tracking fields
      '00N5g00000Website': window.location.origin, // Custom field for website tracking
      '00N5g00000FormType': 'Demo Request',
      '00N5g00000Timestamp': new Date().toISOString()
    };

    // Create hidden input elements
    Object.entries(formFields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = String(value || '');
      form.appendChild(input);
    });

    // Submit form to Salesforce
    document.body.appendChild(form);
    
    // Small delay to ensure form is added to DOM
    setTimeout(() => {
      form.submit();
      console.log('✅ Lead submitted to Salesforce via Web-to-Lead');
      
      // Clean up form element
      document.body.removeChild(form);
    }, 100);

    return { 
      success: true, 
      method: 'salesforce',
      error: undefined
    };
    
  } catch (error: any) {
    console.error('❌ Web-to-Lead submission failed:', error.message);
    
    // Store locally as backup
    storeLocally(data);
    
    return { 
      success: false, 
      error: 'Unable to submit to Salesforce directly',
      method: 'fallback'
    };
  }
}

/**
 * Submit form data to Salesforce using Web-to-Case (for complaints)
 */
async function submitToSalesforceCase(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    const SALESFORCE_ORG_ID = '00DdM000008JmNo';
    
    console.log('🚀 Submitting complaint to Salesforce Web-to-Case');
    console.log('📊 Complaint data:', data);
    
    // Create hidden form for Salesforce Web-to-Case submission
    const form = document.createElement('form');
    form.action = 'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8';
    form.method = 'POST';
    form.style.display = 'none';
    form.target = '_blank'; // Open in new tab to avoid page redirect

    // Salesforce required fields for cases
    const formFields = {
      'orgid': SALESFORCE_ORG_ID,
      'retURL': `${window.location.origin}/thank-you-complaint`,
      
      // Contact information
      'name': data.name,
      'email': data.email,
      'phone': data.phone || '',
      'company': data.restaurant || 'Unknown Restaurant',
      
      // Case details
      'subject': data.subject || 'Customer Complaint',
      'description': data.message || 'Customer complaint from website',
      
      // Custom fields from your org
      '00NdM000003WJu0': data.product || '', // Product field
      
      // Case categorization
      'reason': data.reason || 'Other',
      'priority': data.priority === 'high' ? 'High' : data.priority === 'medium' ? 'Medium' : 'Low',
      
      // Tracking fields
      '00N5g00000FormType': 'Complaint',
      '00N5g00000Timestamp': new Date().toISOString(),
      '00N5g00000Website': window.location.origin
    };

    // Create hidden input elements
    Object.entries(formFields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = String(value || '');
      form.appendChild(input);
    });

    // Submit form to Salesforce
    document.body.appendChild(form);
    
    // Small delay to ensure form is added to DOM
    setTimeout(() => {
      form.submit();
      console.log('✅ Case submitted to Salesforce via Web-to-Case');
      
      // Clean up form element
      document.body.removeChild(form);
    }, 100);

    return { 
      success: true, 
      method: 'salesforce',
      error: undefined
    };
    
  } catch (error: any) {
    console.error('❌ Web-to-Case submission failed:', error.message);
    
    // Store locally as backup
    storeLocally(data);
    
    return { 
      success: false, 
      error: 'Unable to submit to Salesforce directly',
      method: 'fallback'
    };
  }
}

/**
 * Submit contact form data with Salesforce integration
 */
export async function submitContactForm(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    // Store locally as backup and for debugging
    storeLocally(data);
    
    // Determine submission method based on request type
    const requestType = data.requestType || 'demo';
    console.log(`📝 Processing ${requestType} request for Salesforce`);
    
    // Submit to appropriate Salesforce endpoint
    let result: FormSubmissionResult;
    
    if (requestType === 'complaint') {
      // Use Web-to-Case for complaints
      result = await submitToSalesforceCase(data);
    } else {
      // Use Web-to-Lead for demo requests and general inquiries
      result = await submitToSalesforce(data);
    }
    
    // If Salesforce integration succeeds
    if (result.success) {
      return {
        success: true,
        method: 'salesforce',
        error: undefined
      };
    } else {
      // Fallback: store locally for manual processing
      console.warn('Salesforce failed, data stored locally for manual sync');
      return {
        success: true,
        method: 'fallback',
        error: 'Data stored locally - will sync to Salesforce manually'
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

/**
 * Submit demo request (uses Web-to-Lead)
 */
export async function submitDemoRequest(data: ContactFormData): Promise<FormSubmissionResult> {
  // Set demo-specific metadata
  const demoData = {
    ...data,
    requestType: 'demo' as const,
    priority: 'high' as const,
    formType: 'Demo Request'
  };
  
  console.log('🎯 Submitting demo request via Web-to-Lead');
  return submitContactForm(demoData);
}

/**
 * Submit complaint (uses Web-to-Case)
 */
export async function submitComplaint(data: ContactFormData): Promise<FormSubmissionResult> {
  // Set complaint-specific metadata for Web-to-Case
  const complaintData = {
    ...data,
    requestType: 'complaint' as const,
    priority: 'medium' as const,
    formType: 'Complaint',
    reason: data.reason || 'Other',
    product: data.product || '',
    subject: data.subject || 'Customer Complaint'
  };
  
  console.log('🚨 Submitting complaint via Web-to-Case');
  return submitContactForm(complaintData);
}