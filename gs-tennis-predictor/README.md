# Grand Slam Tennis Predictor

A web application that allows users to predict the outcomes of Grand Slam tennis matches and compete with friends on a leaderboard.

## Features

- User authentication with Google Sign-In
- View and browse Grand Slam tournaments
- Make predictions for match winners
- Score points for correct predictions
- View personal prediction history
- Leaderboard to see top predictors

## Tech Stack

### Frontend
- **React (with Next.js)** - For routing, SSR, and SEO
- **Tailwind CSS** - For styling
- **Framer Motion** - For subtle animations
- **TypeScript** - For type safety

### Backend
- **Firebase Authentication** - With Google SSO
- **Firebase Firestore** - For storing users, predictions, match results
- **Firebase Cloud Functions** - For processing logic like calculating points
- **Firebase Hosting** - For deployment

### Other Tools
- **Cheerio** - For scraping official Grand Slam data
- **Recharts** - For leaderboard visualizations
- **Day.js** - For time formatting

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```
git clone https://your-repository-url.git
cd gs-tennis-predictor
```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

4. Run the development server:
```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
gs-tennis-predictor/
├── app/                     # Next.js app directory
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and libraries
│   ├── pages/               # Page components organized by route
│   ├── services/            # Services for data fetching and processing
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper utilities
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Homepage
├── public/                  # Static assets
├── .env.local.example       # Example environment variables
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── tsconfig.json            # TypeScript configuration
```

## Deployment

The application can be deployed to Firebase Hosting:

1. Install Firebase CLI:
```
npm install -g firebase-tools
```

2. Login to Firebase:
```
firebase login
```

3. Initialize Firebase project:
```
firebase init
```

4. Build the application:
```
npm run build
```

5. Deploy to Firebase:
```
firebase deploy
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Recharts](https://recharts.org/)
