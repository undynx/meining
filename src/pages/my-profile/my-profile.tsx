import { useEffect, useState, useContext } from 'react';
import { TextField } from 'common/text-field';
import { Button } from 'common/button';
import { AppContext, userActions } from 'context';
import { UpdateController } from 'networking/controllers/update-controller';
import { UpdatePassController } from 'networking/controllers/update-pass-controller';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './my-profile.module.scss';
import { ReactComponent as PencilSVG } from '../../assets/icons/pencil.svg';
import { ReactComponent as ConfirmSVG } from '../../assets/icons/confirm.svg';

type ReadonlyFieldsType = {
  firstName: boolean;
  lastName: boolean;
};

const initReadOnlyFields = {
  firstName: true,
  lastName: true,
};

type FieldStateType = {
  firstName: string,
  lastName: string,
  email: string,
};

const initFieldState = {
  firstName: '',
  lastName: '',
  email: '',
};

type PasswordFieldType = {
  password: string,
  passwordConfirmation: string,
};

const initPasswordField = {
  password: '',
  passwordConfirmation: '',
};

const MyProfile = () => {
  const [isReadOnly, setReadOnly] = useState<ReadonlyFieldsType>(initReadOnlyFields);
  const [inputValues, setInputValues] = useState<FieldStateType>(initFieldState);
  const [changePass, setChangePass] = useState(false);
  const [passInputValues, setPassInputValues] = useState<PasswordFieldType>(initPasswordField);

  const { state, dispatch } = useContext(AppContext);

  const notifyOk = () => toast.success('Usuario actualizado correctamente');
  const notifyErr = () => toast.error('Error');

  useEffect(() => {
    setInputValues({
      ...inputValues,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
    });
  }, []);

  const updateData = async () => {
    try {
      const updatedUser: User = {
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
      };

      await UpdateController.update(updatedUser);
      await dispatch({ type: userActions.USER_LOGGED, user: updatedUser });
      notifyOk();
    } catch (error) {
      notifyErr();
    }
  };

  const updatePassword = async () => {
    try {
      const updatedPassword: Password = {
        previousPassword: passInputValues.password,
        newPassword: passInputValues.passwordConfirmation,
      };

      await UpdatePassController.updatePass(updatedPassword);
      notifyOk();
    } catch (error) {
      notifyErr();
    }
  };

  return (
    <div className={styles.container}>
      <img src="src/assets/icons/profile-default.jpg" alt="default profile" className={styles.profilePic} />
      <div>
        <TextField
          name="Nombre"
          label="Nombre"
          value={inputValues.firstName}
          rightIcon={isReadOnly.firstName ? PencilSVG : ConfirmSVG}
          onRightIconClick={() => {
            if (!isReadOnly.firstName) {
              updateData();
            }
            setReadOnly({
              ...isReadOnly,
              firstName: !(isReadOnly.firstName),
            });
          }}
          onChange={(e) => {
            setInputValues({
              ...inputValues,
              firstName: e.target.value,
            });
          }}
          readonly={isReadOnly.firstName}
          className={styles.field}
        />
        <TextField
          name="Apellido"
          label="Apellido"
          value={inputValues.lastName}
          rightIcon={isReadOnly.lastName ? PencilSVG : ConfirmSVG}
          onRightIconClick={() => {
            if (!isReadOnly.lastName) {
              updateData();
            }
            setReadOnly({
              ...isReadOnly,
              lastName: !(isReadOnly.lastName),
            });
          }}
          onChange={(e) => {
            setInputValues({
              ...inputValues,
              lastName: e.target.value,
            });
          }}
          readonly={isReadOnly.lastName}
          className={styles.field}
        />
        <TextField
          name="Email"
          label="Email"
          value={inputValues.email}
          className={styles.field}
          disabled
        />
        <ToastContainer />
      </div>
      <div className={styles.passContainer}>
        <Button
          onClick={() => {
            if (changePass) {
              updatePassword();
            }
            setChangePass(!changePass);
          }}
        >
          {changePass ? 'Guardar cambios' : 'Cambiar contraseña'}
        </Button>
        {changePass
          && (
          <>
            <TextField
              name="Contraseña"
              label="Contraseña"
              placeholder="Contraseña"
              className={styles.field}
              onChange={(e) => {
                setPassInputValues({
                  ...passInputValues,
                  password: e.target.value,
                });
              }}
            />
            <TextField
              name="Confirmación de contraseña"
              label="Confirmación de contraseña"
              placeholder="Confirmación de contraseña"
              className={styles.field}
              onChange={(e) => {
                setPassInputValues({
                  ...passInputValues,
                  passwordConfirmation: e.target.value,
                });
              }}
            />
          </>
          )}
      </div>
    </div>
  );
};

export { MyProfile };
