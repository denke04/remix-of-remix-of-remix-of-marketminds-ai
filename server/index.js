import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = 8000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

// In-memory storage for demo
const users = new Map();
const sessions = new Map();

// Middleware to extract user from token (optional - doesn't block requests)
const extractUserFromToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    // Check in-memory sessions first
    const user = sessions.get(token);
    if (user) {
      req.user = user;
      return next();
    }
    
    // If Supabase is configured, verify JWT token
    if (supabase) {
      try {
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(token);
        if (!error && supabaseUser) {
          req.user = {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0],
          };
          return next();
        }
      } catch (error) {
        console.error('Supabase auth error:', error);
      }
    }
  }
  
  // No valid authentication found, but continue (some endpoints may not require auth)
  next();
};

app.use(extractUserFromToken);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MarketMinds AI API is running' });
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  if (users.has(email)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  const user = {
    id: Date.now().toString(),
    email,
    name: name || email.split('@')[0],
    createdAt: new Date().toISOString(),
  };
  
  users.set(email, { ...user, password });
  const token = `token_${user.id}_${Date.now()}`;
  sessions.set(token, user);
  
  res.status(201).json({
    user,
    token,
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = `token_${user.id}_${Date.now()}`;
  const { password: _, ...userWithoutPassword } = user;
  sessions.set(token, userWithoutPassword);
  
  res.json({
    user: userWithoutPassword,
    token,
  });
});

// Onboarding endpoint
app.post('/api/onboarding', async (req, res) => {
  const { businessName, businessType, industry, goals, platforms, experience, teamSize, businessDescription, businessMessage } = req.body;
  
  // Get user email from authenticated session
  const userEmail = req.user?.email;
  
  if (!userEmail) {
    return res.status(401).json({ 
      error: 'Authentication required. Please log in to complete onboarding.' 
    });
  }
  
  // Validate and ensure arrays
  const goalsArray = Array.isArray(goals) ? goals : [];
  const platformsArray = Array.isArray(platforms) ? platforms : [];
  
  // Prepare data for Supabase
  const userData = {
    email: userEmail,
    businessName,
    industry,
    goals: goalsArray,
    platforms: platformsArray,
    experience,
    teamSize,
  };
  
  // If Supabase is configured, save to database
  if (supabase) {
    try {
      // Try to update existing user, or insert if not exists
      const { data, error } = await supabase
        .from('users')
        .upsert(userData, { 
          onConflict: 'email',
          ignoreDuplicates: false 
        })
        .select();
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ 
          error: 'Failed to save onboarding data',
          details: error.message 
        });
      }
      
      return res.json({
        success: true,
        message: 'Onboarding completed successfully',
        data: userData,
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ 
        error: 'An unexpected error occurred while saving onboarding data' 
      });
    }
  }
  
  // Fallback: If Supabase not configured, just return success with mock data
  console.warn('Supabase not configured. Onboarding data not persisted.');
  res.json({
    success: true,
    message: 'Onboarding completed successfully (demo mode)',
    data: userData,
  });
});

// Dashboard endpoint
app.get('/api/dashboard', (req, res) => {
  res.json({
    metrics: {
      views: { value: '24.5K', change: '+18%', positive: true },
      likes: { value: '3,892', change: '+12%', positive: true },
      comments: { value: '284', change: '+8%', positive: true },
      shares: { value: '156', change: '-3%', positive: false },
    },
    weeklyData: [
      { day: 'Mon', views: 1200, engagement: 340 },
      { day: 'Tue', views: 1800, engagement: 520 },
      { day: 'Wed', views: 2400, engagement: 680 },
      { day: 'Thu', views: 2100, engagement: 590 },
      { day: 'Fri', views: 2800, engagement: 780 },
      { day: 'Sat', views: 1600, engagement: 420 },
      { day: 'Sun', views: 1400, engagement: 380 },
    ],
    platforms: [
      { id: 'instagram', label: 'Instagram', followers: '2,847', growth: '+12%', positive: true },
      { id: 'tiktok', label: 'TikTok', followers: '1,234', growth: '+28%', positive: true },
      { id: 'youtube', label: 'YouTube', followers: '892', growth: '+5%', positive: true },
      { id: 'facebook', label: 'Facebook', followers: '1,567', growth: '-2%', positive: false },
      { id: 'google', label: 'Google', followers: '3,421', growth: '+15%', positive: true },
    ],
    insights: [
      {
        type: 'success',
        title: 'Your Reel about coffee art got 3x more engagement',
        desc: 'Behind-the-scenes content resonates with your audience. Create more!'
      },
      {
        type: 'warning',
        title: 'Engagement drops on weekends',
        desc: 'Consider scheduling your best content for weekdays, especially Tuesday-Thursday'
      },
      {
        type: 'tip',
        title: 'Your hashtag strategy is improving',
        desc: 'Keep using niche-specific hashtags like #specialtycoffee and #latteart'
      },
    ],
  });
});

