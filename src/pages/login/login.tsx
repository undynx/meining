import { useState } from 'react';
import { Button } from 'common/button';
import { TextField, TextFieldStatus } from 'common/text-field';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as ClosedEyeSVG } from '../../assets/icons/closed-eye.svg';
import { ReactComponent as xSVG } from '../../assets/icons/x.svg';
import { mailFormat, passwordFormat } from '../../helpers/utils.js';
import styles from './login.module.scss';

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

  const checkEmailValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value.match(mailFormat) && e.target.value !== '') {
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
  };

  const checkPassValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 8 && e.target.value !== '') {
      setPassState({
        ...passState,
        helperTextPass: 'La contraseña debe ser más larga que 8 caracteres',
        fieldStatusPass: TextFieldStatus.error,
      });
    } else if (!e.target.value.match(passwordFormat) && e.target.value !== '') {
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
  };

  const unmaskPass = function unmask() {
    if (passHidden === 'text') {
      return ClosedEyeSVG;
    }
    return EyeSVG;
  };

  return (
    <div className={styles.container}>

      <div className={styles.formDivision}>
        <div className={styles.formContainer}>
          <img src="src/assets/icons/barco.svg" alt="Imagen de un barco" className={styles.boatIcon} />

          <h1 className={styles.header1}>Iniciar sesión</h1>
          <TextField
            status={emailState.fieldStatusEmail}
            name="email"
            onChange={(e) => setEmailState({
              ...emailState,
              inputValueEmail: e.target.value,
            })}
            onBlur={(e) => checkEmailValidation(e)}
            label="Usuario"
            type="email"
            helperText={emailState.helperTextEmail}
            helperIcon={xSVG}
            errorMsg
          />

          <TextField
            status={passState.fieldStatusPass}
            name="password"
            onChange={(e) => setPassState({
              ...passState,
              inputValuePass: e.target.value,
            })}
            onBlur={(e) => checkPassValidation(e)}
            label="Contraseña"
            type={passHidden}
            rightIcon={unmaskPass()}
            onRightIconClick={() => {
              if (passHidden === 'text') {
                setPassHidden('password');
              } else {
                setPassHidden('text');
              }
            }}
            helperText={passState.helperTextPass}
            helperIcon={xSVG}
            errorMsg
          />

          <Button
            className={`${styles.btnIngresar} ${styles.textField}`}
            disabled={(emailState.inputValueEmail === '' || passState.inputValuePass === '')}
          >
            Ingresar
          </Button>

          <a className={`${styles.textField} ${styles.link}`} href="http://www.google.com">¿Olvidaste tu contraseña?</a>

        </div>
      </div>

      <div className={styles.imgDivision} />

    </div>
  );
};
