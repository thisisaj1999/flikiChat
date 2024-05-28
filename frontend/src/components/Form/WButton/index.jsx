import React from 'react';
import styles from './WButton.module.scss';

// ANTD
import { Button } from 'antd';

import PropTypes from 'prop-types';

const WButton = ({ label, type, className, submit, loading }) => {
  return (
    <Button
    className={styles[className]}
    type={type}
    htmlType={submit && "submit"}
    loading={loading}
  >
    {label}
  </Button>
  );
};

WButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  submit: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default WButton;
