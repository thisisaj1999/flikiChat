import React, { useState } from 'react';
import styles from './Login.module.scss';

// ANTD
import { Button, Form, Tooltip, Typography } from 'antd';

// Hooks
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../../utils/AuthProvider';

// Components
import WpInput from '../../../components/Form/WpInput';


const LoginForm = ({ fields }) => {
  
  const Auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
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

  const navigateToRegister = () => {
    navigate('/register');
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
        <WpInput
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
        <Button
          className={styles.AuthFormSubmitBtn}
          type="primary"
          htmlType="submit"
          loading={loadingResponse}
        >
          Sign In
        </Button>
      </Form.Item>

      <div className={styles.AuthFormLink}>
        <Tooltip title="Sign Up">
          <Typography.Link onClick={navigateToRegister}>
            {"You don't have an account?"}
          </Typography.Link>
        </Tooltip>
      </div>
    </Form>
  );
};

export default LoginForm;
