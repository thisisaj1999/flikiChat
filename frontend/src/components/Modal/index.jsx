import React, { useState } from "react";
import { Button, Form, Input, Avatar, Modal } from "antd";
import styles from "./Modal.module.scss";

import { useGlobalStore } from "../../utils/store";

import { joinGroups, createGroup } from "../../utils/requests";

import UnTick from '../../assets/untick.svg'
import Tick from '../../assets/tick.svg'

const index = ({renderData}) => {
	const State = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.checkModal),
		},
	};

	const Update = {
		GlobalStore: {
			checkModal: useGlobalStore((State) => State.setCheckModal),
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
		let newValues;
    let response;
		
		if (State.GlobalStore.checkModal?.layout === 0) {      
			newValues = {
        joinned_group_ids: checkedItems,
        userId: 7, // Later make this changeable
      };

      response = await joinGroups(newValues);

			if(response?.status === 200) {
				Update.GlobalStore.checkModal({
					isOpen: false,
					layout: null,
				});
				setCheckedItems([])
				form.resetFields()
			}


    } else if (State.GlobalStore.checkModal?.layout === 1) {
      
			newValues = {
        group_name: values?.name,
				owner_id: 7,
				description: "",
				profile_image_url: "",
        participant_ids: checkedItems
      };

      response = await createGroup(newValues);
			
			if(response?.status === 200) {
				Update.GlobalStore.checkModal({
					isOpen: false,
					layout: null,
				});
				setCheckedItems([])
				form.resetFields()
			}
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
			className={styles.ModalMain}
		>
			{State.GlobalStore.checkModal?.layout === 1 ? (
				<Form layout="vertical" form={form} onFinish={onFinish} autoComplete="on">
					<Form.Item
						label="Name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input your Name",
							},
						]}
					>
						<Input
							style={{ height: "40px" }}
							type="text"
							placeholder="John Doe"
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
									<Avatar
										style={{
											backgroundColor: "dodgerblue",
											verticalAlign: "middle",
										}}
										size={70}
										gap={0}
										src={`${user?.profile_image_url}`}
									/>
									<p>{user?.name}</p>
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
									<Avatar
										style={{
											backgroundColor: "dodgerblue",
											verticalAlign: "middle",
										}}
										size={70}
										gap={0}
										src={`${group?.profile_image_url}`}
									/>
									<p>{group?.group_name}</p>
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
