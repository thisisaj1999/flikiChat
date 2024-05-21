import React, { useState } from "react";
import styles from "./Dashboard.module.scss";

import { Divider } from "antd";

import Sidebar from "./components/Sidebar";
import MainPage from "./components/MainPage";

const index = () => {
	const [value, setValue] = useState("");

	return (
		<div className={styles.DashboardBgMain}>
			<div className={styles.DashboardChatMain}>
				<Sidebar />

				<Divider
					type="vertical"
					style={{ height: "100%", margin: "0px" }}
				/>

				<MainPage />
			</div>
		</div>
	);
};

export default index;
