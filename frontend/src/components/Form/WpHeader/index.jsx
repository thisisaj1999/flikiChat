import React, { useState } from 'react';
import styles from './WpHeader.module.scss';

// Other Functions
import { getRandomColor } from '../../../utils/other';

const WpHeader = ({ children, width, comp }) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoveredStyle = {
    color: getRandomColor(),
    transition: 'all 0.3s ease-in-out',
  };

  const notHoveredStyle = {
    color: 'black',
    transition: 'all 1s ease-in-out',
  };

  return (
    <div className={styles.AuthBgMain}>
      <div
        className={styles.AuthFormMain}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{width: width}}
      >
        <h1 className={styles.AuthFormHeading}>
          {comp === "Register" ? "Regis" : "Log"}
          <span style={isHovered ? hoveredStyle : notHoveredStyle}>
            {comp === "Register" ? "ter" : "In"}
          </span>
        </h1>
        {children}
      </div>
    </div>
  );
};

export default WpHeader;
