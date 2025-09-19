import { pgTable, serial, text, timestamp, boolean, date } from 'drizzle-orm/pg-core';

// Newsletter subscriptions table
export const newsletters = pgTable('newsletters', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  subscribed_at: timestamp('subscribed_at').defaultNow().notNull(),
  is_active: boolean('is_active').default(true).notNull(),
});

// Contact form submissions table
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  contact_name: text('contact_name').notNull(),
  email: text('email').notNull(),
  company_name: text('company_name').notNull(),
  phone: text('phone').notNull(),
  comments: text('comments'),
  submitted_at: timestamp('submitted_at').defaultNow().notNull(),
  status: text('status').default('new').notNull(), // new, contacted, resolved
});

// Booking form submissions table
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  contact_name: text('contact_name').notNull(),
  contact_phone: text('contact_phone').notNull(),
  trip_type: text('trip_type').notNull(),
  pickup_date: date('pickup_date').notNull(),
  pickup_time: text('pickup_time').notNull(),
  recurring_start_date: date('recurring_start_date'),
  recurring_end_date: date('recurring_end_date'),
  transportation_details: text('transportation_details'), // JSON string
  notes: text('notes'),
  patient_name: text('patient_name').notNull(),
  patient_phone: text('patient_phone').notNull(),
  pickup_address: text('pickup_address').notNull(),
  pickup_city: text('pickup_city').notNull(),
  pickup_zip: text('pickup_zip').notNull(),
  pickup_phone: text('pickup_phone').notNull(),
  destination_address: text('destination_address').notNull(),
  destination_city: text('destination_city').notNull(),
  destination_zip: text('destination_zip').notNull(),
  confirmation_email: text('confirmation_email').notNull(),
  submitted_at: timestamp('submitted_at').defaultNow().notNull(),
  status: text('status').default('pending').notNull(), // pending, confirmed, completed, cancelled
});

// Export types for TypeScript
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = typeof newsletters.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;