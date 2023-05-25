import { useState } from 'react';
import { Button } from 'common/button';
import { TextField, TextFieldStatus } from 'common/text-field';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { SignInController } from 'networking/controllers/sign-in-controller';

import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as ClosedEyeSVG } from '../../assets/icons/closed-eye.svg';
import { ReactComponent as xSVG } from '../../assets/icons/x.svg';
import { ReactComponent as SmallSpinnerSVG } from '../../assets/icons/small-spinner.svg';
import { mailFormat } from '../../helpers/utils.js';
import styles from './sign-in.module.scss';

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

export const SignIn = () => {
  const [emailState, setEmailState] = useState<EmailType>(initEmailState);
  const [passState, setPassState] = useState('');
  const [passHidden, setPassHidden] = useState(true);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const navigate = useNavigate();

  const notifyOk = () => toast.success('Usuario loggeado correctamente');
  const notifyErr = () => toast.error('Error');

  const loginUser = async () => {
    try {
      const userSignIn: SignIn = {
        email: emailState.inputValueEmail,
        password: passState,
      };

      await SignInController.signIn(userSignIn);

      notifyOk();

      setTimeout(() => {
        navigate('/users');
        setBtnIsLoading(false);
      }, 2000);
    } catch {
      setTimeout(() => {
        setBtnIsLoading(false);
      }, 500);
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

  return (
    <div className={styles.container}>
      <div className={styles.formDivision}>
        <div className={styles.formContainer}>
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
            className={styles.textField}
          />

          <TextField
            status={TextFieldStatus.default}
            name="Password"
            onBlur={(e) => setPassState(e.target.value)}
            label="Contraseña"
            type={passHidden ? 'password' : 'text'}
            rightIcon={passHidden ? ClosedEyeSVG : EyeSVG}
            onRightIconClick={() => setPassHidden(!passHidden)}
            helperIcon={xSVG}
            errorMsg
            className={styles.textField}
          />

          <Button
            className={`${styles.btnLogin} ${styles.textField}`}
            disabled={
              emailState.inputValueEmail === ''
              || passState === ''
              || emailState.fieldStatusEmail === TextFieldStatus.error
            }
            onClick={() => {
              setBtnIsLoading(true);
              loginUser();
            }}
          >
            {btnIsLoading ? <SmallSpinnerSVG className={styles.smallSpinner} /> : 'Ingresar'}
          </Button>

          <ToastContainer />

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
