const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();
app.use(cors());

const mainRouter = require("./routes/index");

app.use(express.json());
const router = express.Router();
router.get("/demo", (req, res) => {
	console.log("hi there from demo hit");
});
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
	console.log(`server runnig at ${PORT}:`);
});
