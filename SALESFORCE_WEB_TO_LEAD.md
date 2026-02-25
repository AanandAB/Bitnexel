# Salesforce Web-to-Lead Integration (No Third Parties)

## What is Web-to-Lead?
Salesforce's built-in form generation system that lets you collect leads directly without any third-party integrations.

## Setup Steps (10 minutes)

### Step 1: Generate Web-to-Lead Form
1. **Login to Salesforce**
2. **Go to Setup → Web-to-Lead → Create Form**
3. **Select Fields to Include**:
   - First Name, Last Name
   - Email (required)
   - Phone
   - Company
   - Description
   - Custom fields (restaurant info)

4. **Generate Form**
5. **Copy the HTML** (you'll get something like this):

```html
<form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">
  <input type="hidden" name="oid" value="00D5g000004XXXXX">
  <input type="hidden" name="retURL" value="https://yourwebsite.com/thank-you">
  <label for="first_name">First Name</label>
  <input id="first_name" name="first_name" type="text" size="20">
  <label for="last_name">Last Name</label>
  <input id="last_name" name="last_name" type="text" size="20">
  <label for="email">Email</label>
  <input id="email" name="email" type="email">
  <label for="company">Company</label>
  <input id="company" name="company" type="text">
  <label for="phone">Phone</label>
  <input id="phone" name="phone" type="tel">
  <label for="description">Message</label>
  <input id="description" name="description" type="text">
  <input type="submit" value="Submit">
</form>
```

## Integration with React

### Option A: Hidden Form Submission (Recommended)
```typescript
// Update form.ts to use Salesforce Web-to-Lead
async function submitToSalesforce(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    // Create hidden form
    const form = document.createElement('form');
    form.action = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
    form.method = 'POST';
    form.style.display = 'none';

    // Add all required fields
    const fields = {
      'oid': 'YOUR_SALESFORCE_ORG_ID', // Get from setup
      'retURL': window.location.origin + '/thank-you',
      'first_name': data.name.split(' ')[0],
      'last_name': data.name.split(' ').slice(1).join(' ') || data.name.split(' ')[0],
      'email': data.email,
      'phone': data.phone,
      'company': data.restaurant || 'Restaurant',
      'description': data.message,
      'lead_source': 'Website Demo Request'
    };

    // Create hidden inputs
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    // Submit form
    document.body.appendChild(form);
    form.submit();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);

    console.log('✅ Lead submitted to Salesforce via Web-to-Lead');
    return { success: true, method: 'salesforce' };
  } catch (error: any) {
    console.warn('Web-to-Lead submission failed:', error.message);
    
    // Store locally as backup
    storeLocally(data);
    
    return { 
      success: false, 
      error: 'Unable to submit to Salesforce directly',
      method: 'fallback'
    };
  }
}
```

### Option B: Direct Form Integration
Replace your form with the actual Salesforce Web-to-Lead form, styled to match your design.

```typescript
// In your React component
const SalesforceWebForm = () => {
  return (
    <form 
      action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" 
      method="POST"
      className="your-form-styles"
    >
      <input type="hidden" name="oid" value="YOUR_ORG_ID" />
      <input type="hidden" name="retURL" value={window.location.origin + '/thank-you'} />
      
      <div>
        <input name="first_name" type="text" placeholder="First Name" required />
      </div>
      <div>
        <input name="last_name" type="text" placeholder="Last Name" required />
      </div>
      <div>
        <input name="email" type="email" placeholder="Email" required />
      </div>
      <div>
        <input name="company" type="text" placeholder="Restaurant Name" required />
      </div>
      <div>
        <input name="phone" type="tel" placeholder="Phone" />
      </div>
      <div>
        <input name="description" type="text" placeholder="Message" />
      </div>
      
      <button type="submit">Request Demo</button>
    </form>
  );
};
```

## Advantages of Web-to-Lead

✅ **Zero Third-Party Dependencies**
- No Zapier, Make.com, serverless functions
- Direct Salesforce integration

✅ **Enterprise Security**
- Salesforce handles all data
- No exposure of API keys or tokens

✅ **Reliable**
- Uses Salesforce's own infrastructure
- Handles failures automatically

✅ **Fast Setup**
- 5-10 minutes to configure
- No coding required

✅ **Custom Fields**
- Can include any Salesforce fields
- Custom lead sources, territories

## Getting Your Org ID

1. **In Salesforce**: Setup → Company Settings → Company Information
2. **Look for**: "Organization ID"
3. **Format**: 15 or 18 character string (00D5g000004XXXXX)

## Custom Field Mapping

Add custom fields to your Web-to-Lead form:

```typescript
// For custom Salesforce fields
const fields = {
  // ... other fields
  '00N5g00000XXXXXX': data.customField, // Custom field ID
  'lead_source': 'Website Demo Request',
  'description': `Demo Request: ${data.message}`
};
```

## Testing

1. **Submit a test form**
2. **Check Salesforce**: Leads tab should show new lead
3. **Verify all fields** are populated correctly

## Redirect Handling

After form submission, users can be redirected to a thank-you page:
- `retURL` parameter controls redirect
- Set to your website's thank-you page
- Or leave empty to show Salesforce's default confirmation

This is the **cleanest, most direct** way to integrate with Salesforce without any third-party services!
