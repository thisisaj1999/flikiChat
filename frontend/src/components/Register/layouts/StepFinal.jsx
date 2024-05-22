import React, { useState } from "react";
import styles from "../Register.module.scss";
import { Button, Form, Input, Tooltip, Typography, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import Tick from '../../../assets/tick.svg'
import UnTick from '../../../assets/untick.svg'

const index = ({ form, handleBack, handleConfirm }) => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState([]);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((itemId) => itemId !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  };

  const renderDivs = () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      label: `Test Group ${i + 1}`,
    }));

    return items.map((item) => (
      <div
        key={item.id}
        className={`${styles.GroupInfoHeader} ${checkedItems.includes(item.id) ? styles.checked : ""}`}
        onClick={() => handleCheckboxChange(item.id)}
      >
        <div className={`${styles.roundCheckbox} ${checkedItems.includes(item.id) ? styles.visible : ""}`}>
          {checkedItems.includes(item.id) ? <img src={Tick} alt="Tick" width={20}/> : <img src={UnTick} alt="UnTick" width={20}/>}
        </div>
        <Avatar
          style={{
            backgroundColor: "dodgerblue",
            verticalAlign: "middle",
          }}
          size={70}
          gap={0}
        >
          G
        </Avatar>
        <p>{item.label}</p>
      </div>
    ));
  };

  const onFinish = (values) => {
		const newValues = {
			name: values?.name,
			joinnedGroups: checkedItems
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
      <div className={styles.GroupsList}>{renderDivs()}</div>

      <div className={styles.AuthFormStepsSubmitBtns}>
        <Form.Item>
          <Button type="primary" className={styles.AuthFormSubmitBtn} onClick={handleBack}>
            Back
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className={styles.AuthFormSubmitBtn} htmlType="submit">
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
