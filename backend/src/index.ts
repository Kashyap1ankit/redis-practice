import express, { Request, Response } from "express";
import { createClient } from "redis";
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const client = createClient().on("error", (err) =>
  console.log("Redis Client Error", err)
);

async function main() {
  await client.connect().then(() => console.log("redis successfuly connected"));
}

app.get("/", (req: any, res: any) => {
  return res.status(200).json({
    message: "bye",
  });
});

app.get("/test", async (req: any, res: any) => {
  await client.lPush(
    "testing",
    JSON.stringify({ name: "testing", time: "50" })
  );
  return res.status(200).json({
    message: "route pe ho",
  });
});

app.listen(port, () => {
  main();
  console.log(`server start hogaya`);
});
