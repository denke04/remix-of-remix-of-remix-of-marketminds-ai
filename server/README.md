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

-- Note: For server-side operations using the anon key, you have two options:
-- Option 1: Disable RLS for this table (simpler for development)
-- The server will handle authorization at the application level

-- Option 2: Enable RLS with policies that allow service operations
-- This is more secure but requires proper JWT handling

-- For development/demo, we recommend Option 1:
-- ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- For production with proper Supabase Auth integration, use Option 2:
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users on their own email
CREATE POLICY "Users can manage their own data" ON users
  FOR ALL 
  USING (email = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Alternative: Allow service role to bypass RLS
-- CREATE POLICY "Service role can manage all data" ON users
--   FOR ALL 
--   USING (auth.role() = 'service_role')
--   WITH CHECK (auth.role() = 'service_role');
```

**Important Notes:**
- If RLS is enabled, ensure your server uses a valid Supabase auth token or the service role key
- For development without proper auth, you can disable RLS on the users table
- The current implementation uses the anon key, which works best with RLS disabled or with policies that check email from JWT claims

#### Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in `.env`:
   - Get your project URL from Supabase project settings
   - Get your anon key from Supabase project settings > API
   - **For production**: Consider using the service_role key instead of anon key for server-side operations

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-or-service-role-key
```

**Key Selection:**
- **Anon Key**: Use with RLS disabled or with proper JWT token forwarding
- **Service Role Key**: Bypasses RLS, use for trusted server-side operations (recommended for this use case)

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
