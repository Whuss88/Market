const bcrypt = require(`bcrypt`);
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async register( username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
          data: {
            username,
            password: hashedPassword,
          },
        });
      },
      async login(username, password) {
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          throw new Error(`Invalid username or password`);
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error(`Invalid username or password`);
        }
        return user;
      },
    },
  },
});

module.exports = prisma;