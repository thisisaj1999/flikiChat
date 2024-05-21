import styles from "./NavBar.module.css";
import { Button } from "antd";
import { useCollapseStore } from "../../store";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";


const NavBar = () => {

    const State = {
		Collapse: {
			isCollapsed: useCollapseStore((State) => State.collapseSidebar),
		},
	};

	const Update = {
		Collapse: {
			Handler: useCollapseStore((State) => State.collapseHandler),
		},
	};

	return (
		<div className={styles.MainPanel}>
			<Button
				type="primary"
				onClick={Update.Collapse.Handler}
				className={styles.CollapseButton}

			>
				{State.Collapse.isCollapsed ? (
					<MenuUnfoldOutlined />
				) : (
					<MenuFoldOutlined />
				)}
			</Button>
		</div>
	);
};

export default NavBar;
