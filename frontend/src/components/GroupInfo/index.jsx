import React from "react";
import styles from "./GroupInfo.module.scss";
import Avvvatars from 'avvvatars-react'

// ANTD
import { Button, Avatar, Dropdown } from "antd";

// Components
import ProfileCards from '../ProfileCards'

// Hooks
import { useGlobalStore } from "../../utils/store";
import { useSnackbar } from "notistack";
import useScreenWidth from '../../hooks/useScreenWidth'

// SVG or Images
import Close from "../../assets/close.svg";
import Menu from '../../assets/menu.svg'
import Logout from '../../assets/logout.svg'

// Other utilities funtcions
import { convertToReadableTime, convertToReadableDays, getUserDisplayName } from "../../utils/other";

// Socket
import socket from "../../utils/socket";

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
			isGroupInfoOpen: useGlobalStore((State) => State.setIsGroupInfoOpen),
			userGroups: useGlobalStore((State) => State.setUserGroups),
			userDetails: useGlobalStore((State) => State.setUserDetails),
		},
	};

	const { enqueueSnackbar } = useSnackbar();
	const width = useScreenWidth()

	const groupDetails = State.GlobalStore.joinedGroupDetails?.group
	const groupMembersDetails = State.GlobalStore.joinedGroupDetails?.members
	const userDetails = State.GlobalStore.userDetails?.user

	// Layout or UI
	const GroupInfoOpenStyles = () => {
		if(width >= 1440) {
			return {
				width: "16rem",
			}
		} else if(width >= 1024){
			return {
				width: "14rem",
			}
		} else if(width >= 650){
			return {
				width: "12rem",
			}
		} else{
			return {
				width: '0rem'
			}
		}
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
				const groupId = groupDetails?.id
				const userId = userDetails?.id
				const groupName = groupDetails?.group_name
				socket.emit('group:reqLeaveGroup', {userId, groupId})

				socket.on('group:resLeaveGroup', (res) => {
					if(res?.status === 200) {
						enqueueSnackbar(`You left ${groupName} group`, { variant: 'info', autoHideDuration: 2000 });
						Update.GlobalStore.userGroups([...res?.data])
						localStorage.setItem("userGroups", JSON.stringify(res?.data));
						handleCloseGroupInfo()
						Update.GlobalStore.userDetails({
							user: {
								...userDetails
							},
							joinedGroup: null
						});
					}else{
						enqueueSnackbar(`Unable to leave ${groupName} group`, { variant: 'info', autoHideDuration: 2000 });
					}
				});

			}
		},
	];

	return (
		<div
			style={
				State.GlobalStore.isGroupInfoOpen
					? GroupInfoOpenStyles()
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
						size={90}
						gap={0}
						src={`${groupDetails?.profile_image_url}`}
					/>
				) : (
					<Avvvatars size={90} value={groupDetails?.group_name} style="shape" shadow border borderColor="#e7e7e7" />
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
