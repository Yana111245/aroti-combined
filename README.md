# Aroti Combined - Unified Spiritual Guidance Platform

A comprehensive React application that combines all Aroti features into a single, cohesive platform for spiritual guidance, discovery, and personal growth.

## Features

### 🏠 **Home & Onboarding**
- **Welcome/Login**: Entry point with authentication flow
- **Onboarding Flow**: 10-step guided setup process
  - Focus Selection
  - Path Type Selection
  - Birth Details
  - Intentions Setting
  - Daily Summary
  - Privacy Settings
  - Subscription Plan
  - Account Creation
  - Completion
- **Home Dashboard**: Daily insights and overview
- **Daily Insights**: Pre and post insight experiences

### 🔍 **Discovery**
- **Discovery Hub**: Main discovery page with carousels and sections
- **Learn Page**: Educational content and courses
- **Unlocks Page**: Progressive content unlocking system
- **Tarot Spreads**: Interactive tarot card experiences
- **Quizzes**: Personality and spiritual assessment tools
- **Favorites**: Saved content management

### 💬 **Guidance**
- **Personal Guidance**: AI-powered spiritual guidance
- **Chat Interface**: Interactive guidance sessions
- **Persona Selection**: Different guidance personalities
- **Chat History**: Previous guidance sessions
- **Points System**: Guidance credit management

### 📅 **Booking**
- **Specialist Directory**: Browse spiritual specialists
- **Specialist Profiles**: Detailed specialist information
- **Session Scheduling**: Book appointments with specialists
- **Payment Processing**: Secure payment handling
- **Booking History**: Past and upcoming sessions

### 👤 **Profile**
- **Profile Overview**: Personal dashboard
- **Astrology Details**: Birth chart and astrological insights
- **Numerology**: Personal numerology analysis
- **Saved Library**: Bookmarked content
- **Messages**: Communication with specialists
- **Session History**: Past guidance and booking sessions
- **Subscription Management**: Plan and billing management
- **Settings**: Privacy and account settings

## Navigation

### Bottom Navigation (4 tabs)
- **Home**: `/home` - Main dashboard
- **Discovery**: `/discovery` - Explore content and features
- **Booking**: `/booking` - Book sessions with specialists
- **Profile**: `/profile` - Personal settings and history

### Special Navigation
- **Guidance**: Accessible via bottom navigation
- **Onboarding**: Full-screen flow without bottom navigation
- **Login**: Entry point without navigation

## Technical Architecture

### **Framework & Libraries**
- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router DOM** for routing
- **TanStack Query** for data management
- **Supabase** for backend services

### **UI & Styling**
- **Tailwind CSS** with custom design system
- **Radix UI** components
- **Lucide React** icons
- **Custom animations** and transitions
- **Glass morphism** design elements

### **Design System**
- **Colors**: Calm luxury palette with gold accents
- **Typography**: Inter (sans-serif) + Playfair Display (serif)
- **Components**: Glass cards, gradient buttons, soft shadows
- **Animations**: Fade-in, scale-in, glow effects

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Shared UI components (50+ components)
│   ├── navigation/         # BottomNav, TabBar
│   ├── onboarding/         # Onboarding-specific components
│   ├── home/              # Home dashboard components
│   ├── discovery/         # Discovery hub components
│   ├── guidance/          # Guidance chat components
│   ├── booking/           # Booking flow components
│   └── profile/           # Profile management components
├── pages/
│   ├── onboarding/        # 10 onboarding pages
│   ├── home/              # 3 home pages
│   ├── discovery/         # 3 discovery pages
│   ├── guidance/          # 1 guidance page
│   ├── booking/           # 5 booking pages
│   └── profile/           # 12 profile pages
├── assets/                # Images and media files
├── data/                  # Static data (specialists, etc.)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── integrations/          # Supabase configuration
```

## Routes

### **Entry & Onboarding** (11 routes)
- `/` - Welcome/Login
- `/onboarding/focus` - Focus Selection
- `/onboarding/path` - Path Type
- `/onboarding/birth-details` - Birth Details
- `/onboarding/intentions` - Intentions
- `/onboarding/daily-summary` - Daily Summary
- `/onboarding/privacy` - Privacy Settings
- `/onboarding/subscription` - Subscription Plan
- `/onboarding/create-account` - Create Account
- `/onboarding/finish` - Completion

### **Home** (3 routes)
- `/home` - Home Overview
- `/home/daily-insight-pre` - Pre Insight
- `/home/daily-insight-post` - Post Insight

### **Discovery** (3 routes)
- `/discovery` - Discovery Hub
- `/discovery/learn` - Learn Page
- `/discovery/unlocks` - Unlocks Page

### **Guidance** (1 route)
- `/guidance` - Guidance Chat

### **Booking** (5 routes)
- `/booking` - Booking Home
- `/booking/specialist/:id` - Specialist Profile
- `/booking/schedule/:id` - Schedule Session
- `/booking/payment/:id` - Payment Summary
- `/booking/history` - Booking History

### **Profile** (12 routes)
- `/profile` - Profile Overview
- `/profile/astrology` - Astrology Detail
- `/profile/numerology` - Numerology Detail
- `/profile/saved` - Saved Library
- `/profile/messages` - Specialist Messages
- `/profile/messages/:id` - Message Thread
- `/profile/sessions` - Session History
- `/profile/subscription` - Subscription Plans
- `/profile/billing` - Billing Payment
- `/profile/edit` - Edit Identity
- `/profile/settings` - Settings Home
- `/profile/settings/privacy` - Privacy Data

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Key Features

- **Responsive Design**: Mobile-first approach with tablet and desktop support
- **Progressive Web App**: Installable with offline capabilities
- **Real-time Updates**: Live chat and notifications
- **Secure Authentication**: Supabase Auth integration
- **Payment Processing**: Stripe integration for bookings
- **Content Management**: Dynamic content loading and caching
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized bundle size and lazy loading

## Contributing

This project combines features from multiple Aroti projects:
- `home-onboarding-valid` - Base project with styling and Supabase
- `discovery-guidance-valid` - Discovery and guidance features
- `booking-valid` - Booking and specialist features
- `profile-valid` - Profile management features

All features have been integrated with consistent styling, navigation, and routing.