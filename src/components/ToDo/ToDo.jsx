import React from 'react';
import styles from './ToDo.module.css';

const today = new Date().toISOString().split("T")[0];

function ToDo({title}) {
  return <div>
    <div>
      <ul className={styles.list}>
        <li>
          <div className={styles.flex}>
            <div className={styles.title}>
              <h2>{title}</h2>
            </div>
            <div className={styles.date}>
              <p className={styles.p}>Due Date:</p>
              <p className={styles.p}>{today}</p>
            </div>
            <div className={styles.buttons}>
              <button className={styles.done}>Done</button>
              <button className={styles.delete}>Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>;
}

export default ToDo;
