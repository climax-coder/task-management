import { relationship } from "./../config/relationships";
import {
  calcPersonality,
  getRelationship,
} from "../services/personality.service";
import { questions } from "../config/questions";
import { getPersonalityResult, getUserData } from "../services/db.service";

require("dotenv").config();

export const getQuestions = (req: any, res: any) => {
  res.json(questions);
};

export const getPersonality = (req: any, res: any) => {
  const answers = req.body;
  console.log(answers);
  const result = calcPersonality(answers, questions);
  res.json(result);
};

export const result = async (req: any, res: any) => {
  const email = req.body["email"];
  const result = await getPersonalityResult(email);
  res.json(result);
};

export const reltionship = async (req: any, res: any) => {
  const { email } = req.query;
  const users = await getUserData(email);
  const currentUser = await getPersonalityResult(email);
  const result = await getRelationship(users, currentUser);
  res.json({ relationship: result, users: users, currentUser: currentUser });
};
