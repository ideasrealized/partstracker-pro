const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

admin.initializeApp();

// PDF processing function
exports.processPDF = functions.https.onCall(async (data, context) => {
  try {
    console.log('Processing PDF:', data.fileName);
    
    // In a real implementation, this would:
    // 1. Download PDF from Storage
    // 2. Parse with pdf-parse
    // 3. Extract parts data
    // 4. Store in Firestore with expiration
    
    const processedData = {
      fileName: data.fileName,
      technicianName: data.technicianName || 'Unknown',
      partsCount: data.partsCount || 0,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours
    };
    
    return { 
      success: true, 
      message: 'PDF processed successfully',
      data: processedData
    };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new functions.https.HttpsError('internal', 'Failed to process PDF');
  }
});

// Generate secure link function
exports.generateSecureLink = functions.https.onCall(async (data, context) => {
  try {
    const linkId = Math.random().toString(36).substr(2, 9);
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
    
    // Store link data in Firestore
    await admin.firestore().collection('links').doc(linkId).set({
      partsData: data.partsData || [],
      technicianName: data.technicianName || 'Unknown',
      technicianEmail: data.technicianEmail || '',
      managerEmail: data.managerEmail || '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: expiresAt,
      status: 'active'
    });
    
    const baseUrl = functions.config().app?.url || 'https://partstracker-pro.web.app';
    const secureLink = `${baseUrl}/tech?id=${linkId}`;
    
    console.log('Generated secure link:', secureLink);
    
    return { 
      success: true,
      linkId: linkId,
      secureLink: secureLink,
      expiresAt: expiresAt.toISOString()
    };
  } catch (error) {
    console.error('Error generating secure link:', error);
    throw new functions.https.HttpsError('internal', 'Failed to generate secure link');
  }
});

// Send email notification function
exports.sendEmailNotification = functions.https.onCall(async (data, context) => {
  try {
    console.log('Sending email to:', data.email);
    
    // Configure nodemailer (you'll need to set up email credentials)
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: functions.config().email?.user || process.env.EMAIL_USER,
        pass: functions.config().email?.pass || process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: data.fromEmail || 'noreply@partstracker-pro.com',
      to: data.email,
      subject: data.subject || 'Parts Status Update Required',
      html: data.htmlContent || `
        <h2>Parts Status Update Required</h2>
        <p>Hi ${data.technicianName || 'Technician'},</p>
        <p>Please update the status of your assigned parts by clicking the link below:</p>
        <p><a href="${data.link}" style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Update Parts Status</a></p>
        <p>This link will expire in 48 hours.</p>
        <p>Best regards,<br>Parts Management Team</p>
      `
    };
    
    // In development, just log the email instead of sending
    if (process.env.NODE_ENV === 'development') {
      console.log('Email would be sent:', mailOptions);
      return { success: true, message: 'Email logged (development mode)' };
    }
    
    await transporter.sendMail(mailOptions);
    
    return { 
      success: true, 
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});

// Get parts data by link ID
exports.getPartsData = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const linkId = req.query.id;
      
      if (!linkId) {
        return res.status(400).json({ error: 'Link ID is required' });
      }
      
      const linkDoc = await admin.firestore().collection('links').doc(linkId).get();
      
      if (!linkDoc.exists) {
        return res.status(404).json({ error: 'Link not found' });
      }
      
      const linkData = linkDoc.data();
      
      // Check if link has expired
      if (new Date() > linkData.expiresAt.toDate()) {
        return res.status(410).json({ error: 'Link has expired' });
      }
      
      return res.json({
        success: true,
        data: {
          partsData: linkData.partsData,
          technicianName: linkData.technicianName,
          expiresAt: linkData.expiresAt.toDate().toISOString()
        }
      });
    } catch (error) {
      console.error('Error getting parts data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Submit completed parts data
exports.submitPartsData = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
      
      const { linkId, partsData, technicianInfo } = req.body;
      
      if (!linkId || !partsData) {
        return res.status(400).json({ error: 'Link ID and parts data are required' });
      }
      
      // Get the original link data
      const linkDoc = await admin.firestore().collection('links').doc(linkId).get();
      
      if (!linkDoc.exists) {
        return res.status(404).json({ error: 'Link not found' });
      }
      
      const linkData = linkDoc.data();
      
      // Check if link has expired
      if (new Date() > linkData.expiresAt.toDate()) {
        return res.status(410).json({ error: 'Link has expired' });
      }
      
      // Store the completed data
      const completedData = {
        linkId: linkId,
        technician: technicianInfo,
        parts: partsData,
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        managerEmail: linkData.managerEmail,
        summary: calculateSummary(partsData)
      };
      
      await admin.firestore().collection('completed-reports').add(completedData);
      
      // Mark link as completed
      await admin.firestore().collection('links').doc(linkId).update({
        status: 'completed',
        completedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // TODO: Send email to manager with completed report
      
      return res.json({
        success: true,
        message: 'Parts data submitted successfully'
      });
    } catch (error) {
      console.error('Error submitting parts data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Helper function to calculate summary
function calculateSummary(partsData) {
  const summary = {};
  const statusOptions = [
    'Pending Use', 'Used', 'Used (No Charge)', 'Returned', 
    'Pending Return', 'Lost', 'Never Received', 'Add to Stock', 
    'Damaged (Warranty Out)'
  ];
  
  statusOptions.forEach(status => {
    summary[status] = 0;
  });
  
  partsData.forEach(part => {
    const statusLabel = getStatusLabel(part.status);
    if (summary.hasOwnProperty(statusLabel)) {
      summary[statusLabel]++;
    }
  });
  
  return summary;
}

// Helper function to get status label
function getStatusLabel(status) {
  const statusMap = {
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
  return statusMap[status] || status;
} 