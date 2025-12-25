import express from "express";
import userRouts from "./routes/usersR.js";
import craetorRouts from "./routes/creatorR.js";

const app = express();
app.use(express.json());

const port = 3002;
app.get("/health", (req, res) => {
  res.json({ ok: true });
});
app.use("/users", userRouts);
app.use("/creator", craetorRouts);


app.listen(port, () => {
  console.log(`server runing on http://localhost:${port}`);
});
