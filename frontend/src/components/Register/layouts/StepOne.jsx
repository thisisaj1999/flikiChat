import React from "react";
import styles from "../Register.module.scss";

// ANTD
import { Button, Form, Input, Tooltip, Typography } from "antd";

// Hooks
import { useNavigate } from "react-router-dom";


const index = ({ form, handleNext }) => {

	// Navigation
	const navigate = useNavigate();

	const navigateToLogin = () => {
		navigate("/login");
	};

	// Next Btn Handler
	const onFinish = (values) => {
		handleNext(values);
	};

	return (
		<Form onFinish={onFinish} form={form} layout="vertical" autoComplete="on">
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{
						type: "email",
						message: "The input is not valid Email",
					},
					{
						required: true,
						message: "Please input your Email",
					},
				]}
			>
				<Input
					style={{ height: "40px" }}
					type="email"
					placeholder="johndoe@email.com"
				/>
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
					{
						min: 8,
						message: "Password must contain atlease 8 characters",
					},
				]}
				hasFeedback
			>
				<Input.Password style={{ height: "40px" }} />
			</Form.Item>

			<Form.Item
				label="Confirm password"
				name="confirm"
				dependencies={["password"]}
				rules={[
					{
						required: true,
						message: "Please confirm your password!",
					},
					{
						min: 8,
						message: "Password must contain atlease 8 characters",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error(
									"The new password that you entered do not match!"
								)
							);
						},
					}),
				]}
			>
				<Input.Password style={{ height: "40px" }} />
			</Form.Item>

			<div className={styles.AuthFormStepsSubmitBtns}>
				<Form.Item>
					<Button
						type="primary"
						className={styles.AuthFormSubmitBtn}
						htmlType="submit"
					>
						Next
					</Button>
				</Form.Item>
			</div>

			<div className={styles.AuthFormLink}>
				<Tooltip title="Log In">
					<Typography.Link onClick={navigateToLogin}>
						You already have an account ?
					</Typography.Link>
				</Tooltip>
			</div>
		</Form>
	);
};

export default index;
