import React, { useState, useEffect } from "react";
import styles from "./Register.module.scss";

// ANTD
import { Button, Form, Input, Tooltip, Typography, Divider } from "antd";

// Hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";


// Other functions
import { getRandomColor } from "../../utils/other";

const index = () => {

	const { enqueueSnackbar } = useSnackbar();
	const location = useLocation();
	const navigate = useNavigate();

	const [isHovered, setIsHovered] = useState(false);


	const hoveredStyle = {
		color: getRandomColor(),
		transition: "all 0.3s ease-in-out",
	};

	const notHoveredStyle = {
		color: "black",
		transition: "all 1s ease-in-out",
	};

	const navigateToLogin = () => {
		navigate("/login");
	};

	const onFinish = async (values) => {
    console.log(values)
	};

	return (
		<div className={styles.AuthBgMain}>
			<div
				className={styles.AuthFormMain}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<h1 className={styles.AuthFormHeading}>
					Regis
					<span style={isHovered ? hoveredStyle : notHoveredStyle}>
						ter
					</span>
				</h1>
				<Form
					layout="vertical"
					style={{
						maxWidth: 600,
					}}
					onFinish={onFinish}
					autoComplete="on"
				>
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
								message:
									"Password must contain atlease 8 characters",
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
								message:
									"Password must contain atlease 8 characters",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("password") === value
									) {
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
			</div>
		</div>
	);
};

export default index;
