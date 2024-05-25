import React, { useState } from "react";
import styles from "../Register.module.scss";

// ANTD
import { Button, Form, Input, Tooltip, Typography, Avatar } from "antd";

// SVG or Images
import Tick from '../../../assets/tick.svg'
import UnTick from '../../../assets/untick.svg'

// Hooks
import { useNavigate } from "react-router-dom";
import useScreenWidth from "../../../hooks/useScreenWidth";

// Other utilities funtcions
import { truncateWords } from "../../../utils/other";

const index = ({ form, handleBack, handleConfirm, groups, loadingResponse }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  // Navigation
  const navigate = useNavigate();
  const width = useScreenWidth();


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
        className={styles.LoginEmail}
      >
        <Input style={{ height: "40px" }} type="text" placeholder="John Doe" />
      </Form.Item>

      <p className={styles.GroupListHeading}>Join Groups</p>
      
      <div className={styles.GroupsList}>
        {groups.map((group) => (
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
											size={70}
											gap={0}
											src={`${group?.profile_image_url}`}
										/>
									) : (
										<Avatar
											style={{
												backgroundColor: "black",
												verticalAlign: "middle",
											}}
											size={70}
											gap={0}
										>
											{group?.group_name ? group?.group_name[0].toUpperCase() : ''}
										</Avatar>
									)}
              <p>{group?.group_name && (width > 430 ? truncateWords(group?.group_name) : truncateWords(group?.group_name, 25)) }</p>
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
