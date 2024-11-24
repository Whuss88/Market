const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = require("../prisma");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: ` You must be logged in`});
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ error: `Invalid token` });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: `Invalid token` });
  }
};

module.exports = authenticate;