const jwt = require('jsonwebtoken');
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length && bcrypt.compareSync(password, user[0].password_hash)) {
            const token = jwt.sign({ id: user[0].id }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ message: "Logged in successfully", token });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});
