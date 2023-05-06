import { useState, useEffect } from 'react';
import { Button } from 'common/button';
import { TextField, TextFieldStatus } from 'common/text-field';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as ClosedEyeSVG } from '../../assets/icons/closed-eye.svg';
import { ReactComponent as xSVG } from '../../assets/icons/x.svg';
import { mailFormat, passwordFormat } from '../../helpers/utils.js';
import styles from './signup.module.scss';

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
  hidden: boolean;
};

const initPassState = {
  inputValuePass: '',
  helperTextPass: '',
  fieldStatusPass: TextFieldStatus.default,
  hidden: true,
};

type SignUpFormType = {
  name: string,
  lastname: string,
  email: string;
  password: string;
};

const initSignUpState = {
  name: '',
  lastname: '',
  email: '',
  password: '',
};

export const SignUp = () => {
  const [emailState, setEmailState] = useState<EmailType>(initEmailState);
  const [passState, setPassState] = useState<PassType>(initPassState);
  const [passConfirmationState, setPassConfirmationState] = useState<PassType>(initPassState);
  const [signupInfo, setSignupInfo] = useState<SignUpFormType>(initSignUpState);

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

  useEffect(() => {
    if (passState.inputValuePass !== '' && passConfirmationState.inputValuePass !== '' && passState.inputValuePass !== passConfirmationState.inputValuePass) {
      setPassConfirmationState({
        ...passConfirmationState,
        helperTextPass: 'Las contraseñas deben ser iguales',
        fieldStatusPass: TextFieldStatus.error,
      });
    } else {
      setPassConfirmationState({
        ...passConfirmationState,
        helperTextPass: '',
        fieldStatusPass: TextFieldStatus.default,
      });
    }
  }, [passConfirmationState.inputValuePass, passState.inputValuePass]);

  return (
    <div className={styles.formContainer}>

      <h1 className={styles.header1}>Crear cuenta</h1>

      <TextField
        className={styles.textField}
        name="nombre"
        label="Nombre"
        type="text"
      />

      <TextField
        className={styles.textField}
        name="apellido"
        label="Apellido"
        type="text"
      />

      <TextField
        className={styles.textField}
        name="email"
        label="Email"
        type="text"
        status={emailState.fieldStatusEmail}
        onBlur={(e) => setEmailState({
          ...emailState,
          inputValueEmail: e.target.value,
        })}
        helperText={emailState.helperTextEmail}
        helperIcon={xSVG}
      />

      <TextField
        className={styles.textField}
        status={passState.fieldStatusPass}
        name="Password"
        label="Contraseña"
        type={passState.hidden ? 'password' : 'text'}
        onBlur={(e) => setPassState({
          ...passState,
          inputValuePass: e.target.value,
        })}
        rightIcon={passState.hidden ? ClosedEyeSVG : EyeSVG}
        onRightIconClick={() => setPassState({
          ...passState,
          hidden: !passState.hidden,
        })}
        helperText={passState.helperTextPass}
        helperIcon={xSVG}
        errorMsg
      />

      <TextField
        className={styles.textField}
        name="Password confirmation"
        label="Confirmacion de contraseña"
        type={passConfirmationState.hidden ? 'password' : 'text'}
        onBlur={(e) => setPassConfirmationState({
          ...passConfirmationState,
          inputValuePass: e.target.value,
        })}
        rightIcon={passConfirmationState.hidden ? ClosedEyeSVG : EyeSVG}
        onRightIconClick={() => setPassConfirmationState({
          ...passConfirmationState,
          hidden: !passConfirmationState.hidden,
        })}
        helperText={passConfirmationState.helperTextPass}
        helperIcon={xSVG}
        errorMsg
      />

      <Button
        className={`${styles.btnIngresar} ${styles.textField}`}
        disabled={
          emailState.inputValueEmail === ''
          || emailState.fieldStatusEmail === TextFieldStatus.error
          || passState.inputValuePass === ''
          || passState.fieldStatusPass === TextFieldStatus.error
          || passConfirmationState.inputValuePass === ''
          || passConfirmationState.fieldStatusPass === TextFieldStatus.error
        }
        onClick={() => {
          localStorage.setItem(signupInfo.email, signupInfo.password);
        }}
      >
        Crear cuenta
      </Button>
    </div>
  );
};
