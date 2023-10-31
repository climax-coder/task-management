import { personality } from "./../config/personality";
import { relationship } from "./../config/relationships";
import { storePersonality } from "./db.service";

export const calcPersonality = async (answers, questions) => {
  const mbtiType = {
    E: 0,
    I: 0,
    N: 0,
    S: 0,
    F: 0,
    T: 0,
    J: 0,
    P: 0,
  };

  Object.values(answers.checkedPairs).map((answer: number, index: number) => {
    const valuePerQA = Number(
      (Math.abs(answer) / 3) *
        Object.values(questions)[index]["weight"].toFixed(2)
    );

    const [firstType, secondType] =
      Object.values(questions)[index]["type"].split("/");

    if (answer > 0) {
      mbtiType[firstType] = Number(mbtiType[firstType] + valuePerQA);
    } else if (answer < 0) {
      mbtiType[secondType] = Number(mbtiType[secondType] + valuePerQA);
    }
  });
  const result = await getFullPersonality(mbtiType, answers.email);
  return result;
};

export const getFullPersonality = async (obj, email) => {
  let result = "";
  let data = Object.keys(obj).reduce(
    (accumulated, currentKey, currentIndex) => {
      let updated = accumulated;
      if (currentIndex % 2 === 1) {
        updated.t = [
          ...updated.t,
          { ...updated.temp, [currentKey]: obj[currentKey] },
        ];
        updated.temp = {};
      }
      updated.temp = { [currentKey]: obj[currentKey] };
      return updated;
    },
    { t: [], temp: {} }
  );

  data.t.map((value, index) => {
    if (
      Object.values(value)[0] > Object.values(value)[1] ||
      Object.values(value)[0] === Object.values(value)[1]
    ) {
      result += Object.keys(value)[0];
    } else if (Object.values(value)[0] < Object.values(value)[1]) {
      result += Object.keys(value)[1];
    }
  });
  const personalityWord = personality[result];
  const rss = await storePersonality(email, result, personalityWord);
  return result;
};

export const getRelationship = async (users, currentUser) => {
  const matchedUsers = relationship
    .filter((item) => {
      return users.some(
        (user) => user.type === item.from && currentUser.type === item.to
      );
    })
    .map((item) => item);
  return matchedUsers;
};
