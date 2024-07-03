const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const mainRouter = require("./routes/index");

app.use(express.json());

app.use("/api/vi", mainRouter);
app.listen(3000);
