import React, { useState } from "react";
import styles from "./Modal.module.scss";
import Avvvatars from "avvvatars-react";

// ANTD
import { Button, Form, Input, Avatar, Modal } from "antd";

// Hooks
import { useGlobalStore } from "../../utils/store";

// SVG or Images
import UnTick from '../../assets/untick.svg'
import Tick from '../../assets/tick.svg'

// Socket
import socket from '../../utils/socket'

// Other utilities funtcions
import { truncateWords } from "../../utils/other"


const index = ({renderData}) => {
	const State = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.checkModal),
			userDetails: useGlobalStore((State) => State.userDetails)
		},
	};

	const Update = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.setCheckModal),
			userDetails: useGlobalStore((State) => State.setUserDetails),
			userGroups: useGlobalStore((State) => State.setUserGroups)
		},
	};
	
	const [form] = Form.useForm();
	const [checkedItems, setCheckedItems] = useState([]);

	// Initial Groups on Load
	const handleCancel = () => {
		Update.GlobalStore.checkModal({
			isOpen: false,
			layout: null,
		});
		setCheckedItems([])
		form.resetFields()
	};

	const onFinish = async (values) => {
		if (State.GlobalStore.checkModal?.layout === 0) {      	
			const joinned_group_ids = checkedItems;
			const userId = State.GlobalStore.userDetails?.user?.id;
		
			socket.emit('group:reqJoinNewGroup', {joinned_group_ids, userId});
		
			socket.on('group:resJoinNewGroup', (res) => {
				if(res?.status === 200) {
					Update.GlobalStore.checkModal({
						isOpen: false,
						layout: null,
					});

					Update.GlobalStore.userGroups([...res?.data])
					localStorage.setItem("userGroups", JSON.stringify(res?.data));

					setCheckedItems([])
					form.resetFields()
				}
			});
    } else if (State.GlobalStore.checkModal?.layout === 1) {
			
			const group_name = values?.name;
			const owner_id = State.GlobalStore.userDetails?.user?.id;
			const description = "";
			const profile_image_url = "";
			const participant_ids = checkedItems;
      

			socket.emit('group:reqCreateNewGroup', {group_name, owner_id, description, profile_image_url, participant_ids});
			
			socket.on('group:resCreateNewGroup', (res) => {
				if(res?.status === 200) {
					Update.GlobalStore.checkModal({
						isOpen: false,
						layout: null,
					});

					Update.GlobalStore.userGroups([...res?.data])
					localStorage.setItem("userGroups", JSON.stringify(res?.data));

					setCheckedItems([])
					form.resetFields()
				}
			});
    } 
	};

  // Checkbox Handler
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
		<Modal
			title={
				State.GlobalStore.checkModal?.layout === 0
					? "Join Groups"
					: "Create Group"
			}
			open={State.GlobalStore.checkModal.isOpen}
		  onCancel={handleCancel}
  		footer={null}
			width={800}
			forceRender
			className={styles.ModalMain}
		>
			{State.GlobalStore.checkModal?.layout === 1 ? (
				<Form layout="vertical" form={form} onFinish={onFinish} autoComplete="on">
					<Form.Item
						label="Group Name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input Group Name",
							},
						]}
					>
						<Input
							style={{ height: "40px" }}
							type="text"
							placeholder="Mighty Raju Fan Page"
						/>
					</Form.Item>

					<p className={styles.GroupListHeading}>Add Participants</p>
					<div className={styles.GroupsList} style={{maxHeight: '18rem'}}>
						{renderData.map( (user) => (
							<div
								key={user?.id}
								className={`${styles.GroupInfoHeader} ${checkedItems.includes(user?.id) ? styles.checked : ""}`}
								onClick={() => handleCheckboxChange(user?.id)}
							>
								<div className={`${styles.roundCheckbox} ${checkedItems.includes(user?.id) ? styles.visible : ""}`}>
									{checkedItems.includes(user?.id) ? <img src={Tick} alt="Tick" width={20}/> : <img src={UnTick} alt="UnTick" width={20}/>}
								</div>
									{user?.profile_image_url ? (
										<Avatar
											style={{
												backgroundColor: "black",
												verticalAlign: "middle",
											}}
											size={60}
											gap={0}
											src={`${user?.profile_image_url}`}
										/>
									) : (
										<Avvvatars size={60} value={user?.name} style="character" shadow border borderColor="#000" />
									)}
									<p>{user?.name && truncateWords(user?.name, 12)}</p>
								</div>
							))
						}
					</div>

					<div className={styles.AuthFormStepsSubmitBtns}>
						<div></div>

						<Button
							type="primary"
							className={styles.AuthFormSubmitBtn}
							htmlType="submit"
						>
							Create
						</Button>
					</div>
				</Form>
			) : (
				<Form layout="vertical" onFinish={onFinish} autoComplete="on">
					<div className={styles.GroupsList} style={{maxHeight: '20rem'}}>
						{renderData.map((group) => (
							<div
								key={group?.id}
								className={`${styles.GroupInfoHeader} ${checkedItems.includes(group?.id) ? styles.checked : ""}`}
								onClick={() => handleCheckboxChange(group?.id)}
							>
								<div className={`${styles.roundCheckbox} ${checkedItems.includes(group?.id) ? styles.visible : ""}`}>
									{checkedItems.includes(group?.id) ? <img src={Tick} alt="Tick" width={20}/> : <img src={UnTick} alt="UnTick" width={20}/>}
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
										<Avvvatars size={60} value={group?.group_name} style="shape" shadow border borderColor="#e7e7e7" />
									)}
									<p>{group?.group_name && truncateWords(group?.group_name)}</p>
								</div>
							))
						}
					</div>

					<div className={styles.AuthFormStepsSubmitBtns}>
						<div></div>

						<Button
							type="primary"
							className={styles.AuthFormSubmitBtn}
							htmlType="submit"
						>
							Join
						</Button>
					</div>
				</Form>
			)}
		</Modal>
	);
};
export default index;
