require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((e) => {
    console.log(`Unable to connect to the server : ${e}`);
  });

app.use(express.json());
app.use(cors());

const urlRouter = require("./routes/urls");
app.use("/url", urlRouter);

app.listen(3000, () => console.log("Server Started"));
