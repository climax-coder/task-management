import dotenv from "dotenv";
dotenv.config();

const config = {
  mongodbURL: process.env.MONGODB_URL,
  port: process.env.PORT || 5000,
  question_URL: process.env.Question_URL,
};

export default config;
