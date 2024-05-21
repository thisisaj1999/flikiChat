import React from "react";
import { Button, Form, Input } from "antd";
import { addUser } from "../../services/utils";
import { styles } from "./AddUser.module.css";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";


const AddUser = () => {
	const navigate = useNavigate();

	const onFinish = async (values) => {
		const data = await addUser(values);
		console.log("Success:", values);
		if (data.status === 404) {
			enqueueSnackbar(data?.message, { variant: "error" });
		}
	
		if (data.status === 200) {
			enqueueSnackbar(data?.message, { variant: "success" });
			setTimeout(() => {
				navigate("/dashboard");
			}, 4000);
		}
	};
	
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		enqueueSnackbar(`Something went wrong, check logs`, { variant: "error" });
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
			<h1 style={{ textAlign: "center", margin: "2rem" }}>Add User</h1>
			{/* firstName */}
			<Form.Item
				label="First Name"
				name="fName"
				rules={[
					{
						required: true,
						message: "Please input your First Name!",
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* lastName */}
			<Form.Item
				label="Last Name"
				name="lName"
				rules={[
					{
						required: true,
						message: "Please input your Last Name",
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* email */}
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{
						required: true,
						message: "Please input your Email",
					},
				]}
			>
				<Input type="email" />
			</Form.Item>

			{/* phone */}
			<Form.Item
				label="Phone"
				name="phone"
				rules={[
					{
						required: true,
						message: "Please input your Phone",
					},
				]}
			>
				<Input type="number" maxLength={12} />
			</Form.Item>

			{/* image URL */}
			<Form.Item
				label="Image URL"
				name="image"
				rules={[
					{
						required: true,
						message: "Please input your Image URL",
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* add btn */}
			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Add
				</Button>
			</Form.Item>
		</Form>
	);
};
export default AddUser;
