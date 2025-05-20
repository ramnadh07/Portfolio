import { NextRequest, NextResponse } from 'next/server';
import * as Brevo from '@getbrevo/brevo'; // Import the Brevo library

export async function POST(req: NextRequest) {
  // --- Environment Variable Checks ---
  const apiKey = process.env.EMAIL_API_KEY;
  const senderEmail = process.env.EMAIL_FROM;
  const recipientEmail = process.env.EMAIL_TO;

  if (!apiKey) {
    throw new Error('EMAIL_API_KEY environment variable is not set.');
  }
  if (!senderEmail) {
    throw new Error('EMAIL_FROM environment variable is not set.');
  }
  if (!recipientEmail) {
    throw new Error('EMAIL_TO environment variable is not set.');
  }

  try {
    const feedbackData = await req.json(); // Assign value to feedbackData inside try block

    const htmlBody = `
      <h1>New Business Interest Submission</h1>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
 <tr>
          <td><strong>Name:</strong></td>
          <td>${feedbackData.name}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>${feedbackData.email}</td>
        </tr>
        <tr>
          <td><strong>Company:</strong></td>
          <td>${feedbackData.company}</td>
        </tr>
        <tr>
          <td><strong>Your Role:</strong></td>
          <td>${feedbackData.role}</td>
        </tr>
        <tr>
          <td><strong>Your Industry:</strong></td>
          <td>${feedbackData.industry}</td>
        </tr>
        <tr>
          <td><strong>Company Size:</strong></td>
          <td>${feedbackData.companySize}</td>
        </tr>
        <tr>
          <td><strong>What they are primarily looking for:</strong></td>
          <td>${feedbackData.lookingFor}</td>
        </tr>
        <tr>
          <td><strong>Specific Skills/Domains of Interest:</strong></td>
          <td>${feedbackData.skillsOfInterest}</td>
        </tr>
        <tr>
          <td><strong>General Comments:</strong></td>
          <td>${feedbackData.generalComments}</td>
        </tr>
      </table>

      <hr>
      <p>This email was sent from your website's feedback form.</p>
    `;

    const apiInstance = new Brevo.TransactionalEmailsApi();
    
    // Configure Brevo API key
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    // Define the email message for Brevo
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.sender = { email: senderEmail };
    sendSmtpEmail.to = [{ email: recipientEmail }];
    sendSmtpEmail.subject = 'New Business Interest Submission';
    sendSmtpEmail.htmlContent = htmlBody;

    // Send the email using Brevo
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('Email sent successfully (using Brevo)');

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email (Brevo):', error);
 if (process.env.NODE_ENV === 'development' && error instanceof Error) {
 return NextResponse.json({ message: `Error processing feedback: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'Error processing feedback.' }, { status: 500 });
  }
}