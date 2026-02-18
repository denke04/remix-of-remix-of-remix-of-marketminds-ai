import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.json());

app.post('/api/onboarding', async (req, res) => {
    const { email, businessName, industry, goals, platforms, experience, teamSize } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required in request body' });
    }

    const userData = {
        email,
        businessName,
        industry,
        goals: Array.isArray(goals) ? goals : [],
        platforms: Array.isArray(platforms) ? platforms : [],
        experience,
        teamSize,
    };

    res.json({
        success: true,
        message: 'Onboarding completed successfully (demo mode)',
        data: userData,
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MarketMinds AI API is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 MarketMinds AI Backend running on http://localhost:${PORT}`);
});