import { connect } from "mongoose";
const connectDatabase = async () => {
  try {
    await connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};

export default connectDatabase;
