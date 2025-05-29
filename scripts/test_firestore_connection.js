// Firestore Connection and Data Inspection Script
// PartsTracker-ProV2.0 Testing Tool
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK using Firebase CLI credentials
try {
    // Use Firebase CLI authentication (no service account needed)
    admin.initializeApp({
        projectId: 'partstracker-pro-2025',
        credential: admin.credential.applicationDefault()
    });
    
    const db = admin.firestore();
    
    console.log('🔥 Firebase Admin SDK initialized successfully');
    console.log('📊 Checking Firestore connection and existing data...\n');
    
    // Test Firestore connectivity
    async function testFirestoreConnection() {
        try {
            // Try to read from reports collection
            const reportsRef = db.collection('reports');
            const snapshot = await reportsRef.limit(5).get();
            
            console.log('✅ Firestore connection successful!');
            console.log(`📄 Found ${snapshot.size} report(s) in database\n`);
            
            if (snapshot.size > 0) {
                console.log('📋 Recent Reports:');
                console.log('='.repeat(80));
                
                snapshot.forEach((doc, index) => {
                    const data = doc.data();
                    console.log(`\n${index + 1}. Report ID: ${doc.id}`);
                    console.log(`   Technician: ${data.technician?.name || 'Unknown'} (${data.technician?.initials || 'N/A'})`);
                    console.log(`   Parts Count: ${data.parts?.length || 0}`);
                    console.log(`   Created: ${data.createdAt?.toDate?.() || 'Unknown'}`);
                    console.log(`   Device: ${data.deviceInfo?.platform || 'Unknown'}`);
                    
                    // Show first few parts for verification
                    if (data.parts && data.parts.length > 0) {
                        console.log(`   Sample Parts:`);
                        data.parts.slice(0, 2).forEach((part, i) => {
                            console.log(`     ${i + 1}. ${part.partNumber} - ${part.description} (${part.status})`);
                        });
                    }
                });
                
                console.log('\n' + '='.repeat(80));
                console.log('✅ Data structure looks good for cross-device testing!\n');
            } else {
                console.log('📝 No existing reports found - ready for fresh testing!\n');
            }
            
            // Test write capability with a small test document
            console.log('🧪 Testing write capability...');
            const testRef = db.collection('reports').doc('test-connection-' + Date.now());
            await testRef.set({
                test: true,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                purpose: 'Testing Firestore connectivity for PartsTracker-ProV2.0'
            });
            
            console.log('✅ Write test successful!');
            
            // Clean up test document
            await testRef.delete();
            console.log('🧹 Test document cleaned up');
            
            console.log('\n🎯 FIRESTORE READY FOR TESTING! 🎯');
            console.log('You can now proceed with cross-device testing.');
            
        } catch (error) {
            console.error('❌ Firestore connection failed:', error.message);
            console.log('\nTroubleshooting steps:');
            console.log('1. Ensure Firestore is enabled in Firebase Console');
            console.log('2. Check firebase.json configuration');
            console.log('3. Verify Firebase CLI is authenticated (npx firebase login)');
            console.log('4. Confirm project ID is correct (partstracker-pro-2025)');
        }
    }
    
    // Function to create test report data for systematic testing
    async function createTestReport(technician, device) {
        const reportId = 'test-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        const testReport = {
            reportId: reportId,
            technician: {
                name: technician.name,
                initials: technician.initials,
                dateTime: new Date().toISOString()
            },
            parts: [
                {
                    qty: 1,
                    partNumber: "TEST-001",
                    description: "Test Widget Assembly",
                    customer: "Test Customer Corp",
                    invoiceNumber: "TEST-12345",
                    status: "Used - Working",
                    notes: "Test part for cross-device validation"
                },
                {
                    qty: 2,
                    partNumber: "TEST-002", 
                    description: "Test Motor Component",
                    customer: "Test Customer Corp",
                    invoiceNumber: "TEST-12345",
                    status: "Returned - Defective",
                    notes: "Testing special characters: é, ñ, & symbols"
                }
            ],
            completedAt: new Date().toISOString(),
            summary: {
                totalParts: 2,
                usedParts: 1,
                returnedParts: 1
            },
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            deviceInfo: {
                platform: device,
                testPurpose: 'Cross-device validation testing'
            }
        };
        
        try {
            await db.collection('reports').doc(reportId).set(testReport);
            console.log(`✅ Test report created: ${reportId}`);
            console.log(`📱 Device: ${device}`);
            console.log(`👤 Technician: ${technician.name} (${technician.initials})`);
            console.log(`🔗 Test URL: https://partstracker-pro-2025.web.app/reports/?id=${reportId}\n`);
            
            return reportId;
        } catch (error) {
            console.error('❌ Failed to create test report:', error.message);
            return null;
        }
    }
    
    // Run the connection test
    testFirestoreConnection().then(() => {
        console.log('\n🚀 Ready to proceed with systematic testing!');
        console.log('\nNext steps:');
        console.log('1. Use your mobile device to create a real report');
        console.log('2. Test accessing that report from desktop');
        console.log('3. Document results in testing_results_log.md');
        
        process.exit(0);
    }).catch((error) => {
        console.error('❌ Connection test failed:', error);
        process.exit(1);
    });
    
} catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
    console.log('\nMake sure firebase-admin is installed:');
    console.log('npm install firebase-admin');
    process.exit(1);
} 