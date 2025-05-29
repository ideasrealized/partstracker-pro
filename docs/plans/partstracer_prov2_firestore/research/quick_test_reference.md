# Quick Test Reference - PartsTracker-ProV2.0
**Cross-Device Testing Guide**

## 📱 **MOBILE STEPS** (5 minutes)
1. Go to: `https://partstracker-pro-2025.web.app/tech/`
2. Upload any PDF with parts
3. Enter: Name: "Test Tech Alpha", Initials: "TTA"
4. Update 3-5 parts with different statuses
5. Add notes with special chars: "Test é, ñ, &"
6. Submit report
7. **WATCH FOR**: "☁️ Report saved to Firestore successfully"
8. Copy the generated link

## 🖥️ **DESKTOP STEPS** (2 minutes)
1. Open different browser/incognito
2. Paste the copied link
3. **LOOK FOR**: "☁️ Loaded from cloud storage"
4. Verify all data matches exactly
5. Test print functionality

## ✅ **SUCCESS CRITERIA**
- [ ] Report loads in < 5 seconds
- [ ] All data identical across devices
- [ ] Cloud storage messages appear
- [ ] Print works properly

## 🐛 **WHAT TO REPORT BACK**
- ✅/❌ for each step
- Any error messages
- Performance timing
- The actual report link generated

**Ready to test? Let's validate PartsTracker-ProV2.0! 🚀** 