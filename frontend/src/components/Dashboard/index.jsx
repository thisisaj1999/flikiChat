import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";

// ANTD
import { Divider } from "antd";

// Components
import Sidebar from "./components/Sidebar";
import MainPage from "./components/MainPage";
import GroupInfo from "./components/GroupInfo";
import Modal from '../Modal'

// Hooks
import { useSnackbar } from "notistack";
import { useGlobalStore } from "../../utils/store";


// Other utilities funtcions
import { decodeToken } from "../../utils/other";

// Socket
import socket from "../../utils/socket";


const index = () => {
  
	const { enqueueSnackbar } = useSnackbar();

	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
			checkModal: useGlobalStore((State) => State.checkModal),
			userDetails: useGlobalStore((State) => State.userDetails)
		},
	};  

	const Update = {
		GlobalStore: {
			userDetails: useGlobalStore((State) => State.setUserDetails),
			checkModal: useGlobalStore((State) => State.setCheckModal),
		},
	};  

	useEffect(() => {
		socket.connect()
	},[])
	
	// Modal Handler for create or join group
	const userId = State?.GlobalStore?.userDetails?.user?.id
	const [renderData, setRenderData] = useState([])
  const checkModalLayout = State?.GlobalStore?.checkModal?.layout;

  useEffect(() => {
		if(checkModalLayout === 0 && userId){
			setRenderData([])
			socket.emit('group:reqAvailableGroups', {
				userId: userId
			});
	
			socket.on('group:resAvailableGroups', (res) => {
				if(res?.status === 200){
					setRenderData(res.data?.availableGroups);
				}else if (res?.status === 404){
					Update.GlobalStore.checkModal({
						isOpen: false,
						layout: null,
					});
					enqueueSnackbar(res?.message, { variant: 'info' });
				}
			});
	
			socket.on('error', (error) => {
				console.error('Error from server:', error.message);
			});
	
			return () => {
				socket.off('group:availableUsers');
				socket.off('error');
			};
		}
	
		if(checkModalLayout === 1 && userId){
			setRenderData([])
			socket.emit('group:reqAvailableUsers', {
				userId: userId
			});
	
			socket.on('group:resAvailableUsers', (res) => {
				if(res?.status === 200){
					setRenderData(res.data?.availableUsers);
				}else if (res?.status === 404){
					Update.GlobalStore.checkModal({
						isOpen: false,
						layout: null,
					});
					enqueueSnackbar(res?.message, { variant: 'info' });
				}
			});
	
			socket.on('error', (error) => {
				console.error('Error from server:', error.message);
			});
	
			return () => {
				socket.off('group:availableUsers');
				socket.off('error');
			};
		}
  }, [checkModalLayout, userId]);

	// Decode JWT
	useEffect(() => {
    const token = localStorage.getItem('site');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        Update.GlobalStore.userDetails({
					user: decodedToken,
					joinedGroup: null
				});
      }
			socket.emit("group:join", {
				userId: decodedToken?.id
			})
    }
  }, []);

	return (
		<div className={styles.DashboardBgMain}>
			<div className={styles.DashboardChatMain}>
				<Sidebar/>

				<Divider
					type="vertical"
					style={{ height: "100%", margin: "0px" }}
				/>

				<MainPage/>

				{State.GlobalStore.isGroupInfoOpen && (
					<>
						<Divider
							type="vertical"
							style={{ height: "100%", margin: "0px" }}
						/>

						<GroupInfo />
					</>
				)}
			</div>
			{renderData.length > 0 && <Modal renderData={renderData}/>}
		</div>
	);
};

export default index;
