require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        "  MongoDB is connected successfully.",
        process.env.MONGODB_URL
      );
    })
    .catch((err: any) => {
      console.error(
        "  MongoDB connection error. Please make sure MongoDB is running. " +
          err
      );
      process.exit();
    });
};
