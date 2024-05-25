import React, { useState } from "react";
import styles from "./Login.module.scss";

// ANTD
import { Button, Form, Input, Tooltip, Typography } from "antd";

// Hooks
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useAuth } from "../../utils/AuthProvider";

// Other utilities funtcions
import { getRandomColor } from "../../utils/other";


const index = () => {
	const Auth = useAuth()

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()

	const [loadingResponse, setLoadingResponse] = useState(false);

	// Layout or UI
	const [isHovered, setIsHovered] = useState(false);

	// UI
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

	//  Button Handlers
	const onFinish = async (values) => {
		setLoadingResponse(true)
    const response = await Auth.userLogin(values)
		if (response?.status === 200) {
			setLoadingResponse(false)
			enqueueSnackbar("Log In successfull", { variant: 'success' });
		}else{
			setLoadingResponse(false)
			enqueueSnackbar(response?.message, { variant: 'info' });
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
						className={styles.LoginEmail}
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
						className={styles.LoginPassword}
					>
						<Input.Password style={{ height: "40px" }} />
					</Form.Item>

					<Form.Item>
						<Button
							className={styles.AuthFormSubmitBtn}
							type="primary"
							htmlType="submit"
							loading={loadingResponse}
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
