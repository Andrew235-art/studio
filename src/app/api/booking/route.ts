import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '../../../utils/replitmail';
import { db } from '../../../../server/db';
import { bookings } from '../../../../shared/schema';

const bookingSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required.'),
  contactPhone: z.string().min(10, 'A valid phone number is required.'),
  tripType: z.string().min(1, 'Trip type is required.'),
  pickupDate: z.string().optional(),
  pickupTime: z.string().min(1, 'Pick-up time is required.'),
  dropOffTime: z.string().min(1, 'Drop-off time is required.'),
  recurringStartDate: z.string().optional(),
  recurringEndDate: z.string().optional(),
  recurringTransportationDetails: z.string().optional(),
  transportationDetails: z.array(z.string()).optional(),
  notes: z.string().optional(),
  patientName: z.string().min(1, 'Patient name is required.'),
  patientPhone: z.string().min(10, 'A valid patient phone number is required.'),
  pickupAddress: z.string().min(1, 'Pickup address is required.'),
  pickupCity: z.string().min(1, 'Pickup city is required.'),
  pickupZip: z.string().min(5, 'A valid zip code is required.'),
  pickupPhone: z.string().min(10, 'A valid phone number is required.'),
  destinationAddress: z.string().min(1, 'Destination address is required.'),
  destinationCity: z.string().min(1, 'Destination city is required.'),
  destinationZip: z.string().min(5, 'A valid zip code is required.'),
  hasAdditionalDestinations: z.boolean().optional(),
  additionalDestinations: z.array(z.object({
    startDate: z.string(),
    endDate: z.string(),
    address: z.string().min(1, 'Address is required.'),
    city: z.string().min(1, 'City is required.'),
    zipCode: z.string().min(5, 'A valid zip code is required.'),
    notes: z.string().optional(),
  })).optional(),
  confirmationEmail: z.string().email('A valid email is required.'),
}).refine((data) => {
  // For recurring trips, require recurring fields
  if (data.tripType === 'recurring') {
    return data.recurringStartDate && data.recurringEndDate && data.recurringTransportationDetails;
  }
  // For non-recurring trips, require pickup date
  return data.pickupDate;
}, {
  message: "Required fields missing for trip type",
  path: ["tripType"]
}).refine((data) => {
  // Validate recurring date range
  if (data.tripType === 'recurring' && data.recurringStartDate && data.recurringEndDate) {
    return new Date(data.recurringEndDate) >= new Date(data.recurringStartDate);
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["recurringEndDate"]
}).refine((data) => {
  // Validate additional destinations if present
  if (data.hasAdditionalDestinations && data.additionalDestinations) {
    return data.additionalDestinations.length > 0 && data.additionalDestinations.every(dest => 
      dest.address && dest.city && dest.zipCode && 
      dest.startDate && dest.endDate &&
      new Date(dest.endDate) >= new Date(dest.startDate)
    );
  }
  return true;
}, {
  message: "Additional destinations must not be empty and must have valid dates and addresses",
  path: ["additionalDestinations"]
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formData = bookingSchema.parse(body);

    // Convert string dates to proper format for database
    const recurringStartDate = formData.recurringStartDate ? formData.recurringStartDate.split('T')[0] : null;
    const recurringEndDate = formData.recurringEndDate ? formData.recurringEndDate.split('T')[0] : null;
    
    // For recurring trips, use recurring start date as pickup date; for others, use provided pickup date
    const pickupDate = formData.tripType === 'recurring' 
      ? (recurringStartDate || new Date().toISOString().split('T')[0])
      : (formData.pickupDate ? formData.pickupDate.split('T')[0] : new Date().toISOString().split('T')[0]);

    // Store in database
    await db.insert(bookings).values({
      contact_name: formData.contactName,
      contact_phone: formData.contactPhone,
      trip_type: formData.tripType,
      pickup_date: pickupDate,
      pickup_time: formData.pickupTime,
      drop_off_time: formData.dropOffTime,
      recurring_start_date: recurringStartDate,
      recurring_end_date: recurringEndDate,
      recurring_transportation_details: formData.recurringTransportationDetails || '',
      transportation_details: JSON.stringify(formData.transportationDetails || []),
      notes: formData.notes || '',
      patient_name: formData.patientName,
      patient_phone: formData.patientPhone,
      pickup_address: formData.pickupAddress,
      pickup_city: formData.pickupCity,
      pickup_zip: formData.pickupZip,
      pickup_phone: formData.pickupPhone,
      destination_address: formData.destinationAddress,
      destination_city: formData.destinationCity,
      destination_zip: formData.destinationZip,
      has_additional_destinations: formData.hasAdditionalDestinations || false,
      additional_destinations: JSON.stringify(formData.additionalDestinations || []),
      confirmation_email: formData.confirmationEmail,
      submitted_at: new Date(),
      status: 'pending',
    });

    // Send confirmation email to customer
    const transportDetails = formData.transportationDetails && formData.transportationDetails.length > 0 
      ? formData.transportationDetails.join(', ') 
      : 'Standard transport';

    await sendEmail({
      to: formData.confirmationEmail,
      subject: 'Transportation Booking Request Confirmation',
      text: `Dear ${formData.contactName},\n\nThank you for your transportation booking request with Stamerck Enterprise. We have received your request and will contact you within 2 hours to confirm availability and finalize details.\n\nBooking Details:\nPatient: ${formData.patientName}\nTrip Type: ${formData.tripType}\n${formData.pickupDate ? `Pickup Date: ${new Date(formData.pickupDate).toLocaleDateString()}` : ''}\n${formData.recurringStartDate && formData.recurringEndDate ? `Recurring Period: ${new Date(formData.recurringStartDate).toLocaleDateString()} - ${new Date(formData.recurringEndDate).toLocaleDateString()}` : ''}\nPickup Time: ${formData.pickupTime}\nDrop-off Time: ${formData.dropOffTime}\nPickup Address: ${formData.pickupAddress}, ${formData.pickupCity} ${formData.pickupZip}\nDestination: ${formData.destinationAddress}, ${formData.destinationCity} ${formData.destinationZip}\nTransportation Details: ${transportDetails}\n${formData.recurringTransportationDetails ? `Recurring Details: ${formData.recurringTransportationDetails}` : ''}\n${formData.hasAdditionalDestinations && formData.additionalDestinations ? `\nAdditional Destinations:${formData.additionalDestinations.map((dest, i) => `\n  ${i+1}. ${dest.address}, ${dest.city} ${dest.zipCode} (${new Date(dest.startDate).toLocaleDateString()} - ${new Date(dest.endDate).toLocaleDateString()})${dest.notes ? ` - ${dest.notes}` : ''}`).join('')}` : ''}\n${formData.notes ? `Notes: ${formData.notes}` : ''}\n\nContact Information:\nContact: ${formData.contactName} - ${formData.contactPhone}\nPatient: ${formData.patientName} - ${formData.patientPhone}\nPickup Phone: ${formData.pickupPhone}\n\nThank you for choosing Stamerck Enterprise for your transportation needs.\n\nBest regards,\nStamerck Enterprise Team`,
      html: `
        <h2>Transportation Booking Request Confirmation</h2>
        <p>Dear ${formData.contactName},</p>
        <p>Thank you for your transportation booking request with Stamerck Enterprise. We have received your request and will contact you within 2 hours to confirm availability and finalize details.</p>
        
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Patient:</strong> ${formData.patientName}</li>
          <li><strong>Trip Type:</strong> ${formData.tripType}</li>
          ${formData.pickupDate ? `<li><strong>Pickup Date:</strong> ${new Date(formData.pickupDate).toLocaleDateString()}</li>` : ''}
          <li><strong>Pickup Time:</strong> ${formData.pickupTime}</li>
          <li><strong>Drop-off Time:</strong> ${formData.dropOffTime}</li>
          <li><strong>Pickup Address:</strong> ${formData.pickupAddress}, ${formData.pickupCity} ${formData.pickupZip}</li>
          <li><strong>Destination:</strong> ${formData.destinationAddress}, ${formData.destinationCity} ${formData.destinationZip}</li>
          <li><strong>Transportation Details:</strong> ${transportDetails}</li>
          ${formData.recurringStartDate && formData.recurringEndDate ? `<li><strong>Recurring Period:</strong> ${new Date(formData.recurringStartDate).toLocaleDateString()} - ${new Date(formData.recurringEndDate).toLocaleDateString()}</li>` : ''}
          ${formData.recurringTransportationDetails ? `<li><strong>Recurring Details:</strong> ${formData.recurringTransportationDetails}</li>` : ''}
          ${formData.hasAdditionalDestinations && formData.additionalDestinations ? `<li><strong>Additional Destinations:</strong><ul>${formData.additionalDestinations.map((dest, i) => `<li>${dest.address}, ${dest.city} ${dest.zipCode} (${new Date(dest.startDate).toLocaleDateString()} - ${new Date(dest.endDate).toLocaleDateString()})${dest.notes ? ` - ${dest.notes}` : ''}</li>`).join('')}</ul></li>` : ''}
          ${formData.notes ? `<li><strong>Notes:</strong> ${formData.notes}</li>` : ''}
        </ul>
        
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Contact:</strong> ${formData.contactName} - ${formData.contactPhone}</li>
          <li><strong>Patient:</strong> ${formData.patientName} - ${formData.patientPhone}</li>
          <li><strong>Pickup Phone:</strong> ${formData.pickupPhone}</li>
        </ul>
        
        <p>Thank you for choosing Stamerck Enterprise for your transportation needs.</p>
        <p>Best regards,<br>Stamerck Enterprise Team</p>
      `,
    });

    // Send notification to business
    await sendEmail({
      to: 'bookings@stamerck.com',
      subject: 'New Transportation Booking Request',
      text: `New transportation booking request received:\n\nContact: ${formData.contactName} (${formData.contactPhone})\nPatient: ${formData.patientName} (${formData.patientPhone})\nTrip Type: ${formData.tripType}\nPickup: ${new Date(pickupDate).toLocaleDateString()} at ${formData.pickupTime}\nFrom: ${formData.pickupAddress}, ${formData.pickupCity} ${formData.pickupZip} (${formData.pickupPhone})\nTo: ${formData.destinationAddress}, ${formData.destinationCity} ${formData.destinationZip}\nTransportation: ${transportDetails}\nEmail: ${formData.confirmationEmail}\n${formData.notes ? `Notes: ${formData.notes}` : ''}\n${formData.tripType === 'recurring' ? `Recurring: ${formData.recurringStartDate ? new Date(formData.recurringStartDate).toLocaleDateString() : ''} to ${formData.recurringEndDate ? new Date(formData.recurringEndDate).toLocaleDateString() : ''}` : ''}\n\nSubmitted at: ${new Date().toLocaleString()}\n\nPlease contact the customer within 2 hours to confirm.`,
      html: `
        <h2>New Transportation Booking Request</h2>
        <h3>Contact Information:</h3>
        <p><strong>Contact:</strong> ${formData.contactName} (${formData.contactPhone})</p>
        <p><strong>Patient:</strong> ${formData.patientName} (${formData.patientPhone})</p>
        <p><strong>Email:</strong> ${formData.confirmationEmail}</p>
        
        <h3>Trip Details:</h3>
        <p><strong>Trip Type:</strong> ${formData.tripType}</p>
        <p><strong>Pickup:</strong> ${new Date(pickupDate).toLocaleDateString()} at ${formData.pickupTime}</p>
        <p><strong>From:</strong> ${formData.pickupAddress}, ${formData.pickupCity} ${formData.pickupZip} (${formData.pickupPhone})</p>
        <p><strong>To:</strong> ${formData.destinationAddress}, ${formData.destinationCity} ${formData.destinationZip}</p>
        <p><strong>Transportation:</strong> ${transportDetails}</p>
        ${formData.notes ? `<p><strong>Notes:</strong> ${formData.notes}</p>` : ''}
        ${formData.tripType === 'recurring' ? `<p><strong>Recurring:</strong> ${formData.recurringStartDate ? new Date(formData.recurringStartDate).toLocaleDateString() : ''} to ${formData.recurringEndDate ? new Date(formData.recurringEndDate).toLocaleDateString() : ''}</p>` : ''}
        
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        <p><em>Please contact the customer within 2 hours to confirm.</em></p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully! We will contact you within 2 hours to confirm.',
    });
  } catch (error) {
    console.error('Booking form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit booking. Please try again.' },
      { status: 500 }
    );
  }
}