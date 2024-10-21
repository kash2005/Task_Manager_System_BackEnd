const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        // console.log('Decoded token:', decoded); // Log the decoded token
        req.userId = decoded.id; // Use 'id' instead of 'userId'
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
};

module.exports = authenticate;
