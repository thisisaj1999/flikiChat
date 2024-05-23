import React from "react";
import { Avatar, Divider } from "antd";
import styles from "./ProfileCards.module.scss";
import { useGlobalStore } from "../../utils/store";
import socket from "../../utils/socket";

const index = ({ avatarSrc, groupName, groupId }) => {

	const Update = {
		GlobalStore: {
			userDetails: useGlobalStore((State) => State.setUserDetails),
		},
	};

	const State = {
		GlobalStore: {
			userDetails: useGlobalStore((State) => State.userDetails),
		},
	};

	const groupClickHandler = (e) => {
		e.preventDefault()
		Update.GlobalStore.userDetails({
			...State.GlobalStore.userDetails,
			joinedGroup: groupId
		})
		socket.emit("group:join", {
			groupId: groupId,
			userId: State.GlobalStore.userDetails?.user?.id
		})
	}
	
	return (
		<>
			<div className={styles.ListGroup} onClick={(e) => groupClickHandler(e)}>
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
						{groupName ? groupName[0].toUpperCase() : 'V'}
					</Avatar>
				)}

				<div className={styles.GroupDetails}>
					<p>{groupName || 'Temp'}</p>
				</div>
			</div>
			<Divider style={{ width: "100%", margin: "0px" }} />
		</>
	);
};

export default index;
