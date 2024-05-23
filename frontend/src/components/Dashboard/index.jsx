import React, { useState, useEffect, useCallback } from "react";
import styles from "./Dashboard.module.scss";

import { Divider } from "antd";
import socketIO from 'socket.io-client';

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
	const [renderData, setRenderData] = useState([])
  const checkModalLayout = State?.GlobalStore?.checkModal?.layout;

	const fetchGroupList = useCallback(async () => {
    try {
      const response = await getAvailableGroupsToJoin(7);
      if (response?.status === 200) {
        setRenderData(prevData => [...prevData, ...response.data.group_table]);
      }
    } catch (error) {
      console.error('Failed to fetch group list:', error);
    }
  }, [setRenderData]);

  const fetchAllOtherUsers = useCallback(async () => {
    try {
      const response = await getUsersOrExceptId(7);
      if (response?.status === 200) {
        setRenderData(prevData => [...prevData, ...response.data.user_table]);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, [setRenderData]);

	useEffect(() => {
    if (checkModalLayout === 0) {
			setRenderData([])
      fetchGroupList();
    } else if (checkModalLayout === 1) {
			setRenderData([])
      fetchAllOtherUsers();
    }
  }, [checkModalLayout, fetchGroupList, fetchAllOtherUsers]);
	// Modal Handler for create or join group

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
