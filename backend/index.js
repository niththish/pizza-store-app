const express = require("express");
const databaseConnection = require("./config/database");
require("dotenv").config();

const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const pizzaRouter = require("./routes/pizza");
const ordersRouter = require("./routes/orders");

const authVerification = require("./middleware/verifyToken");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/user/cart", cartRouter);
app.use("/api/pizzas", authVerification, pizzaRouter);
app.use("/api/orders", authVerification, ordersRouter);

const startApplication = async () => {
  await databaseConnection(process.env.DATABASEURL);
  console.log("connected to database");
  app.listen(5000, () => {
    console.log("server started...");
  });
};

startApplication();