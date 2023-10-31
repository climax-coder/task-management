const Personality = require("../model/user.personality.model");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

const storePersonality = async (email, result, personality) => {
  const user = await User.findOne({ email }).exec();
  const existingUser = await Personality.findOne({ email }).exec();
  const newData = {
    username: user["username"],
    email: email,
    type: result,
    personality: personality,
  };

  if (!existingUser) {
    Personality.create(newData)
      .then((createdData) => {
        console.log("Data created:", createdData);
      })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
  } else {
    Personality.updateOne({ _id: existingUser["id"] }, newData)
      .then(() => {
        console.log(
          "Document updated successfully",
          newData,
          existingUser["id"]
        );
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  }
  console.log(user, existingUser, "exisiting");
  return user.email;
};

const getPersonalityResult = async (email) => {
  const existingUser = await Personality.findOne({ email }).exec();
  return existingUser;
};

const getUserData = async (email): Promise<any> => {
  return new Promise((resolve, reject) => {
    Personality.find({ email: { $ne: email } })
      .then((users) => {
        resolve(users);
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  });
};

export { storePersonality, getPersonalityResult, getUserData };
