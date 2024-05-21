import React from "react";
import { Avatar, Divider } from "antd";
import styles from './ProfileCards.module.scss'

const index = () => {
	return (
		<>
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
			<Divider style={{width: '100%', margin: '0px'}}/>
		</>
	);
};

export default index;
