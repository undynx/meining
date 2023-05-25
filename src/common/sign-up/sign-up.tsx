import { useState } from 'react';
import { Button } from 'common/button';
import { TextField, TextFieldStatus } from 'common/text-field';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignUpController } from 'networking/controllers/sign-up-controller';

import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as ClosedEyeSVG } from '../../assets/icons/closed-eye.svg';
import { ReactComponent as xSVG } from '../../assets/icons/x.svg';
import { ReactComponent as SmallSpinnerSVG } from '../../assets/icons/small-spinner.svg';
import { mailFormat, passwordFormat } from '../../helpers/utils.js';
import styles from './sign-up.module.scss';

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
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const notifyOk = () => toast.success('Usuario creado correctamente');
  const notifyErr = () => toast.error('Error');

  const createUser = async () => {
    try {
      const userSignUp: SignUp = {
        firstName: signupInfo.name,
        lastName: signupInfo.lastname,
        email: signupInfo.email,
        password: signupInfo.password,
      };

      setBtnIsLoading(true);
      await SignUpController.SignUp(userSignUp);
      setBtnIsLoading(false);

      notifyOk();
    } catch {
      setBtnIsLoading(false);
      notifyErr();
    }
  };

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

  const checkPassConfirmationValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && e.target.value !== '' && passState.inputValuePass !== e.target.value) {
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
  };

  return (
    <div className={styles.formContainer}>

      <h1 className={styles.header1}>Crear cuenta</h1>

      <TextField
        className={styles.textField}
        name="Name"
        label="Nombre"
        type="text"
        onChange={(e) => setSignupInfo({
          ...signupInfo,
          name: e.target.value,
        })}
      />

      <TextField
        className={styles.textField}
        name="Lastname"
        label="Apellido"
        type="text"
        onChange={(e) => setSignupInfo({
          ...signupInfo,
          lastname: e.target.value,
        })}
      />

      <TextField
        className={styles.textField}
        name="email"
        label="Email"
        type="text"
        status={emailState.fieldStatusEmail}
        onChange={(e) => {
          setEmailState({
            ...emailState,
            inputValueEmail: e.target.value,
          });
          setSignupInfo({
            ...signupInfo,
            email: e.target.value,
          });
        }}
        onBlur={(e) => checkEmailValidation(e)}
        helperText={emailState.helperTextEmail}
        helperIcon={xSVG}
        errorMsg
      />

      <TextField
        className={styles.textField}
        status={passState.fieldStatusPass}
        name="Password"
        label="Contraseña"
        type={passState.hidden ? 'password' : 'text'}
        onChange={(e) => {
          setPassState({
            ...passState,
            inputValuePass: e.target.value,
          });
          setSignupInfo({
            ...signupInfo,
            password: e.target.value,
          });
        }}
        onBlur={(e) => checkPassValidation(e)}
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
        status={passConfirmationState.fieldStatusPass}
        name="Password confirmation"
        label="Confirmacion de contraseña"
        type={passConfirmationState.hidden ? 'password' : 'text'}
        onChange={(e) => setPassConfirmationState({
          ...passConfirmationState,
          inputValuePass: e.target.value,
        })}
        onBlur={(e) => checkPassConfirmationValidation(e)}
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
          signupInfo.name === ''
          || signupInfo.lastname === ''
          || signupInfo.email === ''
          || emailState.fieldStatusEmail === TextFieldStatus.error
          || passState.inputValuePass === ''
          || passState.fieldStatusPass === TextFieldStatus.error
          || passConfirmationState.inputValuePass === ''
          || passConfirmationState.fieldStatusPass === TextFieldStatus.error
          || btnIsLoading
        }
        onClick={() => {
          localStorage.setItem(signupInfo.email, signupInfo.password);
          createUser();
        }}
      >
        {btnIsLoading ? <SmallSpinnerSVG className={styles.smallSpinner} /> : 'Crear cuenta'}
      </Button>
      <ToastContainer />
    </div>
  );
};
