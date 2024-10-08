import React from 'react';
import styles from './WInput.module.scss';

// ANTD
import { Form, Input } from 'antd';

import PropTypes from 'prop-types';

const WInput = ({ fieldType, label, name, rules, placeholder, className }) => {
  return (
    <div className={styles.FormFields}>      
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
          {fieldType === 'text' && (
            <Input
              style={{ height: '40px' }}
              type="text"
              placeholder={placeholder}
            />
          )}
        </Form.Item>
    </div>
  );
};

WInput.propTypes = {
  fieldType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default WInput;
