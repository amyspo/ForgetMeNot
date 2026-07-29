import React from "react";
import styles from "./Button.module.css";

function Button({ children, icon, variants, isActive, ...props }) {
  return (
    <button
      className={`${styles.wrapper} ${styles[variants]} ${isActive ? styles.active : styles.inactive}`}
      {...props}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
}

export default Button;
