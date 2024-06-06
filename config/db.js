/*const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const db = await mongoose.createConnection(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;*/
require('dotenv').config();
const mongoose = require("mongoose");
const colors = require("colors");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    //console.log('MONGO_URL:', process.env.MONGO_URL);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
