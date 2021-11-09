import dotenv from "dotenv";

dotenv.config();

const config = {
  db: {
    uri: process.env.DB_URI,
  },
  app: {
    port: process.env.APP_PORT,
  },
  session: {
    secret: process.env.SESSION_SECRET,
    expireTime: process.env.SESSION_EXPIRE_TIME, // Actualmente 3 hrs
  },
};

export { config };
