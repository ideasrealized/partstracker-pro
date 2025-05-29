# Parts Tracker Pro - Deployment & Maintenance Guide

## 🚀 Platform Overview

**Parts Tracker Pro** is a Firebase-hosted web application for field service technicians to manage parts inventory status updates. The platform provides:
- Mobile-first responsive design for technician field use
- Manager dashboard for oversight and secure link generation
- Professional report viewer for completed inventories
- Real-time localStorage with enhanced error recovery

## 🏗️ Architecture

### Hosting Platform
- **Primary Hosting**: Firebase Hosting
- **Project ID**: `partstracker-pro-2025`
- **Live URL**: https://partstracker-pro-2025.web.app
- **Local Development**: File-based development with live reload

### Project Structure
```
Parts inventory/
├── public/                  # Static web files (hosted content)
│   ├── index.html          # Landing page
│   ├── manager/            # Manager dashboard
│   │   └── dashboard.html  # PDF upload & link generation
│   ├── tech/               # Technician interface
│   │   └── update.html     # Parts status updating form
│   ├── reports/            # Report viewing
│   │   ├── index.html      # Main report viewer
│   │   └── viewer.html     # Alternative viewer
│   ├── assets/             # Static assets
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
├── functions/              # Firebase Cloud Functions
├── docs/                   # Documentation
├── logs/                   # Development logs and notes
├── firebase.json           # Firebase configuration
├── package.json            # Dependencies
└── .gitignore             # Git ignore rules
```

## 🔧 Development Environment Setup

### Prerequisites
- Node.js (v16 or higher)
- Firebase CLI tools (already installed)
- Git (for version control)
- Modern web browser for testing

### Local Development
1. **Navigate to project**: `cd "C:\dev\Parts inventory"`
2. **Edit files**: Modify files in `public/` directory
3. **Local testing**: Open `public/index.html` in browser
4. **Live development**: Use local server for testing

### Key Development Tools
- **PowerShell**: Primary command interface
- **File system**: Direct file editing workflow
- **Browser DevTools**: For debugging and testing
- **Firebase Console**: For monitoring and analytics

## 🚀 Deployment Process

### Standard Deployment Command
```powershell
npx firebase deploy --only hosting
```

### Deployment Workflow
1. **Verify Changes**: Test locally by opening files in browser
2. **Check File Structure**: Ensure all files are in `public/` directory
3. **Deploy to Firebase**: Run deployment command
4. **Verify Deployment**: Check live URL for updates
5. **Test Functionality**: Verify all features work in production

### Deployment Output
```
=== Deploying to 'partstracker-pro-2025'...
i  deploying hosting
i  hosting[partstracker-pro-2025]: beginning deploy...
+  hosting[partstracker-pro-2025]: file upload complete
i  hosting[partstracker-pro-2025]: finalizing version...
+  hosting[partstracker-pro-2025]: version finalized
i  hosting[partstracker-pro-2025]: releasing new version...
+  hosting[partstracker-pro-2025]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/partstracker-pro-2025/overview
Hosting URL: https://partstracker-pro-2025.web.app
```

## 📁 File Management & GitHub

### Local File Organization
- **Primary Development**: `C:\dev\Parts inventory\`
- **Web Root**: `public/` directory contains all hosted files
- **Documentation**: `docs/` for guides and specifications
- **Logs**: `logs/` for development notes and debugging

### Version Control (GitHub)
- **Repository**: Parts inventory project
- **Branch Strategy**: Main branch for production
- **Commit Process**: Regular commits for major features/fixes
- **Backup Strategy**: Local files + GitHub repository

### GitHub Workflow
1. **Stage Changes**: `git add .`
2. **Commit Changes**: `git commit -m "Description"`
3. **Push to Remote**: `git push origin main`
4. **Deploy**: `npx firebase deploy --only hosting`

## 🔧 Maintenance Tasks

### Regular Maintenance
- **Weekly**: Check error logs and user feedback
- **Monthly**: Review storage usage and performance
- **Quarterly**: Update dependencies and security patches

### Monitoring
- **Firebase Console**: Monitor hosting usage and errors
- **Analytics**: Track user engagement and feature usage
- **Error Tracking**: Monitor console errors and user reports

### Backup Strategy
- **Local Files**: Primary source in `C:\dev\Parts inventory\`
- **GitHub Repository**: Version-controlled backup
- **Firebase Hosting**: Live deployment backup

## 🛠️ Common Maintenance Commands

### Development Commands
```powershell
# Navigate to project
cd "C:\dev\Parts inventory"

# Deploy to Firebase
npx firebase deploy --only hosting

# Check Firebase login status
npx firebase login:list

# View Firebase projects
npx firebase projects:list
```

### File Operations
```powershell
# Copy files (if needed)
Copy-Item "source\*" "public\" -Recurse

# Check directory structure
Get-ChildItem -Recurse public/

# View file sizes
Get-ChildItem public/ | Measure-Object -Property Length -Sum
```

## 🚨 Troubleshooting

### Common Issues
1. **Deployment Fails**: Check Firebase project permissions
2. **File Not Found**: Verify file paths in `public/` directory
3. **CSS/JS Not Loading**: Check relative path references
4. **Local Storage Issues**: Clear browser cache and test again

### Debug Process
1. **Check Console**: Browser DevTools Console tab
2. **Verify Paths**: Ensure all resources load correctly
3. **Test Locally**: Open `public/index.html` directly
4. **Check Firebase**: Verify deployment in Firebase Console

### Support Resources
- **Firebase Documentation**: https://firebase.google.com/docs/hosting
- **Firebase Console**: https://console.firebase.google.com/project/partstracker-pro-2025
- **Local Testing**: File system access for immediate testing

## 📊 Performance Monitoring

### Key Metrics
- **Page Load Speed**: Monitor via browser DevTools
- **Mobile Performance**: Test on actual mobile devices
- **Storage Usage**: Monitor localStorage usage patterns
- **Error Rates**: Track JavaScript errors and user issues

### Optimization Guidelines
- **Minimize File Sizes**: Compress images and optimize code
- **Cache Strategy**: Leverage browser caching for static assets
- **Mobile First**: Ensure optimal mobile performance
- **Error Handling**: Comprehensive error recovery systems

## 🔐 Security Considerations

### Best Practices
- **No Sensitive Data**: All processing is client-side
- **HTTPS Only**: Firebase Hosting enforces HTTPS
- **Input Validation**: Sanitize all user inputs
- **Error Messages**: Avoid exposing system information

### Data Privacy
- **Local Storage Only**: No server-side data storage
- **User Control**: Users manage their own data
- **No Tracking**: Minimal analytics and user tracking
- **GDPR Compliant**: No personal data retention

---

## 📞 Quick Reference

### Emergency Deployment
```powershell
cd "C:\dev\Parts inventory"
npx firebase deploy --only hosting
```

### Live URLs
- **Main Site**: https://partstracker-pro-2025.web.app
- **Manager Dashboard**: https://partstracker-pro-2025.web.app/manager/
- **Technician Interface**: https://partstracker-pro-2025.web.app/tech/
- **Reports Viewer**: https://partstracker-pro-2025.web.app/reports/

### Project Information
- **Firebase Project**: partstracker-pro-2025
- **Local Path**: `C:\dev\Parts inventory\`
- **Web Root**: `public/`
- **Development**: File-based editing + Firebase hosting

---

*Last Updated: December 2024* 