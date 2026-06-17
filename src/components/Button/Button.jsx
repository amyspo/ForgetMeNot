import React from 'react';
import styles from './Button.module.css'

function Button({icon, variants, ...props }) {
  return (
    <button className={`${styles.wrapper} ${styles[variants]}`} {...props}>
      <span>
        {icon}
      </span>
    </button>
  )
}

export default Button;
