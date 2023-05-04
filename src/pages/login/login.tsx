import { useState } from 'react';

import { Button } from 'common/button';
import { TextField } from 'common/text-field';
import styles from './login.module.scss';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';

export const Login = () => {

  return (
    <>
      <div className={styles.container}>

        <div className={styles.formDivision}>
          <div className={styles.formContainer}>
            <img src="src/assets/icons/barco.svg" alt="Imagen de un barco" className={styles.icono} />
            <h1 className={styles.header1}>Iniciar sesión</h1>
            <TextField className={styles.textField} name={"email"} onChange={() => { }} label='Usuario' type='email'></TextField>
            <TextField className={styles.textField} name={"password"} onChange={() => { }} label='Contraseña' type='password' rightIcon={EyeSVG} ></TextField>
            <Button className={`${styles.btnIngresar} ${styles.textField}`}>Ingresar</Button>
            <a className={`${styles.textField} ${styles.link}`} href="http://www.google.com">¿Olvidaste tu contraseña?</a>
          </div>
        </div>

        <div className={styles.imgDivision} />

      </div>
    </>
  )
};
