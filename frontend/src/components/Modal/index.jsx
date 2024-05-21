import React from "react";
import { Button, Form, Input, Avatar, Modal } from "antd";
import styles from "./Modal.module.scss";

import { useGlobalStore } from "../../utils/store";

const index = () => {
	const State = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.checkModal),
		},
	};

	const Update = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.setCheckModal),
		},
	};

	const handleOk = () => {
		Update.GlobalStore.checkModal({
			isOpen: false,
			layout: null,
		});
	};

	const handleCancel = () => {
		Update.GlobalStore.checkModal({
			isOpen: false,
			layout: null,
		});
	};

	const onFinish = async (values) => {
		console.log(values);
	};

	const renderDivs = (val) => {
		const divs = [];
		for (let i = 0; i < 100; i++) {
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
					<p>{`Test ${val} ${i}`}</p>
				</div>
			);
		}
		return divs;
	};

	return (
		<Modal
			title={
				State.GlobalStore.checkModal?.layout === 0
					? "Join Groups"
					: "Create Group"
			}
			open={State.GlobalStore.checkModal.isOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={() => null}
			width={800}
			className={styles.ModalMain}
		>
			{State.GlobalStore.checkModal?.layout === 1 ? (
				<Form layout="vertical" onFinish={onFinish} autoComplete="on">
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

					<p className={styles.GroupListHeading}>Add Participants</p>
					<div className={styles.GroupsList} style={{maxHeight: '18rem'}}>
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
						{renderDivs("User")}
					</div>

					<div className={styles.AuthFormStepsSubmitBtns}>
						<Button
							type="primary"
							className={styles.AuthFormSubmitBtn}
							onClick={(e) => setLayout(0)}
						>
							Back
						</Button>

						<Button
							type="primary"
							className={styles.AuthFormSubmitBtn}
							htmlType="submit"
						>
							Finish
						</Button>
					</div>
				</Form>
			) : (
				<Form layout="vertical" onFinish={onFinish} autoComplete="on">
					<div className={styles.GroupsList} style={{maxHeight: '20rem'}}>
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
						{renderDivs("Group")}
					</div>

					<div className={styles.AuthFormStepsSubmitBtns}>
						<div></div>
						{/* <Button
							type="primary"
							className={styles.AuthFormSubmitBtn}
							onClick={(e) => setLayout(0)}
						>
							Back
						</Button> */}

						<Button
							type="primary"
							className={styles.AuthFormSubmitBtn}
							htmlType="submit"
						>
							Join
						</Button>
					</div>
				</Form>
			)}
		</Modal>
	);
};
export default index;
