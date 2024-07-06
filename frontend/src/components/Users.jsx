/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		const IncommingData = axios
			.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
			.then((response) => setUsers(response.data.user));

		console.log(IncommingData);
	}, [filter]);
	return (
		<div>
			<div>
				<input
					onChange={(e) => {
						setFilter(e.target.value);
					}}
					type='text'
					placeholder='search'
					className='w-full px-2 py-1 border rounded border-slate-300 '
				/>
			</div>

			<div>
				{users.map((user) => (
					<User user={user} />
				))}
			</div>
		</div>
	);
};

function User({ user }) {
	const navigate = useNavigate();

	return (
		<div className='flex justify-between'>
			<div className='flex'>
				<div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
					<div className='flex flex-col justify-center h-full text-xl'>
						{user.firstName[0]}
					</div>
				</div>
				<div className='flex flex-col justify-center h-ful'>
					<div>
						{user.firstName} {user.lastName}
					</div>
				</div>
			</div>

			<div className='flex flex-col justify-center h-ful'>
				<Button
					onClick={(e) => {
						navigate("/send?id=" + user._id + "&name=" + user.firstName);
					}}
					label={"Send Money"}
				/>
			</div>
		</div>
	);
}
