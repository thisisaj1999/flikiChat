import React from 'react'
import styles from '../Dashboard.module.scss'

import { useGlobalStore } from "../../../utils/store";

const GroupInfo = () => {

	const State = {
		GlobalStore: {
			isGroupInfoOpen: useGlobalStore((State) => State.isGroupInfoOpen),
		},
	};


  const GroupInfoOpenStyles = {
		width: "18rem",
	};

	const GroupInfoCloseStyles = {
		width: "0rem",
	};


  return (
    <div style={State.GlobalStore.isGroupInfoOpen ? GroupInfoOpenStyles : GroupInfoCloseStyles} className={styles.DashboardGroupInfo}>GroupInfo</div>
  )
}

export default GroupInfo