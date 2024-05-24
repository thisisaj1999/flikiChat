import React from "react";
import styles from "./GroupInfo.module.scss";

// ANTD
import { Button, Avatar, Dropdown } from "antd";

// Components
import ProfileCards from '../../../ProfileCards'

// Hooks
import { useGlobalStore } from "../../../../utils/store";

// SVG or Images
import Close from "../../../../assets/close.svg";
import Menu from '../../../../assets/menu.svg'
import Logout from '../../../../assets/logout.svg'

// Other utilities funtcions
import { convertToReadableTime, convertToReadableDays, getUserDisplayName } from "../../../../utils/other";


const index = () => {
	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
			joinedGroupDetails: useGlobalStore((State) => State.joinedGroupDetails),
			userDetails: useGlobalStore((State) => State.userDetails),
		},
	};

	const Update = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore(
				(State) => State.setIsGroupInfoOpen
			),
		},
	};

	const groupDetails = State.GlobalStore.joinedGroupDetails?.group
	const groupMembersDetails = State.GlobalStore.joinedGroupDetails?.members
	const userDetails = State.GlobalStore.userDetails?.user

	// Layout or UI
	const GroupInfoOpenStyles = {
		width: "18rem",
	};

	const GroupInfoCloseStyles = {
		width: "0rem",
	};

	const handleCloseGroupInfo = () =>
		Update.GlobalStore.isGroupInfoOpen(false);

	const MenuItems = [
		{
			label: <>Leave Group</>,
			key: '0',
			icon: <img src={Logout} alt="Sign Out" width={20}/>,
			onClick: () => {
				console.log('Leave group')
				// enqueueSnackbar("Sign Out successfull", { variant: 'info' });
			}
		},
	];

	return (
		<div
			style={
				State.GlobalStore.isGroupInfoOpen
					? GroupInfoOpenStyles
					: GroupInfoCloseStyles
			}
			className={styles.DashboardGroupInfo}
		>
			<div className={styles.GroupInfoTopHeader}>
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
					<Dropdown
						menu={{
							items: MenuItems,
						}}
						placement="bottomRight"
						trigger={['click']}
					>
						<Button type="text" shape="circle">
							<img src={Menu} alt="" width={20} />
						</Button>
					</Dropdown>
			</div>

			<div className={styles.GroupInfoScrollStyles}>
				<div className={styles.GroupInfoHeader}>
					{groupDetails?.profile_image_url ? (
					<Avatar
						style={{
							backgroundColor: "black",
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
						src={`${groupDetails?.profile_image_url}`}
					/>
				) : (
					<Avatar
						style={{
							backgroundColor: "black",
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
						{groupDetails?.group_name && groupDetails?.group_name[0].toUpperCase()}
					</Avatar>
				)}
					<p>{groupDetails?.group_name}</p>
				</div>

				<div className={styles.GroupInfoDescription}>
					<p>{groupDetails?.description}</p>
					<p className={styles.CreatedBy}>
						{`Group created by ${getUserDisplayName(userDetails, groupDetails)} ${convertToReadableDays(groupDetails?.created_at)} at ${convertToReadableTime(groupDetails?.created_at)}`}
					</p>
				</div>

				<div className={styles.GroupInfoParticipants}>
					<p className={styles.GroupsParticipantsHeading}>Participants</p>
					
					<div className={styles.ListGroupMain}>
						{
							groupMembersDetails?.map(member => (
								<ProfileCards key={member?.id} from="groupDetails" groupName={member?.name}/>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default index;
