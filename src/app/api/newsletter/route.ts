import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '../../../utils/replitmail';
import { db } from '../../../../server/db';
import { newsletters } from '../../../../shared/schema';
import { eq } from 'drizzle-orm';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // Check if email already exists
    const existingSubscription = await db
      .select()
      .from(newsletters)
      .where(eq(newsletters.email, email))
      .limit(1);

    if (existingSubscription.length > 0) {
      return NextResponse.json(
        { error: 'Email is already subscribed to our newsletter.' },
        { status: 400 }
      );
    }

    // Store in database
    await db.insert(newsletters).values({
      email,
      subscribed_at: new Date(),
      is_active: true,
    });

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Stamerck Enterprise Newsletter!',
      text: `Thank you for subscribing to our newsletter!\n\nYou'll receive updates about our transportation services, special offers, and company news.\n\nBest regards,\nStamerck Enterprise Team`,
      html: `
        <h2>Welcome to Stamerck Enterprise Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter!</p>
        <p>You'll receive updates about:</p>
        <ul>
          <li>Transportation services and updates</li>
          <li>Special offers and promotions</li>
          <li>Company news and announcements</li>
        </ul>
        <p>Best regards,<br>Stamerck Enterprise Team</p>
      `,
    });

    // Send notification to business
    await sendEmail({
      to: 'info@stamerckenterprise.com',
      subject: 'New Newsletter Subscription',
      text: `New newsletter subscription from: ${email}\n\nSubscribed at: ${new Date().toLocaleString()}`,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}