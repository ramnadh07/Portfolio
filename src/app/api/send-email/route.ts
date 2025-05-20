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

    // Generate a more concise and professional subject line
    const subjectLine = `New Business Interest Submission - ${feedbackData.name || feedbackData.company}`;

    // Create the HTML body as a well-structured table
    const htmlBody = `
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: sans-serif; background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <tr>
                <td align="center" bgcolor="#1a202c" style="padding: 30px 20px; color: #ffffff; font-size: 28px; font-weight: bold;">
                  Business Interest Submission
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 15px; font-size: 16px;">
                        <strong style="color: #4a5568;">Name:</strong> ${feedbackData.name}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 15px; font-size: 16px;">
                        <strong style="color: #4a5568;">Email:</strong> ${feedbackData.email}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 15px; font-size: 16px;">
                        <strong style="color: #4a5568;">Company:</strong> ${feedbackData.company}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 15px; font-size: 16px;">
                        <strong style="color: #4a5568;">Role:</strong> ${feedbackData.role}
                      </td>
                    </tr>
                     <tr>
                      <td style="padding-bottom: 15px; font-size: 16px;">
                        <strong style="color: #4a5568;">Industry:</strong> ${feedbackData.industry}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 15px; font-size: 16px;">
                        <strong style="color: #4a5568;">Company Size:</strong> ${feedbackData.companySize || 'Not specified'}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 15px; font-size: 16px;">
                        <strong style="color: #4a5568;">Looking For:</strong><br>${feedbackData.lookingFor}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 15px; font-size: 16px;">
                        <strong style="color: #4a5568;">Skills/Domains of Interest:</strong><br>${feedbackData.skillsInterest || 'Not specified'}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 0; font-size: 16px;">
                        <strong style="color: #4a5568;">General Feedback:</strong><br>${feedbackData.generalFeedback || 'Not specified'}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td bgcolor="#e2e8f0" style="padding: 20px 30px; text-align: center; font-size: 12px; color: #4a5568;">
                  This email was sent from your website's feedback form.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
    sendSmtpEmail.subject = subjectLine;
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