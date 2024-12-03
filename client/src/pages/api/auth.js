export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Handle login logic, compare password with hashed password in DB
        const user = await getUserByEmail(email); // Replace with actual DB logic

        if (user && user.password === password) { // For demo only, use hashing in real app
            res.status(200).json({ user, token: 'JWT_TOKEN' }); // Respond with JWT token
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
