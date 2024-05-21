import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { updateUser } from "../../services/utils";
import { styles } from "./UpdateUser.module.css";
import { enqueueSnackbar } from "notistack";
import { useAllUsersStore } from "../../store";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
	const navigate = useNavigate();

	const State = {
		Users: {
			updateUser: useAllUsersStore((State) => State.updateUser),
		},
	};

	const onFinish = async (data) => {
		const userId = State.Users.updateUser.id;

		if (Object.values(data).every((data) => data === undefined)) {
			enqueueSnackbar(`No values provied for update`, { variant: "warning" });
			return;
		}
		
		const filteredValues = Object.entries(data).reduce((acc, [key, value]) => {
			if (value !== undefined) {
			  acc[key] = value;
			}
			return acc;
		}, {});

		const updateUserData = await updateUser(filteredValues, userId);
		if (updateUserData.status === 404) {
			enqueueSnackbar(updateUserData?.message, { variant: "error" });
		}

		if (updateUserData.status === 200) {
			enqueueSnackbar(updateUserData?.message, { variant: "success" });
			setTimeout(() => {navigate('/dashboard')},4000)
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		enqueueSnackbar(`Something went wrong, check logs`, {
			variant: "error",
		});
	};

	return (
		<Form
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{
				maxWidth: 600,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<h1 style={{ textAlign: "center", margin: "2rem" }}>Update User</h1>
			{/* firstName */}
			<Form.Item
				label="First Name"
				name="fName"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: "Please input your First Name!",
				// 	},
				// ]}
			>
				<Input placeholder={State.Users.updateUser.fName} />
			</Form.Item>

			{/* lastName */}
			<Form.Item
				label="Last Name"
				name="lName"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: "Please input your Last Name",
				// 	},
				// ]}
			>
				<Input placeholder={State.Users.updateUser.lName} />
			</Form.Item>

			{/* email */}
			<Form.Item
				label="Email"
				name="email"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: "Please input your Email",
				// 	},
				// ]}
			>
				<Input
					type="email"
					placeholder={State.Users.updateUser.email}
				/>
			</Form.Item>

			{/* phone */}
			<Form.Item
				label="Phone"
				name="phone"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: "Please input your Phone",
				// 	},
				// ]}
			>
				<Input
					type="number"
					maxLength={12}
					placeholder={State.Users.updateUser.phone}
				/>
			</Form.Item>

			{/* image URL */}
			<Form.Item
				label="Image URL"
				name="image"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: "Please input your Image URL",
				// 	},
				// ]}
			>
				<Input placeholder={State.Users.updateUser.image} />
			</Form.Item>

			{/* add btn */}
			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Update
				</Button>
				<Button
					type="primary"
					onClick={() => {
						navigate("/");
					}}
					htmlType="submit"
				>
					Back
				</Button>
			</Form.Item>
		</Form>
	);
};
export default UpdateUser;
