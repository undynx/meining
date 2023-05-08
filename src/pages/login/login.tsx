import React, { useState } from 'react';
import { SignIn } from 'common/signin/index';
import { SignUp } from 'common/signup/index';
import styles from './login.module.scss';

export const Login = () => {
  const [signUp, setSignUp] = useState(true);

  return (

    <div className={styles.container}>
      <div className={styles.formDivision}>
        <div className={styles.buttonDiv}>
          <button
            onClick={() => {
              setSignUp(true);
            }}
            className={signUp ? styles.btnHighlighted : ''}
          >
            Sign Up
          </button>
          <span> | </span>
          <button
            onClick={() => {
              setSignUp(false);
            }}
            className={signUp ? '' : styles.btnHighlighted}
          >
            Sign In
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.imgContainer}>
            <img
              src="src/assets/icons/boat.svg"
              alt="A boat"
              className={styles.icono}
            />
          </div>

          {signUp ? <SignUp /> : <SignIn />}
        </div>

        <div className={styles.imgDivision} />
      </div>

      <div className={styles.imgDivision} />

    </div>
  );
};
