import React, { useState } from "react";
import styles from "./Dashboard.module.scss";

import { Divider } from "antd";

import Sidebar from "./components/Sidebar";
import MainPage from "./components/MainPage";
import GroupInfo from "./components/GroupInfo";

import { useGlobalStore } from "../../utils/store";

const index = () => {

	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
		},
	};


	return (
		<div className={styles.DashboardBgMain}>
			<div className={styles.DashboardChatMain}>
				<Sidebar />

				<Divider
					type="vertical"
					style={{ height: "100%", margin: "0px" }}
				/>

				<MainPage />

				{State.GlobalStore.isGroupInfoOpen && (
					<>
						<Divider
							type="vertical"
							style={{ height: "100%", margin: "0px" }}
						/>

						<GroupInfo />
					</>
				)}
			</div>
		</div>
	);
};

export default index;
