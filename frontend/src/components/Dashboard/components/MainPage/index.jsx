import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";

// ANTD
import { Divider, Input, Button, Avatar, Form } from "antd";
const { TextArea } = Input;

// Hooks
import { useChatScroll } from '../../../../hooks/useChatScroll'
import { useGlobalStore } from "../../../../utils/store";

// SVG or Images
import Send from "../../../../assets/send.svg";
import BackgrounImg from '../../../../assets/background.png'
import EncryptionLock from '../../../../assets/encryption.svg'

// Other utilities funtcions
import { convertToReadableTime, formatUserNames } from "../../../../utils/other";

// Socket
import socket from "../../../../utils/socket";


const index = () => {
	const [form] = Form.useForm();
	const [showMessages, setShowMessages] = useState([]);
	const [groupDetails, setGroupDetails] = useState(null)
	const ref = useChatScroll(showMessages)
	
	const Update = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore(
				(State) => State.setIsGroupInfoOpen
			),
		},
	};

	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
			userDetails: useGlobalStore((State) => State.userDetails),
			joinedGroupDetails: useGlobalStore((State) => State.joinedGroupDetails),
			userGroups: useGlobalStore((State) => State.userGroups),
		},
	};

	useEffect(() => {
		const handleNewMessage = (data) => {
			setShowMessages((prevMessages) => [...data, ...prevMessages]);
		};

		socket.on("message:new", handleNewMessage);

		return () => {
				socket.off("message:new", handleNewMessage);
		};
	}, [socket]);


	useEffect(() => {
		setShowMessages(State.GlobalStore.joinedGroupDetails?.messages)
	},[State.GlobalStore.joinedGroupDetails])

	const handleOpenGroupInfo = () => Update.GlobalStore.isGroupInfoOpen(true);

	// Layout or UI
	const GroupOpenInfoWidth = {
		width: "calc(100% - 30rem)",
		transition: "width 0.3s ease-in-out",
	};

	const GroupCloseInfoWidth = {
		width: "calc(100% - 15rem)",
		transition: "width 0.3s ease-out",
	};

	//  Button Handlers
	const onFinish = (values) => {
		socket.emit('message:create', {
			message: values.message,
			sender_id: State.GlobalStore.userDetails?.user?.id,
			group_id: State.GlobalStore.userDetails?.joinedGroup,
			// socketID: socket.id,
		});
		form.resetFields();
	};

	useEffect(() => {
		setGroupDetails(null)
		const groupId = State.GlobalStore.userDetails?.joinedGroup
		const groupsArray = State.GlobalStore.userGroups
		const groupDetail = groupsArray?.find(group => group?.group_id === groupId);
		setGroupDetails(groupDetail)
	},[State.GlobalStore.userDetails?.joinedGroup])


	return (
		<div
			className={styles.DashboardMainPage}
			style={
				State.GlobalStore.isGroupInfoOpen
					? GroupOpenInfoWidth
					: GroupCloseInfoWidth
			}
		>
			{
				State.GlobalStore.userDetails?.joinedGroup ? 
				<>
					<div
						className={styles.MainPageHeading}
						onClick={handleOpenGroupInfo}
					>
						{groupDetails?.profile_image_url ? (
							<Avatar
								style={{
									backgroundColor: "black",
									verticalAlign: "middle",
								}}
								size="medium"
								gap={0}
								src={`${groupDetails?.profile_image_url}`}
							/>
						) : (
							<Avatar
								style={{
									backgroundColor: "black",
									verticalAlign: "middle",
								}}
								size="medium"
								gap={0}
							>
								{groupDetails?.group_name && groupDetails?.group_name[0].toUpperCase()}
							</Avatar>
						)}
						<div className={styles.GroupDetails}>
							<p className={styles.GroupName}>{groupDetails?.group_name}</p>
							<p className={styles.GroupParticipantName}>
								{formatUserNames(State.GlobalStore?.joinedGroupDetails?.members)}
							</p>
						</div>
					</div>

					<Divider style={{ width: "100%", margin: "0px" }} />

					<div className={styles.MainPageContent} ref={ref}>
						{showMessages?.slice()?.reverse()?.map(message => (
							<div key={message?.id} className={`${styles.ChatBubble} ${message?.sender_id === State.GlobalStore.userDetails?.user?.id ? styles.ChatBubbleRight : styles.ChatBubbleLeft}`}>
								<div className={styles.ChatText}>
									<p>{message?.message}</p>
								</div>
								<div className={styles.MessageDetails}>
									<p>{message?.sender_id === State.GlobalStore.userDetails?.user?.id ? "You" : message?.sender_name}</p>
									<p>{convertToReadableTime(message?.created_at)}</p>
								</div>
							</div>
							)
						)}
					</div>

					<Divider style={{ width: "100%", margin: "0px" }} />

					<Form
						layout="vertical"
						form={form}
						onFinish={onFinish}
						className={styles.MainPageFooter}
					>
						<Form.Item
							name="message"
							className={styles.TextHolder}
						>
							<TextArea
								className={styles.TextAreaInput}
								placeholder="Type here so engage in the chat"
								autoSize
							/>
						</Form.Item>
						
						<div className={styles.SendChatBtn}>
							<Button type="primary" shape="circle" htmlType="submit">
								<img src={Send} alt="" width={20} />
							</Button>
						</div>
					</Form>
				</>
				:
				<div className={styles.NotSelectedGroup}>
					<img src={BackgrounImg} alt="BackgrounImg" />
					<p className={styles.NotSelectedHeading}>Welcome to Fliki Chat</p>
					<div className={styles.NotSelectedSubHeading}>
						<img src={EncryptionLock} alt="EncryptionLock" width={20}/>
						<p>Your personal messages are end-to-end encrypted</p>
					</div>
				</div>
			}
			
		</div>
	);
};

export default index;
