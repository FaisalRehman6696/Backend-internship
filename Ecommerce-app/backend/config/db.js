import mongoose from "mongoose";

const Database = async () => {
  try {
    await mongoose.connect(`${process.env.Mongodb_URL}`);

    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

export default Database;
