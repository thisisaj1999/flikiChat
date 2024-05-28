import React from "react";
import styles from "../Register.module.scss";

// ANTD
import { Form } from "antd";

// Component
import WButton from '../../../../components/Form/WButton'
import WInput from '../../../../components/Form/WInput'
import WLink from '../../../../components/Form/WLink'


const index = ({ form, handleNext }) => {

	// Next Btn Handler
	const onFinish = (values) => {
		handleNext(values);
	};

	const registerFields = [
		{
			fieldType: 'text',
			label: 'Email',
			name: 'email',
			rules: [
				{ type: 'email', message: 'The input is not valid Email' },
				{ required: true, message: 'Please input your Email' },
			],
			placeholder: 'johndoe@email.com',
			className: 'LoginEmail',
		},
		{
			fieldType: 'password',
			label: 'Password',
			name: 'password',
			rules: [{ required: true, message: 'Please input your password!' }],
			placeholder: '',
			className: 'LoginPassword',
		},
		{
			fieldType: 'password',
			label: 'Confirm Password',
			name: 'confirm',
			placeholder: '',
			rules: [
				{required: true, message: "Please confirm your password!" },
				{ min: 8, message: "Password must contain atlease 8 characters" },
				({ getFieldValue }) => ({
					validator(_, value) {
						if (!value || getFieldValue("password") === value) {
							return Promise.resolve();
						}
						return Promise.reject(
							new Error(
								"The new password that you entered do not match!"
							)
						);
					},
				}),
			],
			className: 'LoginPassword',
		},
	];

	return (
		<Form onFinish={onFinish} form={form} layout="vertical" autoComplete="on">
			{registerFields.map((field, index) => (
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

			<div className={styles.AuthFormStepsSubmitBtns}>
				<Form.Item>
					<WButton label={"Next"} type={"primary"} className={"AuthFormSubmitBtn"} submit={true} loading={false}/>
				</Form.Item>
			</div>

			<WLink className={"AuthFormLink"} toolTipTitle={"Sign In"} link={"login"} label={"You already have an account ?"}/>
		</Form>
	);
};

export default index;
