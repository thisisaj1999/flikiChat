import React from "react";
import styles from "./Sidebar.module.css";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useCollapseStore } from "../../store";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

const items = [
	getItem("Dashboard", "/dashboard", <AppstoreOutlined />),
	getItem("Add New User", "/add-user", <AppstoreOutlined />),
];

const SideBar = () => {
	const navigate = useNavigate();

	const State = {
		Collapse: {
			isCollapsed: useCollapseStore((State) => State.collapseSidebar),
		},
	};

	const onClick = (e) => navigate(e.key);

	return (
		<div className={styles.SidebarMain}>
			<Menu
				style={{
					height: "100%",
				}}
				onClick={onClick}
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				mode="inline"
				items={items}
				inlineCollapsed={State.Collapse.isCollapsed}
			/>
		</div>
	);
};
export default SideBar;
