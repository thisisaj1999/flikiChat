import React, { useEffect } from "react";
import styles from "./ProfileCards.module.scss";

// ANTD
import { Avatar, Divider } from "antd";

// Hooks
import { useGlobalStore } from "../../utils/store";
import useScreenWidth from "../../hooks/useScreenWidth"

// Other utilities funtcions
import { convertToReadableTime, truncateWords } from "../../utils/other";

// Socket
import socket from "../../utils/socket";


const index = ({ from, lastMessage, lastMessageTime, avatarSrc, groupName, groupId }) => {

	const width = useScreenWidth()

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
	
	const mobileTrunctateMsgValue = () => {
		if(width >= 425){
			return 45
		}else if (width >= 375){
			return 35
		}else if (width >= 320){
			return 25
		}
	}

	const mobileTrunctateGroupNameValue = () => {
		if(width >= 425){
			return 42
		}else if (width >= 375){
			return 32
		}else if (width >= 320){
			return 28
		}
	}

	return (
		<>
			<div className={styles.ListGroup} onClick={(e) => from === "sideBar" && groupClickHandler(e)}>
				{avatarSrc ? (
					<Avatar
						style={{
							backgroundColor: from === "sideBar" ? "black" : "dodgerblue",
							verticalAlign: "middle",
						}}
						size="medium"
						gap={0}
						src={`${avatarSrc}`}
					/>
				) : (
					<Avatar
						style={{
							backgroundColor: from === "sideBar" ? "black" : "dodgerblue",
							verticalAlign: "middle",
						}}
						size="medium"
						gap={0}
					>
						{groupName ? groupName[0].toUpperCase() : 'V'}
					</Avatar>
				)}

				<div className={styles.GroupDetails}>
					<div className={styles.GroupNameAndNotification}>
						<span>{truncateWords(groupName, mobileTrunctateGroupNameValue())}</span>
						{/* {from === "sideBar" && <span>1</span>} */}
					</div>
					{lastMessage && from === "sideBar" && <div className={styles.GroupDetailsSubHeading}>
						<span>{truncateWords(lastMessage, mobileTrunctateMsgValue())}</span>
						<span>{convertToReadableTime(lastMessageTime)}</span>
					</div>}
				</div>
			</div>
			<Divider style={{ width: "100%", margin: "0px" }} />
		</>
	);
};

export default index;
