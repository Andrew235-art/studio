import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '../../../utils/replitmail';
import { db } from '../../../../server/db';
import { contacts } from '../../../../shared/schema';

const contactSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required.'),
  email: z.string().email('A valid email is required.'),
  companyName: z.string().min(1, 'Company name is required.'),
  phone: z.string().min(10, 'A valid phone number is required.'),
  comments: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactName, email, companyName, phone, comments } = contactSchema.parse(body);

    // Store in database
    await db.insert(contacts).values({
      contact_name: contactName,
      email,
      company_name: companyName,
      phone,
      comments: comments || '',
      submitted_at: new Date(),
      status: 'new',
    });

    // Send confirmation email to customer
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting Stamerck Enterprise',
      text: `Dear ${contactName},\n\nThank you for reaching out to Stamerck Enterprise. We have received your inquiry and will get back to you within 24 hours.\n\nYour inquiry details:\nCompany: ${companyName}\nPhone: ${phone}\n${comments ? `Message: ${comments}` : ''}\n\nBest regards,\nStamerck Enterprise Team`,
      html: `
        <h2>Thank you for contacting Stamerck Enterprise</h2>
        <p>Dear ${contactName},</p>
        <p>Thank you for reaching out to Stamerck Enterprise. We have received your inquiry and will get back to you within 24 hours.</p>
        
        <h3>Your inquiry details:</h3>
        <ul>
          <li><strong>Company:</strong> ${companyName}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          ${comments ? `<li><strong>Message:</strong> ${comments}</li>` : ''}
        </ul>
        
        <p>Best regards,<br>Stamerck Enterprise Team</p>
      `,
    });

    // Send notification to business
    await sendEmail({
      to: 'info@stamerckenterprise.com',
      subject: 'New Contact Form Submission',
      text: `New contact form submission received:\n\nContact Name: ${contactName}\nEmail: ${email}\nCompany: ${companyName}\nPhone: ${phone}\nComments: ${comments || 'None'}\n\nSubmitted at: ${new Date().toLocaleString()}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Comments:</strong> ${comments || 'None'}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}