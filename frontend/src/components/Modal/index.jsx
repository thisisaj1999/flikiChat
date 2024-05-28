import React, { useState } from "react";
import styles from "./Modal.module.scss";

// ANTD
import { Form, Modal } from "antd";

// Component
import WGroups from "../Form/WGroups";
import WInput from "../Form/WInput";
import WButton from "../Form/WButton";

// Hooks
import { useGlobalStore } from "../../utils/store";

// Socket
import socket from '../../utils/socket'


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

	const setCheck = (value) => {
		setCheckedItems(value)
	}

  const inputFields = [
		{
			fieldType: 'text',
			label: 'Name',
			name: 'name',
			rules: [
				{ required: true, message: 'Please input Group name' },
			],
			placeholder: 'Mighty Raju Fan Page',
			className: 'LoginEmail',
		},
  ]

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
					{inputFields.map((field, index) => (
						<WInput
							key={index}
							fieldType={field.fieldType}
							label={field.label}
							name={field.name}
							rules={field.rules}
							placeholder={field.placeholder}
							className={styles[field.className]}
						/>
					))}
					<WGroups dataArray={renderData} label="Add Participants" setCheck={setCheck} renderingFrom="CreateGroupModal"/>
					<div className={styles.AuthFormStepsSubmitBtns}>
						<div></div>
						<Form.Item>
							<WButton label={"Create"} type={"primary"} className={"AuthFormSubmitBtn"} submit={true} loading={false}/>
						</Form.Item>
					</div>
				</Form>
			) : (
				<Form layout="vertical" onFinish={onFinish} autoComplete="on">
					<WGroups dataArray={renderData} setCheck={setCheck} renderingFrom="JoinGroupModal"/>
					<div className={styles.AuthFormStepsSubmitBtns}>
						<div></div>
						<Form.Item>
							<WButton label={"Join"} type={"primary"} className={"AuthFormSubmitBtn"} submit={true} loading={false}/>
						</Form.Item>
					</div>
				</Form>
			)}
		</Modal>
	);
};
export default index;
