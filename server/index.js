// Your previous code

// Modify the /api/onboarding endpoint to accept email from req.user.email and fallback to req.body.email
app.post('/api/onboarding', (req, res) => {
    const email = req.user.email || req.body.email;
    // Further processing with email
});