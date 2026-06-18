import React from 'react';
import styles from './Header.module.css';

function Header() {
  return <>
    <div className={styles.flex}>
      {/* <div className={styles.wrapper}> */}
        <img className={styles.img} src='ForgetMeNot.svg'/>
      {/* </div> */}
      <div className={styles.wrapper}>
        <h1>Forget Me Not</h1>
      </div>
    </div>
  </>;
}

export default Header;
