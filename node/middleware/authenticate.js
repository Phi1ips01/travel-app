const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // If no token is provided, return 401 Unauthorized
    if (!token) {
        return res.status(401).json({ error: 'Access token not provided' });
    }

    // Verify the token
    jwt.verify(token, 'K3fcvhg42lmm3o4?nf3', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        // If token is valid, store the decoded payload in the request object
        req.user = decoded;
        next(); // Pass control to the next middleware or route handler
    });
}

module.exports = authenticateToken;
