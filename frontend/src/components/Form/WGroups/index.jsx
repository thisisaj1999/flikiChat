import React, { useEffect, useState } from "react";
import styles from './WGroups.module.scss'
import Avvvatars from "avvvatars-react";

// ANTD
import { Avatar } from "antd";

// SVG or Images
import Tick from '../../../assets/tick.svg'
import UnTick from '../../../assets/untick.svg'

// Other utilities funtcions
import { truncateWords } from "../../../utils/other";

// Hooks
import useScreenWidth from "../../../hooks/useScreenWidth";

import PropTypes from 'prop-types';

const WGroups = ({ dataArray, label, setCheck }) => {

  const width = useScreenWidth()
  const [checkedItems, setCheckedItems] = useState([]);

	useEffect(() => {
		setCheck(checkedItems)
	}, [checkedItems])


  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((itemId) => itemId !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  };

	return (
		<div className={styles.GroupShowcase}>
			<p className={styles.GroupListHeading}>{label}</p>
			<div className={styles.GroupsList}>
				{dataArray.map((group) => (
					<div
						key={group?.id}
						className={`${styles.GroupInfoHeader} ${
							checkedItems.includes(group?.id)
								? styles.checked
								: ""
						}`}
						onClick={() => handleCheckboxChange(group?.id)}
					>
						<div
							className={`${styles.roundCheckbox} ${
								checkedItems.includes(group?.id)
									? styles.visible
									: ""
							}`}
						>
							{checkedItems.includes(group?.id) ? (
								<img src={Tick} alt="Tick" width={20} />
							) : (
								<img src={UnTick} alt="UnTick" width={20} />
							)}
						</div>
						{group?.profile_image_url ? (
							<Avatar
								style={{
									backgroundColor: "black",
									verticalAlign: "middle",
								}}
								size={60}
								gap={0}
								src={`${group?.profile_image_url}`}
							/>
						) : (
							<Avvvatars
								size={60}
								value={group?.group_name}
								style="shape"
								shadow
								border
								borderColor="#e7e7e7"
							/>
						)}
						<p>
							{group?.group_name &&
								(width > 430
									? truncateWords(group?.group_name)
									: truncateWords(group?.group_name, 25))}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

WGroups.propTypes = {
  dataArray: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  setCheck: PropTypes.func.isRequired,
};


export default WGroups;
