const express = require('express');
const app = express();

app.use(express.json());

app.post('/your-endpoint', (req, res) => {
    // Assume req.user is populated by your authentication middleware
    const email = req.user?.email || req.body.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    // Proceed with your logic using the 'email'
    res.status(200).json({ message: 'Email received successfully', email });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
