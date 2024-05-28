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

const WGroups = ({ dataArray, label, setCheck, renderingFrom }) => {

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
			{label && <p className={styles.GroupListHeading}>{label}</p>}
			<div className={styles.GroupsList} style={{maxHeight: renderingFrom === "CreateGroupModal" ? '18rem' : renderingFrom === 'JoinGroupModal' ? '20rem' : null}}>
				{dataArray.map((data) => (
					<div
						key={data?.id}
						className={`${styles.GroupInfoHeader} ${
							checkedItems.includes(data?.id)
								? styles.checked
								: ""
						}`}
						onClick={() => handleCheckboxChange(data?.id)}
					>
						<div
							className={`${styles.roundCheckbox} ${
								checkedItems.includes(data?.id)
									? styles.visible
									: ""
							}`}
						>
							{checkedItems.includes(data?.id) ? (
								<img src={Tick} alt="Tick" width={20} />
							) : (
								<img src={UnTick} alt="UnTick" width={20} />
							)}
						</div>
						{data?.image ? (
							<Avatar
								style={{
									backgroundColor: "black",
									verticalAlign: "middle",
								}}
								size={60}
								gap={0}
								src={`${data?.image}`}
							/>
						) : (
							<Avvvatars
								size={60}
								value={data?.name}
								style={renderingFrom === "CreateGroupModal" ? 'character' : 'shape'}
								shadow
								border
								borderColor="#e7e7e7"
							/>
						)}
						<p>
							{data?.name &&
								(width > 430
									? truncateWords(data?.name)
									: truncateWords(data?.name, 25))}
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
