import React, { useEffect, useState } from "react";
import styles from "../Register.module.scss";
import { Button, Form, Input, Tooltip, Typography, Avatar } from "antd";

// SVG or Images
import Tick from '../../../assets/tick.svg'
import UnTick from '../../../assets/untick.svg'

// Hooks
import { useNavigate } from "react-router-dom";


const index = ({ form, handleBack, handleConfirm, groups, loadingResponse }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  // Navigation
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
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


  // Submit Form Callback
  const onFinish = (values) => {
		const newValues = {
			name: values?.name,
			joinned_group_ids: checkedItems
		}
    handleConfirm(newValues);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="on">
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
        <Input style={{ height: "40px" }} type="text" placeholder="John Doe" />
      </Form.Item>

      <p className={styles.GroupListHeading}>Join Groups</p>
      
      <div className={styles.GroupsList}>
        {groups.map( (group) => (
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
          )
        )}
        
      </div>

      <div className={styles.AuthFormStepsSubmitBtns}>
        <Form.Item>
          <Button type="primary" className={styles.AuthFormSubmitBtn} onClick={handleBack}>
            Back
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className={styles.AuthFormSubmitBtn} htmlType="submit" loading={loadingResponse}>
            Finish
          </Button>
        </Form.Item>
      </div>

      <div className={styles.AuthFormLink}>
        <Tooltip title="Log In">
          <Typography.Link onClick={navigateToLogin}>
            You already have an account ?
          </Typography.Link>
        </Tooltip>
      </div>
    </Form>
  );
};

export default index;
