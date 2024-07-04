const express = require("express");
const cors = require("cors");
const PORT = 3001;
const app = express();
app.use(cors());

const mainRouter = require("./routes/index");

app.use(express.json());

app.use("/api/vi", mainRouter);
app.listen((PORt) => {
	console.log("server runnig at 3000:");
});
