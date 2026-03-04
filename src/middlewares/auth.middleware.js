import jwt from 'jsonwebtoken';

export const verifySuperAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "Super_Admin") {
      return res.status(403).json({ error: "Accès refusé" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
};