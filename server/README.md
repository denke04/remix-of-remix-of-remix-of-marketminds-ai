# MarketMinds AI Backend

Express server with Supabase integration for the MarketMinds AI application.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase (Optional)

The backend can run with or without Supabase. Without Supabase configuration, the onboarding data will not be persisted to a database.

#### Create Supabase Database

1. Sign up at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to the SQL Editor in your Supabase dashboard
4. Run this SQL to create the users table:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  "businessName" TEXT,
  industry TEXT,
  goals TEXT[],
  platforms TEXT[],
  experience TEXT,
  "teamSize" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index on email for faster lookups
CREATE INDEX users_email_idx ON users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert/update their own data
CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);
```

#### Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in `.env`:
   - Get your project URL from Supabase project settings
   - Get your anon key from Supabase project settings > API

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run the Server

```bash
npm start
```

The server will run on `http://localhost:8000`

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login existing user

### Onboarding
- `POST /api/onboarding` - Save user's business information (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ businessName, industry, goals, platforms, experience, teamSize }`
  - Automatically extracts user email from the authenticated session
  - Saves data to Supabase users table

### Other Features
- `GET /api/dashboard` - Dashboard metrics
- `POST /api/ideas/generate` - Generate content ideas
- `POST /api/analyze` - Analyze content
- `POST /api/schedule` - Schedule posts
- `POST /api/create` - Create content

### Health Check
- `GET /api/health` - Check server status

## Architecture

- **Express.js** - Web server framework
- **Supabase** - Backend as a Service (PostgreSQL database)
- **In-memory sessions** - Simple token-based authentication for development

## Development Mode

Without Supabase configuration, the server runs in "demo mode":
- Authentication still works (in-memory storage)
- Onboarding endpoint returns success but doesn't persist data
- Console warns: "Supabase not configured. Onboarding data not persisted."

## Security Notes

⚠️ This implementation is for development/demo purposes. For production:

- Implement proper password hashing (bcrypt)
- Use JWT tokens instead of simple string tokens
- Move from in-memory storage to proper session management
- Add rate limiting
- Restrict CORS to specific origins
- Validate and sanitize all inputs
- Use HTTPS
