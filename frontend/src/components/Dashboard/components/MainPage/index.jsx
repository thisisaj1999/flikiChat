import React from "react";
import styles from "./MainPage.module.scss";

import { Divider, Input, Button, Avatar} from 'antd';
const { TextArea } = Input;

import Send from '../../../../assets/send.svg'

import { useGlobalStore } from "../../../../utils/store";

const index = () => {

	const Update = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.setIsGroupInfoOpen),
		},
	};

	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
		},
	};

	const handleOpenGroupInfo = () => Update.GlobalStore.isGroupInfoOpen(true)

	const GroupOpenInfoWidth = {
		width: "calc(100% - 30rem)",
		transition: "width 0.3s ease-in-out",
	};

	const GroupCloseInfoWidth = {
		width: "calc(100% - 15rem)",
		transition: "width 0.3s ease-out",
	};
	
	return (
		<div className={styles.DashboardMainPage} style={State.GlobalStore.isGroupInfoOpen ? GroupOpenInfoWidth : GroupCloseInfoWidth}>
			<div className={styles.MainPageHeading} onClick={handleOpenGroupInfo}>
				<Avatar
					style={{
						backgroundColor: "dodgerblue",
						verticalAlign: "middle",
					}}
					size="medium"
					gap={0}
				>
					G
				</Avatar>
				<div className={styles.GroupDetails}>
					<p className={styles.GroupName}>Test Group</p>
					<p className={styles.GroupParticipantName}>Test, Test, Test</p>
				</div>
			</div>

			<Divider style={{ width: "100%", margin: "0px" }} />

			<div className={styles.MainPageContent}>
			{/* Dummy Chats */}
				<div className={`${styles.ChatBubble} ${styles.ChatBubbleLeft}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>5:34 pm</p>
				</div>

				<div className={`${styles.ChatBubble} ${styles.ChatBubbleRight}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>5:36 pm</p>
				</div>
				
				<div className={`${styles.ChatBubble} ${styles.ChatBubbleLeft}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>5:36 pm</p>
				</div>

				<div className={`${styles.ChatBubble} ${styles.ChatBubbleRight}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>5:40 pm</p>
				</div>
				
				<div className={`${styles.ChatBubble} ${styles.ChatBubbleLeft}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>6:04 pm</p>
				</div>

				<div className={`${styles.ChatBubble} ${styles.ChatBubbleRight}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>6:10 pm</p>
				</div>
				
				<div className={`${styles.ChatBubble} ${styles.ChatBubbleLeft}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>6:04 pm</p>
				</div>

				<div className={`${styles.ChatBubble} ${styles.ChatBubbleRight}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>6:10 pm</p>
				</div>
				
				<div className={`${styles.ChatBubble} ${styles.ChatBubbleLeft}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>6:04 pm</p>
				</div>

				<div className={`${styles.ChatBubble} ${styles.ChatBubbleRight}`}>
					<div className={styles.ChatText}>
						<p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
					</div>
					<p className={styles.TimeStamp}>6:10 pm</p>
				</div>

			</div>

			<Divider style={{ width: "100%", margin: "0px" }} />

			<div className={styles.MainPageFooter}>
				<div className={styles.TextHolder}>
					<TextArea
						className={styles.TextAreaInput}
						placeholder="Type here so engage in the chat"
						autoSize
					/>
				</div>
				<div className={styles.SendChatBtn}>
					<Button type="primary" shape="circle">
						<img src={Send} alt="" width={20} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default index;
