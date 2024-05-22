import React from "react";
import { Avatar, Divider } from "antd";
import styles from "./ProfileCards.module.scss";

const index = ({ avatarSrc, groupName }) => {
	return (
		<>
			<div className={styles.ListGroup}>
				{avatarSrc ? (
					<Avatar
						style={{
							backgroundColor: "#f56a00",
							verticalAlign: "middle",
						}}
						size="medium"
						gap={0}
						src={`${avatarSrc}`}
					/>
				) : (
					<Avatar
						style={{
							backgroundColor: "#f56a00",
							verticalAlign: "middle",
						}}
						size="medium"
						gap={0}
					>
						{groupName[0].toUpperCase()}
					</Avatar>
				)}

				<div className={styles.GroupDetails}>
					<p>{groupName}</p>
				</div>
			</div>
			<Divider style={{ width: "100%", margin: "0px" }} />
		</>
	);
};

export default index;
