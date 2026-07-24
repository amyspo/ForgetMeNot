import React from 'react';
import styles from './Button.module.css'

function Button({children, icon, variants, ...props }) {
  return (
    <button className={`${styles.wrapper} ${styles[variants]}`} {...props}>
      <span>
        {icon}
      </span>
      {children}
    </button>
  )
}

export default Button;
