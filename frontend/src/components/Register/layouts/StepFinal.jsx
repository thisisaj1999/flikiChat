


import React, { useState, useEffect, useCallback } from "react";
import styles from "../Register.module.scss";

// ANTD
import { Button, Form, Input, Tooltip, Typography, Avatar } from "antd";

// Hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";


const index = ({ form, handleBack, handleConfirm }) => {

	const navigate = useNavigate();

  const navigateToLogin = () => {
		navigate("/login");
	};

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

	const onFinish = (values) => {
		handleConfirm(values);
	};

	return (
		<Form form={form} onFinish={onFinish} layout="vertical" autoComplete="on">
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
						onClick={handleBack}
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
