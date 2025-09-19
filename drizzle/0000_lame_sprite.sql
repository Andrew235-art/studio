CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_name" text NOT NULL,
	"contact_phone" text NOT NULL,
	"trip_type" text NOT NULL,
	"pickup_date" date NOT NULL,
	"pickup_time" text NOT NULL,
	"recurring_start_date" date,
	"recurring_end_date" date,
	"transportation_details" text,
	"notes" text,
	"patient_name" text NOT NULL,
	"patient_phone" text NOT NULL,
	"pickup_address" text NOT NULL,
	"pickup_city" text NOT NULL,
	"pickup_zip" text NOT NULL,
	"pickup_phone" text NOT NULL,
	"destination_address" text NOT NULL,
	"destination_city" text NOT NULL,
	"destination_zip" text NOT NULL,
	"confirmation_email" text NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_name" text NOT NULL,
	"email" text NOT NULL,
	"company_name" text NOT NULL,
	"phone" text NOT NULL,
	"comments" text,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "newsletters_email_unique" UNIQUE("email")
);
