# MarketMinds AI - Development Setup

## Overview
This repository contains a complete MarketMinds AI application with a React frontend and Node.js backend for development/demo purposes.

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + Supabase
- **State Management**: React Context API
- **API Client**: Native Fetch API
- **Database**: Supabase (PostgreSQL)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- (Optional) Supabase account for database persistence

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

3. **Configure Supabase (Optional)**:
   - Create a Supabase project at https://supabase.com
   - Create a `users` table with the following schema:
     - `id` (uuid, primary key, default: `gen_random_uuid()`)
     - `email` (text, unique, not null)
     - `businessName` (text)
     - `industry` (text)
     - `goals` (text[] or jsonb)
     - `platforms` (text[] or jsonb)
     - `experience` (text)
     - `teamSize` (text)
   - Copy `server/.env.example` to `server/.env`
   - Fill in your Supabase URL and anon key in `server/.env`
   
   Note: The backend will work without Supabase configuration, but onboarding data won't be persisted.

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

All endpoints are prefixed with `/api`.

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login existing user

### User Management
- `POST /api/onboarding` - Save user's business information to Supabase (requires authentication)
  - Extracts user email from JWT token
  - Saves onboarding data: businessName, industry, goals, platforms, experience, teamSize
  - Returns error if not authenticated

### Features
- `GET /api/dashboard` - Fetch dashboard metrics and insights
- `POST /api/ideas/generate` - Generate content ideas based on business
- `POST /api/analyze` - Analyze content for platform optimization
- `POST /api/schedule` - Schedule posts for publishing
- `POST /api/create` - Create content with AI assistance

### Health Check
- `GET /api/health` - Check API status

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
- 6-step business onboarding with Supabase persistence
- Personalized dashboard with metrics
- AI content idea generation
- Content analysis with platform-specific tips
- Toast notifications for feedback
- Loading states throughout the app
- Error handling and user feedback
- Supabase integration for onboarding data persistence

### 🚧 Mock/Demo Features
- Schedule page (UI only, API ready)
- Create page (UI only, API ready)
- In-memory authentication storage (for development, resets on server restart)
- Dashboard metrics (mock data)

## Development Notes

### Backend
The backend server in `/server` is an Express application with Supabase integration:
- **Authentication**: Uses in-memory token storage for development (for simplicity)
- **Onboarding Data**: Persisted to Supabase when configured, otherwise falls back to demo mode
- **Supabase Integration**: Optional - server works without it but onboarding data won't persist
- **CORS**: Unrestricted (allows all origins) for development
- **Token-based Auth**: Simple token generation for demo purposes

**⚠️ This backend requires additional security for production:**
- Password hashing with bcrypt
- JWT-based authentication with proper signing
- Restricted CORS policy
- Environment-based configuration
- Rate limiting and security middleware
- Proper session management

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
