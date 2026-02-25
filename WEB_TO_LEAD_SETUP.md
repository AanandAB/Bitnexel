# 🎯 Salesforce Web-to-Lead Configuration Guide

## Step 1: Get Your Salesforce Org ID

### In Salesforce Classic:
1. **Login to Salesforce**
2. **Setup** → **Company Settings** → **Company Information**
3. **Copy the "Organization ID"** (15-character ID like `00D5g000004XXXXX`)

### In Salesforce Lightning:
1. **Click the gear icon** (⚙️) in top right
2. **Setup** → **Company Settings** → **Company Information**
3. **Copy the Organization ID**

### Example Org ID:
```
00D5g000004XXXXX
```
⚠️ **Important**: Keep your Org ID secure - it's part of your Salesforce URL structure.

---

## Step 2: Create Web-to-Lead Form

### Generate Form in Salesforce:
1. **Setup** → **Web-to-Lead** → **Create Form**
2. **Select fields** you want to collect:
   - ✅ First Name
   - ✅ Last Name (required)
   - ✅ Email (required)
   - ✅ Phone
   - ✅ Company (required for B2B)
   - ✅ Description
3. **Click "Generate"**
4. **Copy the HTML** (you won't use this directly, but it confirms Web-to-Lead is enabled)

---

## Step 3: Update Your Website Code

### Open: `src/utils/form.ts`
Find line 70 and replace:
```typescript
const SALESFORCE_ORG_ID = 'YOUR_ORG_ID_HERE';
```

With your actual Org ID:
```typescript
const SALESFORCE_ORG_ID = '00D5g000004XXXXX';  // ← Replace with your ID
```

### Example:
```typescript
const SALESFORCE_ORG_ID = '00D5g000004XXXXX'; // ← Your actual Org ID
```

---

## Step 4: Rebuild and Deploy

### Build your project:
```bash
npm run build
```

### Deploy to your hosting platform:
```bash
# If using Vercel:
vercel --prod

# If using Netlify:
netlify deploy --prod

# If using your own server:
# Copy dist/ folder to your server
```

---

## Step 5: Test the Integration

### Test Form Submission:
1. **Visit your website**
2. **Fill out demo request form**
3. **Click "Request Demo"**
4. **Check Salesforce Leads** → New leads should appear

### Verify in Salesforce:
1. **Go to "Leads" tab**
2. **Look for recent leads with "Website" lead source**
3. **Verify all form fields are populated correctly**

---

## 🔧 Troubleshooting

### Common Issues:

#### ❌ "Web-to-Lead not configured"
**Solution**: Make sure you updated the Org ID in `form.ts`

#### ❌ No leads appearing in Salesforce
**Check**:
1. Org ID is correct
2. Web-to-Lead is enabled in Salesforce (Setup → Web-to-Lead)
3. Form submission isn't being blocked by browser

#### ❌ Partial data in Salesforce
**Solution**: Make sure all required Salesforce fields are mapped correctly

---

## 🏗️ Advanced Configuration

### Custom Fields:
Add custom Salesforce fields by including field IDs:

```typescript
const formFields = {
  // ... other fields
  '00N5g00000CustomFieldID': data.customValue, // Custom field
};
```

### Lead Assignment Rules:
Salesforce automatically applies lead assignment rules based on:
- Lead source (Website)
- Territory rules
- Round-robin distribution

### Lead Status:
Set custom lead status by adding field:
```typescript
'00N5g00000LeadStatus': 'Demo Requested'
```

---

## ✅ What's Working Now

### ✅ Zero Dependencies:
- No Zapier, Make.com, EmailJS
- No serverless functions
- No API keys to manage
- No OAuth complexity

### ✅ Enterprise Security:
- Direct Salesforce integration
- All data stays within Salesforce
- No third-party data exposure

### ✅ Reliable:
- Uses Salesforce's own infrastructure
- Automatic error handling
- Built-in spam protection

### ✅ Fast:
- Sub-second form submission
- No network hop delays
- Immediate lead creation

---

## 🎉 You're Done!

Your demo requests will now be automatically sent to Salesforce as leads. Each form submission creates a new lead with:
- ✅ Complete contact information
- ✅ Lead source marked as "Website"
- ✅ Proper lead status for tracking
- ✅ All custom fields populated

**Next Steps**: Set up Salesforce lead assignment rules, email notifications, and follow-up workflows as needed.
