import app from "./app";
import 'dotenv/config'
const port = process.env.PORT;

import mongoose  from "mongoose";
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    app.listen(port, () => {
      console.log("All Ok")
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
