const express = require("express");
const User = require("../db");
const zod = require("zod");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authMiddleware = require("../authMiddleware");

const signupSchema = zod.object({
	username: zod.string().email(),
	password: zod.string().minLength(5),
	firstName: zod.string(),
	password: zod.string(),
});

router.post("/signup", async (req, res) => {
	console.log("signup route hit");
	const body = req.body;
	const { success } = signupSchema.safeParse(body);
	if (!success) {
		return res.json({
			status: "error",
			message: "Email already taken / Incorrect inputs",
		});
	}

	const existingUser = await User.findOne({
		username: body.username,
	});

	if (existingUser._id) {
		return res.status(411).json({
			message: "Email already taken / Incorrect inputs",
		});
	}

	const dbUser = await User.create(body);
	const token = jwt.sign(
		{
			userId: dbUser._id,
		},
		JWT_SECRET
	);
	res.json({
		message: "User created successfully",
		token: token,
	});
});

const signinSchema = zod.object({
	username: zod.string().email(),
	password: zod.string().minLength(5),
});

router.post("/signin", async (req, res) => {
	console.log("signin route hit");
	const body = req.body;

	// frist step is to validdate
	const { success } = signinSchema.safeParse(body);
	if (!success) {
		return res.status(411).json({
			message: "Incorrect inputs",
		});
	}

	// second step is to check if the user exists
	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password,
	});

	if (user) {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			JWT_SECRET
		);

		res.json({
			token: token,
		});
		return;
	}

	res.status(411).json({
		message: "Error while loggin in",
	});
});

const updateDb = zod.object({
	password: zod.string().minLength(5),
	firstName: zod.string(),
	lastName: zod.string(),
});

router.put("/", authMiddleware, async (req, res) => {
	console.log("update route hit");
	const body = req.body;
	const { success } = updateDb.safeParse(body);

	try {
		if (!success) {
			return res.status(411).json({
				message: "Error while updating information",
			});
		}

		await User.updateOne(
			{
				_id: req.userId,
			},
			req.body
		);

		res.json({
			message: "Updated successfully",
		});
	} catch (err) {
		return res.status(404).json({
			message: "error in udpating",
		});
	}
});

router.get("/bulk", authMiddleware, async (req, res) => {
	console.log("bulk route hit");
	const filter = req.query.filter || "";

	const users = await User.find({
		$or: [
			{
				firstName: {
					$regex: filter,
				},
			},
			{
				lastName: {
					$regex: filter,
				},
			},
		],
	});

	res.json({
		user: users.map((user) => ({
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			_id: user._id,
		})),
	});
});

module.exports = router;
