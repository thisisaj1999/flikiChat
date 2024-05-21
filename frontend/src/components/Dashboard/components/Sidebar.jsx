import React from "react";
import styles from "../Dashboard.module.scss";

import { Button, Avatar } from 'antd';

import Menu from '../../../assets/menu.svg'

const Sidebar = () => {
	return (
		<div className={styles.DashboardSidebar}>
			<div className={styles.SidebarGroups}>
				<div className={styles.SidebarHeader}>
					<Avatar
						style={{
							backgroundColor: "green",
							verticalAlign: "middle",
						}}
						size="medium"
						gap={0}
					>
						Y
					</Avatar>

					<Button type="text" shape="circle">
						<img src={Menu} alt="" width={20} />
					</Button>
				</div>

				<div className={styles.ListGroupMain}>
					<div className={styles.ListGroup}>
						<Avatar
							style={{
								backgroundColor: "#f56a00",
								verticalAlign: "middle",
							}}
							size="medium"
							gap={0}
						>
							A
						</Avatar>

						<div className={styles.GroupDetails}>
							<p>Test Group1</p>
						</div>
					</div>

					{/* <Divider style={{width: '100%', margin: '0px'}}/> */}

					<div className={styles.ListGroup}>
						<Avatar
							style={{
								backgroundColor: "#f56a00",
								verticalAlign: "middle",
							}}
							size="medium"
							gap={0}
						>
							A
						</Avatar>

						<div className={styles.GroupDetails}>
							<p>Test Group1</p>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.SidebarOptions}>
				<Button type="primary" block>
					Create
				</Button>
				<Button type="primary" block>
					Join
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
