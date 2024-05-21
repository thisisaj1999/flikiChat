import React, { useState } from "react";
import styles from "../Dashboard.module.scss";

import { Divider, Input, Button, Avatar} from 'antd';
const { TextArea } = Input;

import Send from '../../../assets/send.svg'


const MainPage = () => {

	const [value, setValue] = useState('');
	
	return (
		<div className={styles.DashboardMainPage}>
			<div className={styles.MainPageHeading}>
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

export default MainPage;