// Ideas generation endpoint
app.post('/api/ideas/generate', (req, res) => {
  const { businessType, industry, goals, platforms } = req.body;
  
  // Generate AI-powered content ideas based on business info
  const ideas = [
    {
      id: Date.now(),
      type: 'reels',
      title: `Behind-the-scenes ${industry || 'business'} content`,
      hook: '"Watch me create magic in 60 seconds"',
      structure: 'Show process → Close-up → Reveal final result',
      cta: '"Double tap if you\'d try this!"',
      trending: true,
    },
    {
      id: Date.now() + 1,
      type: 'carousel',
      title: `5 ${industry || 'Industry'} Facts Your Customers Don't Know`,
      hook: '"Think you know everything? Think again 👀"',
      structure: '1 fact per slide with visual → End with CTA',
      cta: '"Save this for later!"',
      trending: false,
    },
    {
      id: Date.now() + 2,
      type: 'stories',
      title: 'This or That: Interactive Edition',
      hook: 'Interactive poll stories',
      structure: 'Option A vs Option B → Vote results',
      cta: '"DM us your favorite!"',
      trending: true,
    },
    {
      id: Date.now() + 3,
      type: 'promo',
      title: 'Flash Sale Announcement',
      hook: '"24 hours only ⏰"',
      structure: 'Urgency → Offer details → How to redeem',
      cta: '"Link in bio to order!"',
      trending: false,
    },
  ];
  
  res.json({
    ideas,
    generatedAt: new Date().toISOString(),
  });
});

// Analyze endpoint
app.post('/api/analyze', (req, res) => {
  const { platform, contentType, contentUrl } = req.body;
  
  const platformAnalysis = {
    instagram: {
      score: 72,
      good: [
        'Strong visual composition',
        'Good use of natural lighting',
        'Clear product focus',
      ],
      issues: [
        'Hook takes too long — first 2 seconds should grab attention',
        'Caption lacks a clear CTA',
        'Hashtags could be more targeted',
      ],
      tips: [
        'Use visual storytelling with concise captions',
        'Add "Link in bio" or "DM us" as CTA',
        'Use 15-20 niche-specific hashtags',
      ],
    },
    tiktok: {
      score: 68,
      good: [
        'Great energy and authenticity',
        'Trending audio potential',
        'Good vertical framing',
      ],
      issues: [
        'Hook needs to be in the first 0.5 seconds',
        'Pacing could be faster to match platform style',
        'Missing text overlays for silent viewers',
      ],
      tips: [
        'Start with your most eye-catching moment immediately',
        'Speed up cuts — TikTok users scroll fast',
        'Add captions/text overlays for 80% who watch on mute',
      ],
    },
  };
  
  const analysis = platformAnalysis[platform] || platformAnalysis.instagram;
  
  res.json({
    ...analysis,
    platform,
    contentType,
    analyzedAt: new Date().toISOString(),
  });
});

// Schedule endpoint
app.post('/api/schedule', (req, res) => {
  const { postId, scheduledTime, platform, content } = req.body;
  
  res.json({
    success: true,
    scheduledPost: {
      id: postId || Date.now().toString(),
      scheduledTime,
      platform,
      content,
      status: 'scheduled',
    },
  });
});

// Create content endpoint
app.post('/api/create', (req, res) => {
  const { contentType, brandProfile, prompt } = req.body;
  
  // Simulate AI content creation
  res.json({
    success: true,
    content: {
      id: Date.now().toString(),
      type: contentType,
      url: 'https://placeholder.com/generated-content',
      caption: `Generated content for ${contentType} based on your brand`,
      createdAt: new Date().toISOString(),
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MarketMinds AI Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
