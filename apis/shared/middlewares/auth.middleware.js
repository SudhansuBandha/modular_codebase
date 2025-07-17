function authMiddleware(req, res, next) {
    // Basic authentication middleware
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.AUTH_TOKEN}`) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

module.exports = authMiddleware;
