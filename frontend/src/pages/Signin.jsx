/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";

export const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div>
			<Heading label={"SignIn"} />
			<SubHeading label={"enter you crendetaisl"} />

			<InputBox
				label={"Email"}
				onChange={(e) => {
					setUsername(e.target.value);
				}}
				placeholder={"nav@gmail.com"}
			/>

			<InputBox
				label={"Password"}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				placeholder={"sinner"}
			/>

			{/* <Button
				label={"Signin"}
				onClick={() => {
					// await axios.get()
				}}
			/> */}
		</div>
	);
};
