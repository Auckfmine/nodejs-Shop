const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const exressValidator = require("express-validator");

const port = process.env.PORT || 8000;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const CategoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
require("dotenv").config();

//app

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(exressValidator());

//Routes middlewares

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", CategoryRoutes);
app.use("/api", productRoutes);

//DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected !"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//server

app.listen(port, () => {
  console.log(`app is runing on port ${port}`);
});
