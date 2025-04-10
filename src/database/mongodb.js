const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

let connectionString;

if(process.env.MONGO_SERVER === "local") {
  connectionString = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
}
if(process.env.MONGO_SERVER === "atlas") {
  connectionString = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`;
}

const connectToDatabase = async () => {
  await mongoose.connect(connectionString);
};

module.exports = connectToDatabase;
