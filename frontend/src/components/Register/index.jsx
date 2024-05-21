import React, { useState, useEffect } from "react";
import styles from "./Register.module.scss";

// ANTD
import { Button, Form, Input, Tooltip, Typography, Avatar } from "antd";

// Hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";


// Other functions
import { getRandomColor } from "../../utils/other";

const index = () => {
	const [layout, setLayout] = useState(1)
	const { enqueueSnackbar } = useSnackbar();
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

	// temp
	const renderDivs = () => {
    const divs = [];

	

	for(let i = 0; i < 100; i++){
		divs.push(
			<div className={styles.GroupInfoHeader}>
								<Avatar
									style={{
										backgroundColor: "dodgerblue",
										verticalAlign: "middle",
									}}
									size={70}
									gap={0}
								>
									G
								</Avatar>
								<p>Test Group</p>
							</div>
		)
	}

	return divs
}
	// temp

	return (
		<div className={styles.AuthBgMain}>
			<div
				className={styles.AuthFormMain}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={layout === 0 ? {width: '25rem'} : {width: '45rem'}}
			>
				<h1 className={styles.AuthFormHeading}>
					Regis
					<span style={isHovered ? hoveredStyle : notHoveredStyle}>
						ter
					</span>
				</h1>
				<Form
					layout="vertical"
					onFinish={onFinish}
					autoComplete="on"
				>
					{layout === 0 ? <>
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
									onClick={(e) => setLayout(1)}
								>
									Next
								</Button>
							</Form.Item>
						</div>
					</> : 
					<>
						<Form.Item
							label="Name"
							name="name"
							rules={[
								{
									required: true,
									message: "Please input your Name",
								},
							]}
						>
							<Input
								style={{ height: "40px" }}
								type="text"
								placeholder="John Doe"
							/>
						</Form.Item>
						
						<p className={styles.GroupListHeading}>Join Groups</p>
						<div className={styles.GroupsList}>
							{/* <div className={styles.GroupInfoHeader}>
								<Avatar
									style={{
										backgroundColor: "dodgerblue",
										verticalAlign: "middle",
									}}
									size={70}
									gap={0}
								>
									G
								</Avatar>
								<p>Test Group</p>
							</div> */}
								 {renderDivs()}
							
						</div>

						<div className={styles.AuthFormStepsSubmitBtns}>
							<Form.Item>
								<Button
									type="primary"
									className={styles.AuthFormSubmitBtn}
									onClick={(e) => setLayout(0)}
								>
									Back
								</Button>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									className={styles.AuthFormSubmitBtn}
									htmlType="submit"
								>
									Finish
								</Button>
							</Form.Item>
						</div>
					</>
					}

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
