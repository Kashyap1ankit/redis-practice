import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect().then(() => console.log("redis successfuly connected"));

  while (true) {
    const queus = await client.brPop("testing", 0);
    setTimeout(() => {
      console.log("your data is", queus.element);
    }, 5000);
  }
}

main();
