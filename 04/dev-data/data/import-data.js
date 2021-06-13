const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");

dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

const DB =
  "mongodb+srv://Salmaan:123454678@cluster0.jvzsm.mongodb.net/natours?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB connection successful!"));

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
// );

// // importing data
// const importData = async () => {
//   try {
//     await Tour.create(tours);
//     console.log("data successfully loaded");
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// // delete all data
// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();

//     console.log("Data successfully deleted");
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// console.log("process running...");

// if (process.argv[2] === "--import ") {
//   importData();
// }

// if (process.argv[2] === "--delete") {
//   deleteData();
// }

// console.log(process.argv);

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
