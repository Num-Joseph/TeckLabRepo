const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 2020;
/*const appRouter = require("./routes/index");

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use("/api", appRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json("Something whent wrong!");
  });

*/
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
