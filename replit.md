# Overview

Stamerck Enterprise is a non-emergency medical transportation (NEMT) company website built with Next.js. The application provides information about various transportation services, allows clients to request quotes through a booking form, and features an AI-powered inquiry assistant. The site serves clients who need reliable, compassionate transportation to medical appointments and other occasions, with specialized services for wheelchair users, stretcher patients, and ambulatory clients.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15.3.3 with App Router architecture
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **Design System**: Component-based architecture using Radix UI primitives for accessibility
- **Color Scheme**: Healthcare-focused palette with calming light blue (#75A8D9) primary color and off-white (#F2F4F7) background
- **Typography**: Inter font family for both headlines and body text
- **Icons**: Lucide React icon library
- **State Management**: React Hook Form with Zod validation for form handling
- **UI Components**: Comprehensive component library including forms, cards, navigation, and interactive elements

## Backend Architecture
- **Server Actions**: Next.js server actions for form processing and AI integration
- **AI Integration**: Google Genkit framework integrated with Google AI for the inquiry assistant feature
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form processing
- **Image Optimization**: Next.js Image component with configured remote image patterns
- **Development Environment**: Configured for Replit deployment with custom ports and hostname settings

## Key Features
- **Service Pages**: Dedicated pages for wheelchair transport, stretcher transport, ambulatory transport, long-distance transport, and non-medical occasions
- **Booking System**: Multi-step quote request form with transportation details, scheduling, and customer information
- **AI Assistant**: Genkit-powered inquiry assistant that answers questions and suggests additional services
- **Contact Forms**: Separate contact and payment forms with validation
- **Content Management**: Structured content with FAQ section, testimonials, and company information
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Data Management
- **Form Validation**: Zod schemas for runtime type checking and validation
- **Image Assets**: Placeholder image system with structured JSON configuration
- **Static Content**: Markdown and JSON files for managing FAQ content and image placeholders
- **Type Safety**: Full TypeScript implementation with strict type checking

## External Dependencies

- **AI Services**: Google AI (Gemini 2.5 Flash) integrated through Genkit framework
- **UI Components**: Radix UI component primitives for accessibility-first interactive elements
- **Image Sources**: Unsplash and placeholder image services for visual content
- **Fonts**: Google Fonts (Inter) for typography
- **Development Tools**: ESLint, TypeScript compiler, and patch-package for dependency management
- **CSS Framework**: Tailwind CSS with custom configuration and CSS variables
- **Form Libraries**: React Hook Form with Hookform resolvers for form state management
- **Date Handling**: date-fns library for date formatting and manipulation
- **Charts**: Recharts library for potential data visualization (if needed)
- **Carousel**: Embla Carousel for image/content carousels

## Development Configuration
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Build Optimization**: Configured to ignore build errors and ESLint during builds for rapid iteration
- **Deployment**: Optimized for Replit environment with custom dev server configuration
- **Security**: Frame protection headers and secure remote image patterns