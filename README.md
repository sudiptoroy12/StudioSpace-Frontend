::: {align="center"}
# ✦ StudioSpace

### Find your space. Create your experience.

A modern workspace and studio booking platform where users can discover
creative spaces, explore studio details, and submit booking requests
with ease.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting
Started](#-getting-started) · [Project Structure](#-project-structure)
:::

------------------------------------------------------------------------

## ✨ Overview

**StudioSpace** makes finding and booking a workspace simple. Browse
available studios, review their facilities and pricing, and request a
reservation for the date and time that works for you.

Hosts can manage their studio listings, while users can keep track of
their booking requests from a personal dashboard.

## 🚀 Features

-   **Studio Discovery** --- Explore studio listings and find a space
    that suits your needs.
-   **Detailed Studio Pages** --- View studio images, descriptions,
    categories, location, capacity, amenities, hourly rates, and deposit
    information.
-   **Secure Authentication** --- Sign in to access protected booking
    and listing features.
-   **Studio Listing Management** --- Hosts can create, edit, view, and
    remove their studio listings.
-   **Flexible Booking Requests** --- Select a booking date, start time,
    and duration. The estimated total updates based on the hourly rate
    and deposit.
-   **Booking Status Tracking** --- Submit booking requests and see
    their status, including pending host approval.
-   **My Bookings Dashboard** --- View your bookings and keep track of
    your reservations.
-   **Booking Cancellation** --- Cancel eligible pending bookings from
    your booking dashboard.
-   **Responsive Interface** --- Enjoy a layout designed to work across
    desktop, tablet, and mobile screens.
-   **Light and Dark Appearance** --- A carefully styled interface with
    a consistent visual experience in both themes.

## 🧰 Tech Stack

  Technology       Purpose
  ---------------- --------------------------------------------
  Next.js          React framework and application routing
  React            Component-based user interface
  TypeScript       Type-safe application development
  Tailwind CSS     Responsive styling and design system
  Better Auth      User authentication and session management
  Lucide React     Interface icons
  React Toastify   Toast notifications
  REST API         Communication with the backend
  JWT              Authenticated API requests

## 🎨 Design

StudioSpace uses a **Midnight Plum + Champagne** visual identity.

  Color           Hex
  --------------- -----------
  Midnight Plum   `#211629`
  Deep Plum       `#39243F`
  Lavender        `#A78BBA`
  Champagne       `#D6B98C`
  Warm Cream      `#F7F1E8`

The interface combines soft background glows, refined gradients, rounded
cards, clear typography, and responsive layouts.

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

-   Node.js (LTS recommended)
-   npm, pnpm, yarn, or bun
-   Access to the StudioSpace backend API

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd studiospace
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

``` env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

Add any additional authentication or backend environment variables
required by your project configuration. Never commit secret keys or
private credentials.

### 4. Start the development server

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### 5. Create a production build

``` bash
npm run build
npm run start
```

## 📁 Project Structure

A simplified view of the application structure:

``` text
studiospace/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── studios/
│   │   ├── studios/
│   │   ├── my-bookings/
│   │   ├── my-listings/
│   │   └── ...
│   └── lib/
│       ├── auth-client.ts
│       └── getTokenFromClient.ts
├── .env.local
├── package.json
└── README.md
```

> This is an illustrative structure. Adjust the paths to match your
> repository.

## 🔐 Authentication & Booking Flow

1.  A user signs in to StudioSpace.
2.  The user opens a studio details page and chooses **Book Workspace
    Now**.
3.  The booking form collects the date, start time, and duration.
4.  The client sends the booking details with an authentication token to
    the backend.
5.  The backend handles the booking record and its authoritative pricing
    and status.
6.  The user can review the request in **My Bookings**.

> Booking availability, ownership checks, pricing, and date validation
> should always be verified by the backend. Client-side validation is
> for user experience, not a security boundary.

## 🧑‍💻 Available Scripts

  Command           Description
  ----------------- -----------------------------------------
  `npm run dev`     Start the local development server
  `npm run build`   Build the application for production
  `npm run start`   Start the production server
  `npm run lint`    Run the configured linter, if available

## 🌱 Future Improvements

-   Studio reviews and ratings
-   Advanced search and filters
-   Real-time booking availability
-   Booking notifications for users and hosts
-   Online payment integration

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

1.  Fork the repository.
2.  Create a feature branch: `git checkout -b feature/your-feature`
3.  Commit your changes: `git commit -m "Add your feature"`
4.  Push your branch: `git push origin feature/your-feature`
5.  Open a pull request.

## 📄 License

Add your preferred license before publishing this project publicly.

------------------------------------------------------------------------

::: {align="center"}
**Built with care for better creative spaces.**
:::
