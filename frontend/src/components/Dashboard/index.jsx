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

	const fetchGroupList = useCallback(async (userId) => {
    try {
      const response = await getAvailableGroupsToJoin(userId);
      if (response?.status === 200) {
        setRenderData(prevData => [...prevData, ...response.data.group_table]);
      }
    } catch (error) {
      console.error('Failed to fetch group list:', error);
    }
  }, [setRenderData]);

  const fetchAllOtherUsers = useCallback(async (userId) => {
    try {
			const response = await getUsersOrExceptId(userId);
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
			fetchGroupList(userId);
		} else if (checkModalLayout === 1) {
			setRenderData([])
			fetchAllOtherUsers(userId);
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
