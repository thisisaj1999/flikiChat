import React from "react";
import styles from "./GroupInfo.module.scss";
import { Button, Avatar, Divider } from "antd";
import { useGlobalStore } from "../../../../utils/store";
import ProfileCards from '../../../ProfileCards'
import Close from "../../../../assets/close.svg";

const index = () => {
	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
		},
	};

	const Update = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore(
				(State) => State.setIsGroupInfoOpen
			),
		},
	};

	const GroupInfoOpenStyles = {
		width: "18rem",
	};

	const GroupInfoCloseStyles = {
		width: "0rem",
	};

	const handleCloseGroupInfo = () =>
		Update.GlobalStore.isGroupInfoOpen(false);

	return (
		<div
			style={
				State.GlobalStore.isGroupInfoOpen
					? GroupInfoOpenStyles
					: GroupInfoCloseStyles
			}
			className={styles.DashboardGroupInfo}
		>
			<div className={styles.GroupInfoCloseBtn}>
				<Button
					type="text"
					shape="circle"
					onClick={handleCloseGroupInfo}
				>
					<img src={Close} alt="" width={24} />
				</Button>

				<p>Group Info</p>
			</div>

			<div className={styles.GroupInfoScrollStyles}>
				<div className={styles.GroupInfoHeader}>
					<Avatar
						style={{
							backgroundColor: "dodgerblue",
							verticalAlign: "middle",
						}}
						size={{
							xs: 80,
							sm: 80,
							md: 80,
							lg: 100,
							xl: 100,
							xxl: 100,
						}}
						gap={0}
					>
						G
					</Avatar>
					<p>Test Group</p>
				</div>

				<div className={styles.GroupInfoDescription}>
					<p>Test Group for Groups Tesing</p>
					<p className={styles.CreatedBy}>
						Group Created by you today at 3:21 pm
					</p>
				</div>

				<div className={styles.GroupInfoParticipants}>
					<p className={styles.GroupsParticipantsHeading}>Participants</p>
					
					<div className={styles.ListGroupMain}>
						<ProfileCards/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default index;
