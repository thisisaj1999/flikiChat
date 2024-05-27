import React from "react";
import styles from "./Sidebar.module.scss";
import Avvvatars from "avvvatars-react";

// ANTD
import { Button, Dropdown, Tooltip } from 'antd';

// SVG or Images
import Menu from '../../../../assets/menu.svg'
import Logout from '../../../../assets/logout.svg'
import ProfileCards from '../../../ProfileCards'
import CreateGroup from '../../../../assets/plus.svg'
import JoinGroup from '../../../../assets/group.svg'

// Hooks
import { useGlobalStore } from "../../../../utils/store";
import { useSnackbar } from "notistack";
import { useAuth } from "../../../../utils/AuthProvider";
import useScreenWidth from "../../../../hooks/useScreenWidth";

// Socket
import socket from "../../../../utils/socket";


const index = () => {

	const auth = useAuth()
	const width = useScreenWidth()

	const { enqueueSnackbar } = useSnackbar();

	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
			userDetails: useGlobalStore((State) => State.userDetails),
			userGroups: useGlobalStore((State) => State.userGroups)
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

	// Dropdown menu items
	const MobileMenuItems = [
		{
			label: <>Create group</>,
			key: '0',
			icon: <img src={CreateGroup} alt="Create group" width={20}/>,
			onClick: () => handleCreateGroup()
		},
		{
			type: 'divider',
		},
		{
			label: <>Join group</>,
			key: '1',
			icon: <img src={JoinGroup} alt="Join group" width={20}/>,
			onClick: () => handleJoinGroups()
		},
		{
			type: 'divider',
		},
		{
			label: <>Sign Out</>,
			key: '2',
			icon: <img src={Logout} alt="Sign Out" width={20}/>,
			onClick: () => {
				auth.logOutUser()
				enqueueSnackbar("Sign Out successfull", { variant: 'info' });
				socket.disconnect()
			}
		},
	];

	//  Button Handlers
	const handleJoinGroups = () => {
		Update.GlobalStore.checkModal({
			isOpen: true,
			layout: 0
		})
	}
	
	const handleCreateGroup = () => {
		Update.GlobalStore.checkModal({
			isOpen: true,
			layout: 1
		})
	}
 
	return (
		<div className={styles.DashboardSidebar}>
			<div className={styles.SidebarGroups}>
				<div className={styles.SidebarHeader}>
					<Tooltip title={State.GlobalStore.userDetails?.user?.name}>
						<Avvvatars size={35} value={State.GlobalStore.userDetails?.user?.name} style="character" shadow border borderColor="#000" />
					</Tooltip>
					
					{width > 650 ? 
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
					:
					<Dropdown
						menu={{
							items: MobileMenuItems,
						}}
						placement="bottomRight"
						trigger={['click']}
					>
						<Button type="text" shape="circle">
							<img src={Menu} alt="" width={20} />
						</Button>
					</Dropdown>	
				}
				</div>

				<div className={styles.GroupScrollStyles}>
					<p className={styles.GroupsHeading}>Groups</p>

					<div className={styles.ListGroupMain}>
							{State.GlobalStore.userGroups?.map(group => (
								<ProfileCards key={group?.group_id} from="sideBar" lastMessage={group?.last_message} lastMessageTime={group?.last_message_time} avatarSrc={group?.profile_image_url} groupName={group?.group_name} groupId={group?.group_id}/>
							))}
					</div>
				</div>

			</div>

			{width > 650 && <div className={styles.SidebarOptions}>
				<Button type="primary" block onClick={(e) => handleCreateGroup(e)}>
					Create
				</Button>
				<Button type="primary" block onClick={(e) => handleJoinGroups(e)}>
					Join
				</Button>
			</div>}
		</div>
	);
};

export default index;
