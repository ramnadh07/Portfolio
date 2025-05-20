import { NextRequest, NextResponse } from 'next/server';
import * as Brevo from '@getbrevo/brevo'; // Import the Brevo library, ContactsApi and CreateContact

export async function POST(req: NextRequest) {
  try {
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

    const feedbackData = await req.json(); // Assign value to feedbackData inside try block

    const htmlBody = `
      <h1>New Business Interest Submission</h1>
      <table cellpadding="10" style="border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #dddddd;">
 <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>Company:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.company}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>Your Role:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.role}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>Your Industry:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.industry}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>Company Size:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.companySize}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>What they are primarily looking for:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.lookingFor}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>Specific Skills/Domains of Interest:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.skillsOfInterest}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #dddddd;"><strong>General Comments:</strong></td>
          <td style="padding: 8px; border: 1px solid #dddddd;">${feedbackData.generalComments}</td>
        </tr>
      </table>

      <hr>
      <p>This email was sent from your website's feedback form.</p>
    `;

    // --- Add Contact to Brevo ---
    const contactsApiInstance = new Brevo.ContactsApi();
    contactsApiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey); // Use the same API key

    const createContact = new Brevo.CreateContact();
    createContact.email = feedbackData.email;

    try {
        await contactsApiInstance.createContact(createContact);
        console.log('Contact added to Brevo successfully:', feedbackData.email);
    } catch (contactError: any) {
        console.error('Error adding contact to Brevo:', contactError);
    }
    // --- End Add Contact to Brevo ---

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
  } catch (error: any) { // Explicitly type error as any for now to avoid TS issues with checking instanceof Error
    console.error('Error sending email (Brevo):', error);
    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      return NextResponse.json({ message: `Error processing feedback: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'Error processing feedback.' }, { status: 500 });
  }
}