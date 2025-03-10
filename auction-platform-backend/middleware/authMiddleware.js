const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    try {
        let token;

        // ✅ 1. Try getting the token from the HTTP-only cookie
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        // ✅ 2. If not found in cookies, check the Authorization header (for API clients)
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // ❌ If no token is found, deny access
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // 🔐 Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request

        next(); // Move to the next middleware
    } catch (error) {
        console.error("❌ Authentication error:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;
