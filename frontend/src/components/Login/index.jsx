import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";

// ANTD
import { Button, Form, Input, Tooltip, Typography, Divider } from "antd";

// Hooks
import { useNavigate, useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'


import { getRandomColor } from "../../utils/other";

import { userLogin } from "../../utils/requests"


const index = () => {

  const { enqueueSnackbar } = useSnackbar();
	const location = useLocation()
  const navigate = useNavigate()

	const [isHovered, setIsHovered] = useState(false);

	const hoveredStyle = {
		color: getRandomColor(),
		transition: "all 0.3s ease-in-out",
	};

	const notHoveredStyle = {
		color: "black",
		transition: "all 1s ease-in-out",
	};

	const navigateToRegister = () => {
		navigate("/register");	
	}

	const onFinish = async (values) => {
    const response = await userLogin(values)
		if (response?.status === 200) {
			console.log(response)
			navigate("/dashboard");
		}
  };

	return (
		<div className={styles.AuthBgMain}>
			<div
				className={styles.AuthFormMain}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<h1 className={styles.AuthFormHeading}>
					Log{" "}
					<span style={isHovered ? hoveredStyle : notHoveredStyle}>
						In
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
						]}
					>
						<Input.Password style={{ height: "40px" }} />
					</Form.Item>

					<Form.Item>
						<Button
							className={styles.AuthFormSubmitBtn}
							type="primary"
							htmlType="submit"
						>
							Sign In
						</Button>
					</Form.Item>

					<div className={styles.AuthFormLink}>
						<Tooltip title="Sign Up">
							<Typography.Link onClick={navigateToRegister}>
								{"You don't have an account?"}
							</Typography.Link>
						</Tooltip>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default index;
