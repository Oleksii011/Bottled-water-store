app.post('/subscriptions', async (req, res) => {
    try {
        const { user_id, email } = req.body;
        const result = await db.query('INSERT INTO subscriptions (user_id, email, active) VALUES (?, ?, true)', [user_id, email]);
        res.status(201).json({ message: "Subscription added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding subscription" });
    }
});
