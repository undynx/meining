import { useEffect, useState } from 'react';
import { Button } from 'common/button';
import { TextField, TextFieldStatus } from 'common/text-field';
import styles from './login.module.scss';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as ClosedEyeSVG } from '../../assets/icons/closed-eye.svg';
import { ReactComponent as xSVG } from '../../assets/icons/x.svg';
import { mailFormat, passwordFormat } from '../../helpers/utils.js';

type EmailType = {
  inputValueEmail: string,
  helperTextEmail: string,
  fieldStatusEmail: TextFieldStatus,
};

const initEmailState = {
  inputValueEmail: '',
  helperTextEmail: '',
  fieldStatusEmail: TextFieldStatus.default,
};

type PassType = {
  inputValuePass: string,
  helperTextPass: string,
  fieldStatusPass: TextFieldStatus,
};

const initPassState = {
  inputValuePass: '',
  helperTextPass: '',
  fieldStatusPass: TextFieldStatus.default,
};

export const Login = () => {
  const [emailState, setEmailState] = useState<EmailType>(initEmailState);
  const [passState, setPassState] = useState<PassType>(initPassState);
  const [passHidden, setPassHidden] = useState('password');

  useEffect(() => {
    if (!(emailState.inputValueEmail.match(mailFormat)) && (emailState.inputValueEmail !== '')) {
      setEmailState({
        ...emailState,
        helperTextEmail: 'Debe ser un email válido',
        fieldStatusEmail: TextFieldStatus.error,
      });
    } else {
      setEmailState({
        ...emailState,
        helperTextEmail: '',
        fieldStatusEmail: TextFieldStatus.default,
      });
    }
  }, [emailState.inputValueEmail]);

  useEffect(() => {
    if ((passState.inputValuePass.length < 8) && (passState.inputValuePass !== '')) {
      setPassState({
        ...passState,
        helperTextPass: 'La contraseña debe ser más larga que 8 caracteres',
        fieldStatusPass: TextFieldStatus.error,
      });
    } else if ((!passState.inputValuePass.match(passwordFormat)) && ((passState.inputValuePass !== ''))) {
      setPassState({
        ...passState,
        helperTextPass: 'La contraseña debe tener al menos un caracter especial y un caracter alfanumerico',
        fieldStatusPass: TextFieldStatus.error,
      });
    } else {
      setPassState({
        ...passState,
        helperTextPass: '',
        fieldStatusPass: TextFieldStatus.default,
      });
    }
  }, [passState.inputValuePass]);

  const unmaskPass = function unmask() {
    if (passHidden === 'text') return ClosedEyeSVG;
    return EyeSVG;
  };

  return (
    <div className={styles.container}>

      <div className={styles.formDivision}>
        <div className={styles.formContainer}>
          <img src="src/assets/icons/barco.svg" alt="Imagen de un barco" className={styles.icono} />

          <h1 className={styles.header1}>Iniciar sesión</h1>
          <section className={styles.textField}>
            <TextField
              status={emailState.fieldStatusEmail}
              name="email"
              onBlur={(e) => setEmailState({
                ...emailState,
                inputValueEmail: e.target.value,
              })}
              label="Usuario"
              type="email"
              helperText={emailState.helperTextEmail}
              helperIcon={xSVG}
            />
          </section>

          <section className={styles.textField}>
            <TextField
              status={passState.fieldStatusPass}
              name="password"
              onBlur={(e) => setPassState({
                ...passState,
                inputValuePass: e.target.value,
              })}
              label="Contraseña"
              type={passHidden}
              rightIcon={unmaskPass()}
              onRightIconClick={() => {
                if (passHidden === 'text') {
                  setPassHidden('password');
                } else { setPassHidden('text'); }
              }}
              helperText={passState.helperTextPass}
              helperIcon={xSVG}
              errorMsg
            />
          </section>

          <Button
            className={`${styles.btnIngresar} ${styles.textField}`}
            disabled={(emailState.inputValueEmail === '') || (passState.inputValuePass === '')}
          >
            Ingresar
          </Button>

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
