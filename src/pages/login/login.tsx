import { useEffect, useState } from 'react';
import { Button } from 'common/button';
import { TextField, TextFieldStatus } from 'common/text-field';
import styles from './login.module.scss';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as xSVG } from '../../assets/icons/x.svg';

export const Login = () => {
  const mailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [inputValue, setInputValue] = useState('');
  const [helperText, setHelperText] = useState('');
  const [fieldStatus, setFieldStatus] = useState(TextFieldStatus.default);

  useEffect(() => {
    if (!(inputValue.match(mailValidation)) && (inputValue !== '')) {
      setHelperText('Debe ser un email válido');
      setFieldStatus(TextFieldStatus.error);
    } else {
      setHelperText('');
      setFieldStatus(TextFieldStatus.default);
    }
  });

  return (
    <div className={styles.container}>

      <div className={styles.formDivision}>
        <div className={styles.formContainer}>
          <img src="src/assets/icons/barco.svg" alt="Imagen de un barco" className={styles.icono} />

          <h1 className={styles.header1}>Iniciar sesión</h1>
          <section className={styles.textField}>
            <TextField
              status={fieldStatus}
              name="email"
              onChange={(e) => setInputValue(e.target.value)}
              label="Usuario"
              type="email"
              helperText={helperText}
              helperIcon={xSVG}
            />
          </section>

          <section className={styles.textField}>
            <TextField
              name="password"
              onChange={() => { }}
              label="Contraseña"
              type="password"
              rightIcon={EyeSVG}
            />
          </section>

          <Button className={`${styles.btnIngresar} ${styles.textField}`}>Ingresar</Button>

          <a className={`${styles.textField} ${styles.link}`} href="http://www.google.com">¿Olvidaste tu contraseña?</a>

        </div>
      </div>

      <div className={styles.imgDivision} />

      <div className={styles.formDivision}>
        <div className={styles.formContainer}>
          <img src="src/assets/icons/barco.svg" alt="Imagen de un barco" className={styles.icono} />
          <h1 className={styles.header1}>Iniciar sesión</h1>
          <TextField className={styles.textField} name="email" onChange={() => { }} label="Usuario" type="email" />
          <TextField className={styles.textField} name="password" onChange={() => { }} label="Contraseña" type="password" rightIcon={EyeSVG} />
          <Button className={`${styles.btnIngresar} ${styles.textField}`}>Ingresar</Button>
          <a className={`${styles.textField} ${styles.link}`} href="http://www.google.com">¿Olvidaste tu contraseña?</a>
        </div>
      </div>

      <div className={styles.imgDivision} />

    </div>
  );
};
