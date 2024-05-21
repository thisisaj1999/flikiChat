import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { useAllUsersStore } from "../../store";
import { getAllUsers, deleteUser } from "../../services/utils";
import { enqueueSnackbar  } from "notistack";
import { useNavigate } from "react-router-dom";

const UserList = () => {

	const navigate = useNavigate();

	const State = {
		Users: {
			usersData: useAllUsersStore((State) => State.usersData),
		},
	};

	const Update = {
		Users: {
			usersData: useAllUsersStore((State) => State.setUsersData),
			resetUsersData: useAllUsersStore((State) => State.resetUsersData),
			editUserData: useAllUsersStore((State) => State.setUpdateUserData),
		},
	};

	const editUserHandler = (data) => {
		Update.Users.editUserData({
			fName: data.first_name,
			lName: data.last_name,
			email: data.email,
			phone: data.phone,
			image: data.image,
			id: data.id,
		});
		navigate("/edit-user")
	};

	const columns = [
		{
			title: "Image",
			dataIndex: "image",
			key: "image",
			render: (_, record) => {
				return (
					<Space size="middle" >
						<img width="50px" height="50px" style={{borderRadius: "100px"}} src={record.image} alt="" />
					</Space>
				);
			},
		},
		{
			title: "First Name",
			dataIndex: "first_name",
			key: "first_name",
		},
		{
			title: "Last Name",
			dataIndex: "last_name",
			key: "last_name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => {
				return (
					<Space size="middle">
						<a onClick={() => editUserHandler(record)}>Edit</a>
						<a onClick={() => deleteUserHandler(record.id)}>
							Delete
						</a>
					</Space>
				);
			},
		},
	];

	const refactorData = () => {
		getAllUsers().then((res) => {
			if (res.status === 200) {
				let users = res.data.user_table;
				let images = res.data.image_table;

				const newData = users.map((user) => {
					const image = images.filter(
						(image) => image?.user_id === user.id
					)[0]?.image_url;
					return {
						...user,
						image: image ? image : "",
					};
				});

				Update.Users.usersData(newData);
			}

			if(res.status === 404){
				Update.Users.resetUsersData();
			}
		});
	}

	useEffect(() => {
		refactorData();
	}, []);

	const deleteUserHandler = async (id) => {
		const data = await deleteUser(id);
		if (data.status === 404) {
			enqueueSnackbar(data?.message, { variant: "error" });
		}

		if (data.status === 200) {
			enqueueSnackbar(`${data?.message}, Id : ${id}`, { variant: "success", preventDuplicate:false});
			refactorData();
		}
	};

	return (
		<Table
			style={{ border: "1px solid lightgray", borderRadius: "7px" }}
			columns={columns}
			dataSource={State.Users.usersData}
		/>
	);
};
export default UserList;
