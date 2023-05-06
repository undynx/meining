import { useEffect, useState } from 'react';
import { Button } from 'common/button';
import { TextField, TextFieldStatus } from 'common/text-field';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as ClosedEyeSVG } from '../../assets/icons/closed-eye.svg';
import { ReactComponent as xSVG } from '../../assets/icons/x.svg';
import { mailFormat, passwordFormat } from '../../helpers/utils.js';
import styles from './signin.module.scss';

type EmailType = {
  inputValueEmail: string;
  helperTextEmail: string;
  fieldStatusEmail: TextFieldStatus;
};

const initEmailState = {
  inputValueEmail: '',
  helperTextEmail: '',
  fieldStatusEmail: TextFieldStatus.default,
};

type PassType = {
  inputValuePass: string;
  helperTextPass: string;
  fieldStatusPass: TextFieldStatus;
};

const initPassState = {
  inputValuePass: '',
  helperTextPass: '',
  fieldStatusPass: TextFieldStatus.default,
};

export const SignIn = () => {
  const [emailState, setEmailState] = useState<EmailType>(initEmailState);
  const [passState, setPassState] = useState<PassType>(initPassState);
  const [passHidden, setPassHidden] = useState(true);

  useEffect(() => {
    if (!emailState.inputValueEmail.match(mailFormat) && emailState.inputValueEmail !== '') {
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
    if (passState.inputValuePass.length < 8 && passState.inputValuePass !== '') {
      setPassState({
        ...passState,
        helperTextPass: 'La contraseña debe ser más larga que 8 caracteres',
        fieldStatusPass: TextFieldStatus.error,
      });
    } else if (!passState.inputValuePass.match(passwordFormat) && passState.inputValuePass !== '') {
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

  return (
    <div className={styles.container}>
      <div className={styles.formDivision}>
        <div className={styles.formContainer}>
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
              name="Password"
              onBlur={(e) => setPassState({
                ...passState,
                inputValuePass: e.target.value,
              })}
              label="Contraseña"
              type={passHidden ? 'password' : 'text'}
              rightIcon={passHidden ? ClosedEyeSVG : EyeSVG}
              onRightIconClick={() => setPassHidden(!passHidden)}
              helperText={passState.helperTextPass}
              helperIcon={xSVG}
              errorMsg
            />
          </section>

          <Button
            className={`${styles.btnIngresar} ${styles.textField}`}
            disabled={
                emailState.inputValueEmail === ''
                || passState.inputValuePass === ''
                || emailState.fieldStatusEmail === TextFieldStatus.error
                || passState.fieldStatusPass === TextFieldStatus.error
              }
          >
            Ingresar
          </Button>

          <a
            className={`${styles.textField} ${styles.link}`}
            href="http://www.google.com"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      <div className={styles.imgDivision} />
    </div>
  );
};
