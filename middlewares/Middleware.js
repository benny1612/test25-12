import { readData} from "../utils/dbFunc.js";


export const userValdiet = async (req, res, next) => {
  const { username, password } = req.body;
  const getData = await readData("users");
  const dbName = getData.find((element) => element.username == username);
  const dbPassword = getData.find((element) => element.password == password);
  if (dbName && dbPassword) {
    next();
  } else {
    res.status(401).send("user not registerd");
  }
};

export const FirstuserValdiet = async (req, res, next) => {
  const { username, password } = req.body;
  const getData = await readData("users");
  const dbName = getData.find((element) => element.username == username);
  if (!dbName) {
    next();
  } else {
    res.status(401).send("user alredy registerd");
  }
};
