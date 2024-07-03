const express = require("express");
const zod = require("zod");
const router = express.Router();

router.post("/signup", (req, res) => {
	console.log("signup route hit");
	const body = req.body;
	const { success } = signupSchema.safeParse(body);
	if (!success) {
		return res.json({
			status: "error",
			message: "Email already taken / Incorrect inputs",
		});
	}

	const user = User.findOne({
		username: body.username,
	});
});

module.exports = router;
