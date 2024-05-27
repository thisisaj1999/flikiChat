import React from 'react';
import styles from './WpInput.module.scss';

// ANTD
import { Form, Input } from 'antd';

import PropTypes from 'prop-types';

const WpInput = ({ fieldType, label, name, rules, placeholder, className }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      className={styles[className]}
    >
      {fieldType === 'email' && (
        <Input
          style={{ height: '40px' }}
          type="email"
          placeholder={placeholder}
        />
      )}
      {fieldType === 'password' && (
        <Input.Password
          style={{ height: '40px' }}
          placeholder={placeholder}
        />
      )}
      {fieldType === 'confirmPassword' && (
        <Input.Password
          style={{ height: '40px' }}
          placeholder={placeholder}
        />
      )}
    </Form.Item>
  );
};

WpInput.propTypes = {
  fieldType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default WpInput;
