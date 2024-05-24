import React from "react";
import styles from "./Sidebar.module.scss";

// ANTD
import { Button, Avatar, Dropdown, Tooltip } from 'antd';

// SVG or Images
import Menu from '../../../../assets/menu.svg'
import Logout from '../../../../assets/logout.svg'
import ProfileCards from '../../../ProfileCards'

// Hooks
import { useGlobalStore } from "../../../../utils/store";
import { useSnackbar } from "notistack";
import { useAuth } from "../../../../utils/AuthProvider";

// Socket
import socket from "../../../../utils/socket";


const index = () => {
	const auth = useAuth()
	const { enqueueSnackbar } = useSnackbar();

	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
			userDetails: useGlobalStore((State) => State.userDetails)
		},
	};

	const Update = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.setCheckModal),
		},
	};

	// Dropdown menu items
	const MenuItems = [
		{
			label: <>Sign Out</>,
			key: '0',
			icon: <img src={Logout} alt="Sign Out" width={20}/>,
			onClick: () => {
				auth.logOutUser()
				enqueueSnackbar("Sign Out successfull", { variant: 'info' });
				socket.disconnect()
			}
		},
	];

	//  Button Handlers
	const handleJoinGroups = (e) => {
		e.preventDefault()
		Update.GlobalStore.checkModal({
			isOpen: true,
			layout: 0
		})
	}
	
	const handleCreateGroup = (e) => {
		e.preventDefault()
		Update.GlobalStore.checkModal({
			isOpen: true,
			layout: 1
		})
	}
 
	return (
		<div className={styles.DashboardSidebar} style={State.GlobalStore.isGroupInfoOpen ? {width: '18rem'} : {width: '15rem'}}>
			<div className={styles.SidebarGroups}>
				<div className={styles.SidebarHeader}>
					<Tooltip title={State.GlobalStore.userDetails?.user?.name}>
						<Avatar
							style={{
								backgroundColor: "green",
								verticalAlign: "middle",
								cursor: 'pointer'
							}}
							size="medium"
							gap={0}
						>
							{State.GlobalStore.userDetails?.user?.name.charAt(0).toUpperCase()}
						</Avatar>
					</Tooltip>
					
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

				<div className={styles.GroupScrollStyles}>
					<p className={styles.GroupsHeading}>Groups</p>

					<div className={styles.ListGroupMain}>
							{State.GlobalStore.userDetails?.user?.groups?.map(group => (
								<ProfileCards key={group?.group_id} from="sideBar" lastMessage={group?.last_message} lastMessageTime={group?.last_message_time} avatarSrc={group?.profile_image_url} groupName={group?.group_name} groupId={group?.group_id}/>
							))}
					</div>
				</div>

			</div>

			<div className={styles.SidebarOptions}>
				<Button type="primary" block onClick={(e) => handleCreateGroup(e)}>
					Create
				</Button>
				<Button type="primary" block onClick={(e) => handleJoinGroups(e)}>
					Join
				</Button>
			</div>
		</div>
	);
};

export default index;
