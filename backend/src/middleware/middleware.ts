import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include userId property
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Get the authorization header
  const authHeader = req.headers["authorization"];

  // Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract token from "Bearer TOKEN" format
  // Authorization header format: "Bearer eyJhbGciOiJIUzI1NiIsInR..."
  const token = authHeader.split(" ")[1]; // Get the part after "Bearer "

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user ID to request object for use in route handlers
    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware;
