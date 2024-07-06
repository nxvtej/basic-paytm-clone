const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://nxvtej:Bqwl7q1N8WlrlMw4@cluster0.ccslg3a.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		reuired: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	firstName: {
		type: String,
		require: true,
		trim: true,
		maxLength: 30,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 30,
	},
});

const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	balance: {
		type: Number,
		required: true,
	},
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
	User,
	Account,
};
