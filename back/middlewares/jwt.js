import jwt from "jsonwebtoken";

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
const token = req.headers["x-access-token"];
console.log("token",token);
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log(req.user);
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
};

export default verifyToken;
