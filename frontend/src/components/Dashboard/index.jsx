import React, { useState, useEffect, useCallback } from "react";
import styles from "./Dashboard.module.scss";

import { Divider } from "antd";

import Sidebar from "./components/Sidebar";
import MainPage from "./components/MainPage";
import GroupInfo from "./components/GroupInfo";
import Modal from '../Modal'
import { useGlobalStore } from "../../utils/store";
import { getAvailableGroupsToJoin, getUsersOrExceptId } from "../../utils/requests";
import { decodeToken } from "../../utils/other";
import socket from "../../utils/socket";

const index = () => {


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
				setRenderData(res.data?.availableGroups);
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
				console.log(res)
				setRenderData(res.data?.availableUsers);
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
			<Modal renderData={renderData}/>
		</div>
	);
};

export default index;
