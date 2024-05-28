import React from 'react';
import styles from './WLink.module.scss';

// ANTD
import { Tooltip, Typography } from 'antd';

// Hooks
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

const WLink = ({ label, toolTipTitle, className, link }) => {

  const navigate = useNavigate();

  const navigateTo = (link) => {
    navigate(`/${link}`);
  };

  return (
    <div className={styles[className]}>
      <Tooltip title={toolTipTitle}>
        <Typography.Link onClick={() => navigateTo(link)}>
          {label}
        </Typography.Link>
      </Tooltip>
    </div>
  );
};

WLink.propTypes = {
  label: PropTypes.string.isRequired,
  toolTipTitle: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default WLink;
