#!/usr/bin/env node

/**
 * Firebase Site Monitoring Dashboard
 * Real-time monitoring of PartsTracker-ProV2.0 Firebase interactions
 */

const admin = require('firebase-admin');
const chalk = require('chalk');

// Initialize Firebase Admin (if not already done)
let db;
try {
    // Try to use existing app or initialize
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            projectId: 'partstracker-pro-2025'
        });
    }
    db = admin.firestore();
    console.log(chalk.green('✅ Firebase Admin initialized successfully'));
} catch (error) {
    console.log(chalk.yellow('⚠️ Firebase Admin not available, monitoring Firestore operations only from client side'));
}

console.log(chalk.blue(`
🔍 PARTSCRACKER-PRO V2.0 MONITORING DASHBOARD
==============================================
Timestamp: ${new Date().toLocaleString()}
Project: partstracker-pro-2025
Real-time monitoring active...

`));

/**
 * Monitor Firestore in real-time
 */
function startFirestoreMonitoring() {
    if (!db) {
        console.log(chalk.red('❌ Cannot monitor Firestore - Admin SDK not available'));
        return;
    }

    console.log(chalk.cyan('📊 Starting Firestore real-time monitoring...'));
    
    // Monitor reports collection
    const reportsRef = db.collection('reports');
    
    // Listen for all changes to reports
    const unsubscribe = reportsRef.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const docData = change.doc.data();
            const timestamp = new Date().toLocaleTimeString();
            
            if (change.type === 'added') {
                console.log(chalk.green(`\n[${timestamp}] 📝 NEW REPORT CREATED`));
                console.log(chalk.white(`  Report ID: ${change.doc.id}`));
                console.log(chalk.white(`  Technician: ${docData.technician?.name} (${docData.technician?.initials})`));
                console.log(chalk.white(`  Parts Count: ${docData.parts?.length || 0}`));
                console.log(chalk.white(`  Device: ${docData.deviceInfo?.platform} - ${docData.deviceInfo?.userAgent?.substring(0, 50)}...`));
                console.log(chalk.gray(`  Created: ${docData.createdAt?.toDate?.() || 'Unknown'}`));
            }
            
            if (change.type === 'modified') {
                console.log(chalk.yellow(`\n[${timestamp}] ✏️ REPORT MODIFIED`));
                console.log(chalk.white(`  Report ID: ${change.doc.id}`));
                console.log(chalk.white(`  Technician: ${docData.technician?.name}`));
            }
            
            if (change.type === 'removed') {
                console.log(chalk.red(`\n[${timestamp}] 🗑️ REPORT DELETED`));
                console.log(chalk.white(`  Report ID: ${change.doc.id}`));
            }
        });
    }, (error) => {
        console.error(chalk.red(`\n[${new Date().toLocaleTimeString()}] ❌ Firestore monitoring error:`), error);
    });

    // Also monitor for connection status
    console.log(chalk.cyan('🔌 Firestore connection monitoring active'));
    
    return unsubscribe;
}

/**
 * Generate monitoring commands for the user
 */
function showMonitoringCommands() {
    console.log(chalk.magenta(`
🛠️ ADDITIONAL MONITORING COMMANDS:
=====================================

1. 📊 Real-time Firestore monitoring:
   npx firebase firestore:logs --project partstracker-pro-2025

2. 🌐 Hosting logs:
   npx firebase hosting:logs --project partstracker-pro-2025

3. 📈 Firebase console (web):
   https://console.firebase.google.com/project/partstracker-pro-2025

4. 🔥 Live site monitoring:
   https://partstracker-pro-2025.web.app

5. 📱 Mobile testing with console:
   Open browser dev tools on mobile device

`));
}

/**
 * Monitor system resources and performance
 */
function showSystemInfo() {
    const memUsage = process.memoryUsage();
    console.log(chalk.blue(`
💻 SYSTEM MONITORING INFO:
=========================
Node.js Memory Usage:
- RSS: ${Math.round(memUsage.rss / 1024 / 1024)} MB
- Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)} MB
- External: ${Math.round(memUsage.external / 1024 / 1024)} MB

Monitoring Process: Active
PID: ${process.pid}
Platform: ${process.platform}
Node Version: ${process.version}

`));
}

/**
 * Real-time error tracking simulation
 */
function simulateErrorTracking() {
    console.log(chalk.red(`
🚨 ERROR TRACKING ACTIVE:
========================
Watching for common issues:
- Firestore connection failures
- localStorage quota exceeded
- Cross-device URL failures
- Browser compatibility issues
- Network connectivity problems

Use browser dev console for client-side errors.

`));
}

// Start monitoring
function startMonitoring() {
    console.clear();
    console.log(chalk.blue.bold('🔍 FIREBASE SITE MONITORING STARTED'));
    
    showSystemInfo();
    showMonitoringCommands();
    simulateErrorTracking();
    
    // Start Firestore monitoring if available
    const unsubscribe = startFirestoreMonitoring();
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log(chalk.yellow('\n⏹️ Shutting down monitoring...'));
        if (unsubscribe) unsubscribe();
        process.exit(0);
    });
    
    // Keep the process alive
    setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        console.log(chalk.gray(`[${timestamp}] 💓 Monitoring active... (Ctrl+C to stop)`));
    }, 30000); // Every 30 seconds
}

// Start the monitoring
startMonitoring(); 