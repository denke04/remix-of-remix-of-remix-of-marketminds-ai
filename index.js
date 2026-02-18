const express = require('express');
const router = express.Router();

// Import your Supabase client
const { supabase } = require('../supabaseClient');

router.post('/api/onboarding', async (req, res) => {
    try {
        const email = req.user?.email || req.body.email;
        // Email validation regex
        const emailValidationRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!email || !emailValidationRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email provided.' });
        }

        // Save email to Supabase
        const { data, error } = await supabase
            .from('table_name') // replace with your actual table name
            .insert({ email });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Email saved successfully!', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

module.exports = router;
