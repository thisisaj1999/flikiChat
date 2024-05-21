import React from "react";
import styles from "./Dashboard.module.scss";

import { Divider } from 'antd';


const index = () => {
	return (
		<div className={styles.DashboardBgMain}>
			<div className={styles.DashboardChatMain}>
				<div className={styles.DashboardSidebar}>Sidebar</div>
				<Divider type="vertical" style={{height: '100%', margin: '0px'}}/>
				<div className={styles.DashboardMainPage}>
					<div className={styles.MainPageHeading}>
						<p className={styles.GroupName}>Test Group</p>
						<p className={styles.GroupParticipantName}>Test, Test, Test</p>
					</div>
					<Divider style={{width: '100%', margin: '0px'}}/>
					<div className={styles.MainPageContent}>
						chats
					</div>
				</div>
			</div>
		</div>
	);
};

export default index;
