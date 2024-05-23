import React, { useEffect } from "react";
import { Avatar, Divider } from "antd";
import styles from "./ProfileCards.module.scss";
import { useGlobalStore } from "../../utils/store";
import socket from "../../utils/socket";

const index = ({ avatarSrc, groupName, groupId }) => {

	const State = {
		GlobalStore: {
			userDetails: useGlobalStore((State) => State.userDetails),
			joinedGroupDetails: useGlobalStore((State) => State.joinedGroupDetails),
		},
	};

	const Update = {
		GlobalStore: {
			userDetails: useGlobalStore((State) => State.setUserDetails),
			joinedGroupDetails: useGlobalStore((State) => State.setJoinedGroupDetails),
		},
	};

	useEffect(() => {
		socket.on("group:join", (data) => {
			Update.GlobalStore.joinedGroupDetails({
				group: data?.group,
				messages: data?.messages,
				members: data?.members
			})
		});
	}, [socket, State.GlobalStore.userDetails?.joinedGroup, State.GlobalStore.joinedGroupDetails]);

	
	const groupClickHandler = (e) => {
		
		e.preventDefault()
		const oldRoomId = State.GlobalStore.userDetails?.joinedGroup;

		Update.GlobalStore.userDetails({
			...State.GlobalStore.userDetails,
			joinedGroup: groupId
		})
		socket.emit("group:join", {
			groupId: groupId,
			userId: State.GlobalStore.userDetails?.user?.id,
			oldRoomId: oldRoomId
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
