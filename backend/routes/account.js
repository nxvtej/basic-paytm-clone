const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../authMiddleware");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
	const account = await Account.findOne({
		userId: req.userId,
	});

	res.json({
		balance: account.balance,
	});
});
router.post("/transfer", authMiddleware, async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	const { amount, to } = req.body;

	try {
		// Find sender's account
		const account = await Account.findOne({
			userId: req.userId,
		}).session(session);

		// Handle case where sender's account is not found
		if (!account) {
			await session.abortTransaction();
			session.endSession();
			return res.status(404).json({
				message: "Sender's account not found",
			});
		}

		// Check if sender has sufficient balance
		if (account.balance < amount) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({
				message: "Insufficient balance",
			});
		}

		// Find recipient's account
		const toAccount = await Account.findOne({
			userId: to,
		}).session(session);

		// Handle case where recipient's account is not found
		if (!toAccount) {
			await session.abortTransaction();
			session.endSession();
			return res.status(404).json({
				message: "Recipient's account not found",
			});
		}

		// Perform the transfer
		account.balance -= amount;
		toAccount.balance += amount;

		// Save both account updates
		await account.save();
		await toAccount.save();

		await session.commitTransaction();
		session.endSession();

		res.json({
			message: "Transfer successful",
		});
	} catch (error) {
		console.error("Error during transfer:", error);
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({
			message: "Internal server error",
		});
	}
});
module.exports = router;
