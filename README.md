# Iskan - Student Housing Rental Platform

A modern, RTL-supported website for student housing rentals built with Next.js, TailwindCSS, and TypeScript.

## Features

### 🏠 Core Functionality

- **Arabic RTL Support** - Full right-to-left layout and design
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Student Housing Listings** - Browse available accommodations near universities
- **Advanced Filtering** - Filter by area, university, size, and number of rooms
- **Search Functionality** - Search by university name, area, or description
- **Booking System** - Easy appointment booking with form validation

### 🎨 Design & UX

- **Modern UI** - Clean, professional design with Arabic typography
- **Color Palette** - Carefully chosen colors for excellent readability
- **Smooth Animations** - Subtle transitions and hover effects
- **Image Carousels** - Beautiful property photo galleries with Swiper.js

### 📱 Components

- **Navbar** - Fixed navigation with company branding
- **Hero Section** - Eye-catching homepage with call-to-action buttons
- **Listing Cards** - Detailed property cards with key information
- **Filter Sidebar** - Accordion-style filters for easy navigation
- **Booking Modal** - Professional booking form with validation
- **Contact Page** - Comprehensive contact information and form

### 🛠 Technical Stack

- **Framework** - Next.js 15 with App Router
- **Styling** - TailwindCSS with custom Arabic design system
- **Forms** - Formik + Yup for validation
- **Icons** - React Icons
- **Carousel** - Swiper.js for image galleries
- **Typography** - Cairo font family for Arabic text

### 🌟 Key Features

- **Real-time Search** - Instant results as you type
- **Floating Booking Button** - Quick access to booking from any page
- **Map Integration** - Google Maps for property locations
- **WhatsApp Integration** - Direct contact via WhatsApp
- **FAQ Section** - Common questions and answers
- **Business Hours** - Clear operating hours display

## Pages

1. **Home** (`/`) - Hero section with features and call-to-action
2. **Listings** (`/listings`) - Property listings with filters and search
3. **Property Details** (`/listing/[id]`) - Individual property details with gallery
4. **Contact** (`/contact`) - Contact form and business information

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3002](http://localhost:3002) to view the application.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── contact/         # Contact page
│   ├── listing/[id]/    # Individual listing details
│   ├── listings/        # All listings page
│   ├── globals.css      # Global styles and Arabic fonts
│   ├── layout.tsx       # Root layout with RTL support
│   └── page.tsx         # Homepage
├── components/          # Reusable components
│   ├── ui/              # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── BookingForm.tsx  # Formik booking form
│   ├── Filters.tsx      # Property filters
│   ├── FloatingBookingButton.tsx
│   ├── ListingCard.tsx  # Property card component
│   ├── Navbar.tsx       # Navigation component
│   └── SearchBar.tsx    # Search functionality
```

## Color Palette

- **Primary Background**: #F7F7F7
- **Secondary Background**: #E6DCCB
- **Text Primary**: #333333
- **Headings**: #6B4F3D
- **Accent Primary**: #A8C686
- **Accent Secondary**: #E3B7A0

## Arabic Typography

The website uses the Cairo font family for excellent Arabic text rendering and readability.

## Future Enhancements

- User authentication system
- Property owner dashboard
- Payment integration
- Advanced map features
- Review and rating system
- Dark mode toggle
- Multi-language support
