# MarketMinds AI - Development Setup

## Overview
This repository contains a complete MarketMinds AI application with a React frontend and Node.js backend for development/demo purposes.

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express (Mock API for development)
- **State Management**: React Context API
- **API Client**: Native Fetch API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install frontend dependencies**:
```bash
npm install
```

2. **Install backend dependencies**:
```bash
cd server
npm install
cd ..
```

### Running the Application

1. **Start the backend server** (in a separate terminal):
```bash
cd server
npm start
```
The backend will run on `http://localhost:8000`

2. **Start the frontend dev server**:
```bash
npm run dev
```
The frontend will run on `http://localhost:8080` (or the next available port)

### Testing the Application

1. Visit `http://localhost:8080`
2. Click "Get Started" to create a new account
3. Complete the 6-step onboarding process
4. Explore the app features:
   - **Dashboard**: View performance metrics and insights
   - **Ideas**: Generate AI-powered content ideas
   - **Analyze**: Get platform-specific content feedback
   - **Schedule**: Plan content calendar
   - **Create**: Generate content with AI assistance

## API Endpoints

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Login existing user

### User Management
- `POST /onboarding` - Save user's business information

### Features
- `GET /dashboard` - Fetch dashboard metrics and insights
- `POST /ideas/generate` - Generate content ideas based on business
- `POST /analyze` - Analyze content for platform optimization
- `POST /schedule` - Schedule posts for publishing
- `POST /create` - Create content with AI assistance

### Health Check
- `GET /health` - Check API status

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context providers
│   ├── lib/           # Utilities and API client
│   ├── pages/         # Page components
│   └── App.tsx        # Main app component
├── server/
│   ├── index.js       # Express server (mock API)
│   └── package.json   # Backend dependencies
└── package.json       # Frontend dependencies
```

## Features

### ✅ Implemented
- User authentication (signup/login)
- 6-step business onboarding
- Personalized dashboard with metrics
- AI content idea generation
- Content analysis with platform-specific tips
- Toast notifications for feedback
- Loading states throughout the app
- Error handling and user feedback

### 🚧 Mock/Demo Features
- Schedule page (UI only, API ready)
- Create page (UI only, API ready)
- In-memory data storage (resets on server restart)
- Simple token-based authentication

## Development Notes

### Backend (Mock API)
The backend server in `/server` is a simple Express application designed for development and demonstration purposes:
- Uses in-memory storage (data is lost on restart)
- No password hashing (uses plain text comparison)
- Unrestricted CORS (allows all origins)
- Simple token generation (not cryptographically secure)

**⚠️ This backend is NOT production-ready.** For production use, you would need:
- Proper database (PostgreSQL, MongoDB, etc.)
- Password hashing with bcrypt
- JWT-based authentication
- Restricted CORS policy
- Environment-based configuration
- Rate limiting and security middleware

### Frontend
The frontend is production-ready but the API base URL is hardcoded to `localhost:8000`. For production:
- Use environment variables for API URL
- Implement proper error boundaries
- Add analytics tracking
- Optimize bundle size
- Add service worker for offline support

## Security Considerations

This is a **development/demo implementation**. The following security improvements are needed for production:

1. **Password Security**: Hash passwords with bcrypt before storage
2. **Token Security**: Use JWT with proper signing and expiration
3. **CORS Policy**: Restrict to specific trusted domains
4. **Database**: Use persistent storage with proper security
5. **Environment Variables**: Externalize all configuration
6. **API Rate Limiting**: Prevent abuse
7. **Input Validation**: Validate and sanitize all inputs
8. **HTTPS**: Enforce secure connections in production

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start the backend server

## Contributing

This is a demonstration project. For production use, significant security and infrastructure improvements are required.

## License

See LICENSE file for details.
