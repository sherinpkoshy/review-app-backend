const express = require("express");
const { errorHandler } = require("./middlewares/error");
require("express-async-errors");
require("dotenv").config();
require("./db");
const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const movieRouter = require("./routes/movie");
const reviewRouter = require("./routes/review");
const adminRouter = require("./routes/admin");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);
app.use("/api/movie", movieRouter);
app.use("/api/admin", adminRouter);

app.use("/*", handleNotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
});
