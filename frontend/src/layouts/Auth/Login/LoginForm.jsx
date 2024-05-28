import React, { useState } from 'react';
import styles from './Login.module.scss';

// ANTD
import { Form } from 'antd';

// Hooks
import { useSnackbar } from 'notistack';
import { useAuth } from '../../../utils/AuthProvider';

// Components
import WInput from '../../../components/Form/WInput';
import WButton from '../../../components/Form/WButton';
import WLink from '../../../components/Form/WLink';


const LoginForm = ({ fields }) => {
  
  const Auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  
  const [loadingResponse, setLoadingResponse] = useState(false);

  const onFinish = async (values) => {
    setLoadingResponse(true);
    const response = await Auth.userLogin(values);
    if (response?.status === 200) {
      setLoadingResponse(false);
      enqueueSnackbar('Log In successful', { variant: 'success' });
    } else {
      setLoadingResponse(false);
      enqueueSnackbar(response?.message, { variant: 'info' });
    }
  };

  return (
    <Form
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="on"
      className={styles.AuthFormFields}
    >
      {fields.map((field, index) => (
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
      <Form.Item>
        <WButton label={"Sign In"} type={"primary"} className={"AuthFormSubmitBtn"} submit={true} loading={loadingResponse}/>
      </Form.Item>

      <WLink className={"AuthFormLink"} toolTipTitle={"Sign Up"} link={"register"} label={"You don't have an account?"}/>
    </Form>
  );
};

export default LoginForm;
