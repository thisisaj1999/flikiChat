import React from 'react';
import styles from './WButton.module.scss';

// ANTD
import { Button } from 'antd';

import PropTypes from 'prop-types';

const WButton = ({ label, type, className, submit, loading, action }) => {
  return (
    <div className={styles.ButtonStyles}>
      <Button
        className={styles[className]}
        type={type}
        htmlType={submit && "submit"}
        loading={loading}
        onClick={!submit ? action : null}
      >
        {label}
      </Button>
    </div>
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
