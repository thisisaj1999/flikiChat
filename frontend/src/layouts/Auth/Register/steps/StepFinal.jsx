import React, { useState } from "react";
import styles from "../Register.module.scss";

// ANTD
import { Form } from "antd";

// Components
import WInput from "../../../../components/Form/WInput";
import WButton from "../../../../components/Form/WButton";
import WGroups from "../../../../components/Form/WGroups";
import WLink from "../../../../components/Form/WLink";


const index = ({ form, handleBack, handleConfirm, groups, loadingResponse }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const setCheck = (val) => {
    setCheckedItems(val)
  }

  // Submit Form Callback
  const onFinish = (values) => {
		const newValues = {
			name: values?.name,
			joinned_group_ids: checkedItems
		}
    handleConfirm(newValues);
  };

  const registerFields = [
		{
			fieldType: 'text',
			label: 'Name',
			name: 'name',
			rules: [
				{ required: true, message: 'Please input your Name' },
			],
			placeholder: 'John Doe',
			className: 'LoginEmail',
		},
  ]

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="on">
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

      <WGroups dataArray={groups} label="Join Groups" setCheck={setCheck}/>

      <div className={styles.AuthFormStepsSubmitBtns}>
        <Form.Item>
          <WButton label={"Back"} type={"primary"} className={"AuthFormSubmitBtn"} action={handleBack} submit={false} loading={false}/>
        </Form.Item>

        <Form.Item>
          <WButton label={"Finish"} type={"primary"} className={"AuthFormSubmitBtn"} submit={true} loading={loadingResponse}/>
        </Form.Item>
      </div>
			
      <WLink className={"AuthFormLink"} toolTipTitle={"Sign In"} link={"login"} label={"You already have an account ?"}/>
    </Form>
  );
};

export default index;
