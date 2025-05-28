# PartsTracker Pro

## 🎯 Project Overview
PartsTracker Pro is a web-based parts inventory tracking system designed for field service companies. It streamlines the process of tracking parts assigned to technicians and collecting status updates efficiently.

### Problem Solved
- **Manual parts tracking** is time-consuming and error-prone
- **Lost parts** cost companies thousands annually
- **Technician reporting** is often incomplete or delayed
- **Paper-based systems** are inefficient and easily lost

### Solution
- **Automated PDF parsing** from existing service desk software
- **Mobile-optimized interface** for technicians in the field  
- **Automated email reporting** to managers
- **Professional PDF reports** for office staff
- **Multi-company SaaS platform** (Phase 2)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Firebase CLI
- Git

### Development Setup
```bash
# Clone repository
git clone [repository-url]
cd parts-tracker-pro

# Install Firebase tools
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init

# Start local development
firebase serve
```

### Production Deployment
```bash
# Build and deploy
firebase deploy

# Deploy to specific environment
firebase deploy --only hosting:production
```

## 📁 Project Structure

```
parts-tracker-pro/
├── public/                 # Static web files
│   ├── index.html         # Landing page
│   ├── manager/           # Manager interface
│   │   └── dashboard.html
│   ├── tech/              # Technician interface  
│   │   └── update.html
│   ├── reports/           # Report viewer
│   │   └── viewer.html
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript modules
│   └── assets/            # Images, fonts, etc.
├── functions/             # Firebase Cloud Functions
│   ├── index.js          # Function definitions
│   ├── pdf-parser.js     # PDF processing logic
│   ├── email-service.js  # Email automation
│   └── package.json      # Dependencies
├── sample-data/           # Test PDF files
├── docs/                  # Documentation
├── firebase.json          # Firebase configuration
├── .firebaserc           # Firebase project settings
└── README.md             # This file
```

## 🔧 Core Features

### Manager Dashboard
- Upload multiple PartsPick PDF files
- Automatic parts data extraction
- Generate secure technician links
- Email template generation
- Usage tracking and reporting

### Technician Interface
- Mobile-optimized design
- Pre-loaded parts data
- Status update dropdowns
- Notes and comments
- One-click submission

### Report Viewer
- Professional PDF generation
- Status summaries
- Detailed parts lists
- Printable formats

## 📊 Part Status Options

The system tracks these part statuses:

- **Pending Use** - Assigned but not yet used
- **Used** - Part was installed/used 
- **Used (No Charge)** - Part used but not billable
- **Returned** - Part returned to inventory
- **Pending Return** - Scheduled for return
- **Lost** - Part cannot be located
- **Never Received** - Part was never received by technician
- **Add to Stock** - Part should be added to main inventory
- **Damaged (Warranty Out)** - Part damaged, no warranty coverage

## 🔒 Security Features

- **Secure link generation** with time-based expiration
- **Data isolation** between companies
- **Session-based storage** (no localStorage dependencies)
- **HTTPS enforcement**
- **Input validation** and sanitization

## 📱 Mobile Optimization

- **Responsive design** works on all screen sizes
- **Touch-friendly** interfaces
- **Offline capability** where possible
- **Fast loading** on slow networks
- **Progressive Web App** features

## 🧪 Testing

### Test Data
Sample PartsPick PDF files are included in `/sample-data/` directory. These represent real-world formats the system must parse correctly.

### Local Testing
```bash
# Start local server
firebase serve --only hosting

# Run functions locally
firebase serve --only functions

# Full local environment
firebase serve
```

### Validation Checklist
- [ ] PDF parsing accuracy (100% success rate on samples)
- [ ] Mobile interface usability
- [ ] Email delivery reliability
- [ ] Link security and expiration
- [ ] Report generation quality
- [ ] Multi-browser compatibility

## 📈 Business Model

### Phase 1: Internal Use
- Perfect the system with internal team
- Validate workflow efficiency
- Document time/cost savings

### Phase 2: SaaS Platform
- **Freemium model**: 25 reports/month free
- **Professional**: $19/month for 500 reports
- **Enterprise**: $49/month unlimited + features

### Target Market
- HVAC/Appliance repair companies
- Field service organizations  
- Equipment maintenance companies
- Individual contractors

## 🛠️ Development Roadmap

### Phase 1: MVP (Weeks 1-2)
- [ ] Fix localStorage issues in existing prototypes
- [ ] Deploy working system to Firebase
- [ ] Implement complete status tracking
- [ ] Mobile optimization
- [ ] Email integration

### Phase 2: Beta Platform (Weeks 3-4)  
- [ ] Multi-company architecture
- [ ] User registration system
- [ ] Usage tracking
- [ ] Billing preparation
- [ ] Beta testing with external companies

### Phase 3: Commercial Launch (Weeks 5-8)
- [ ] Payment processing
- [ ] Customer dashboard
- [ ] API development
- [ ] Marketing website
- [ ] Customer support system

## 📞 Support & Documentation

### For Developers
- See `/docs/` folder for technical documentation
- API documentation (coming in Phase 2)
- Database schema documentation

### For Users
- User manual in `/docs/user-guide.md`
- Video tutorials (planned)
- FAQ section

## 🤝 Contributing

### Development Process
1. Create feature branch from `main`
2. Make changes and test thoroughly
3. Submit pull request with description
4. Code review and testing
5. Merge to `main` and deploy

### Code Standards
- ES6+ JavaScript
- Mobile-first CSS
- Semantic HTML
- Clear variable naming
- Comprehensive error handling

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Troubleshooting

### Common Issues
- **localStorage errors**: System now uses session storage
- **PDF parsing fails**: Check file format matches samples
- **Mobile layout issues**: Test on actual devices
- **Email delivery problems**: Verify SendGrid/EmailJS configuration

### Getting Help
- Check `/docs/troubleshooting.md`
- Review Firebase console logs
- Contact development team

---

**Last Updated**: May 2025  
**Version**: 1.0.0-beta  
**Maintained By**: PartsTracker Pro Development Team