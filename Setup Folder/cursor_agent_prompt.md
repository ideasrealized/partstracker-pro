# PartsTracker Pro - Cursor Agent Setup Prompt

## Project Overview
You are tasked with setting up and developing **PartsTracker Pro** - a web-based parts inventory tracking system for field service technicians. This is a 2-phase project:

**Phase 1**: Working prototype for immediate internal use
**Phase 2**: SaaS platform for external businesses

## Current Project State
- Existing HTML prototypes: `manager_dashboard.html`, `parts_inventory_tracker.html`, `parts_reports_viewer.html`
- Sample PDF files showing the exact format we parse (PartsPick exports from service desk software)
- localStorage issues need to be resolved for sandboxed environments
- Need Firebase hosting and database integration

## Core Functionality
**Manager Workflow:**
1. Upload PartsPick PDF files (multiple technicians)
2. System parses PDFs and extracts parts data automatically
3. Generate unique secure links for each technician
4. Send email templates with links to technicians
5. Receive completed JSON reports via email
6. Use report viewer to generate professional PDF summaries

**Technician Workflow:**
1. Click link from manager (mobile-optimized)
2. See pre-loaded parts list from their PartsPick
3. Update status for each part using dropdown
4. Add notes for any parts requiring explanation
5. Submit completed form
6. System emails JSON report to manager

## Technical Requirements

### Frontend
- **Vanilla HTML/CSS/JavaScript** (no frameworks initially)
- **Mobile-first responsive design**
- **Progressive Web App** capabilities
- **Offline functionality** where possible

### Backend
- **Firebase Hosting** for static files
- **Firestore** for temporary data storage
- **Firebase Functions** for PDF processing and email
- **Firebase Storage** for uploaded PDFs

### Key Features
- **PDF.js** for client-side PDF parsing
- **EmailJS** or **SendGrid** for automated emails
- **Secure link generation** with expiration
- **Multi-company data isolation**
- **Usage tracking** for freemium model

## Part Status Options (CRITICAL)
Update all interfaces to include these exact statuses:
```javascript
const statusOptions = {
    'pending-use': 'Pending Use',
    'used': 'Used',
    'used-no-charge': 'Used (No Charge)',
    'returned': 'Returned',
    'pending-return': 'Pending Return',
    'lost': 'Lost',
    'never-received': 'Never Received',
    'add-to-stock': 'Add to Stock',
    'damaged-warranty-out': 'Damaged (Warranty Out)'
};
```

## Immediate Tasks

### 1. Repository Setup
- Initialize Git repository with proper `.gitignore`
- Set up Firebase project and configuration
- Create development and production environments
- Establish proper folder structure

### 2. Fix Existing Issues
- **CRITICAL**: Replace all localStorage usage with session storage or Firebase
- Update status dropdowns with complete list above
- Fix PDF parsing accuracy for the sample files provided
- Ensure mobile responsiveness

### 3. Firebase Integration
- Set up Firebase Hosting
- Configure Firestore for data storage
- Create Firebase Functions for:
  - PDF processing
  - Email sending
  - Link generation and validation
- Set up Firebase Storage for PDF uploads

### 4. Core Features Implementation
- **Manager Dashboard**: Upload multiple PDFs, generate links, manage technicians
- **Technician Interface**: Mobile-optimized form with all status options
- **Report Viewer**: Professional PDF generation from JSON reports
- **Email Integration**: Automated sending of links and completed reports

### 5. Security & Data Management
- Implement secure link generation with expiration (24-48 hours)
- Add data isolation between different companies/managers
- Basic usage tracking for future billing implementation
- Proper error handling and user feedback

## File Structure Expected
```
parts-tracker-pro/
├── public/
│   ├── index.html (landing page)
│   ├── manager/
│   │   └── dashboard.html
│   ├── tech/
│   │   └── update.html
│   ├── reports/
│   │   └── viewer.html
│   ├── css/
│   ├── js/
│   └── assets/
├── functions/
│   ├── index.js
│   └── package.json
├── sample-data/
│   └── [existing PDF files]
├── docs/
├── firebase.json
├── .firebaserc
└── README.md
```

## Success Criteria
**Phase 1 Complete When:**
- Manager can upload PDFs and generate working links
- Technicians can access links and submit updates
- Reports are generated and emailed successfully
- System works reliably for internal team (5-10 technicians)
- All localStorage issues resolved
- Mobile interface works smoothly

**Phase 2 Preparation:**
- Multi-tenant architecture foundation
- User registration/authentication system
- Usage tracking and billing preparation
- API structure for future integrations

## Sample Data Available
Use the existing PDF files in the project to test and validate parsing accuracy. These represent real-world data formats that the system must handle perfectly.

## Development Priorities
1. **Get working immediately** - fix existing prototypes first
2. **Firebase deployment** - get hosted version running
3. **Mobile optimization** - technicians use phones primarily
4. **Email integration** - critical for workflow
5. **Professional reporting** - managers need clean PDFs
6. **Multi-company preparation** - foundation for SaaS model

## Technology Constraints
- Must work in sandboxed environments (no localStorage dependencies)
- Must handle PDF files up to 10MB
- Must work offline when possible
- Must be fast on mobile networks
- Must integrate with standard email systems

Start with fixing the existing HTML files and getting them properly deployed to Firebase. The business model is proven - we just need a reliable, hosted implementation.

Focus on making it work perfectly for internal use first, then we'll scale to external customers.