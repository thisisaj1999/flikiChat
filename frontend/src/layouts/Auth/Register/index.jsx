import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
const onFinish = (values) => {
	console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};
const Register = () => {
	const navigate = useNavigate();

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
			<h1>Register</h1>
			<Form.Item
				label="Username"
				name="username"
				rules={[
					{
						required: true,
						message: "Please input your username!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
			<Button type="primary">
				Google
			</Button>
			<Button type="primary">
				Twitter
			</Button>
			<p
				onClick={() => navigate("/login")}
				style={{ cursor: "pointer", fontWeight: "600" }}
			>
				Login
			</p>
		</Form>
	);
};
export default Register;
