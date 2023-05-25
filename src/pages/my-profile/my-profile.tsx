import { TextField } from 'common/text-field';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from 'context';

import styles from './my-profile.module.scss';
import { ReactComponent as PencilSVG } from '../../assets/icons/pencil.svg';
import { ReactComponent as ConfirmSVG } from '../../assets/icons/confirm.svg';

type ReadonlyFieldsType = {
  firstName: boolean;
  lastName: boolean;
  password: boolean;
};

const initReadOnlyFields = {
  firstName: true,
  lastName: true,
  password: true,
};

type FieldStateType = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
};

const initFieldState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const MyProfile = () => {
  const [isReadOnly, setReadOnly] = useState<ReadonlyFieldsType>(initReadOnlyFields);
  const [inputValues, setInputValues] = useState<FieldStateType>(initFieldState);

  const { state } = useContext(AppContext);

  useEffect(() => {
    setInputValues({
      ...inputValues,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: '',
    });
  });

  return (
    <div className={styles.container}>
      <img src="src/assets/icons/profile-default.jpg" alt="default profile" className={styles.profilePic} />
      <div>
        <TextField
          name="Nombre"
          placeholder="Nombre"
          value={inputValues.firstName}
          rightIcon={isReadOnly.firstName ? PencilSVG : ConfirmSVG}
          onRightIconClick={() => setReadOnly({
            ...isReadOnly,
            firstName: !(isReadOnly.firstName),
          })}
          readonly={isReadOnly.firstName}
          className={styles.field}
        />
        <TextField
          name="Apellido"
          placeholder="Apellido"
          value={inputValues.lastName}
          rightIcon={isReadOnly.lastName ? PencilSVG : ConfirmSVG}
          onRightIconClick={() => setReadOnly({
            ...isReadOnly,
            lastName: !(isReadOnly.lastName),
          })}
          readonly={isReadOnly.lastName}
          className={styles.field}
        />
        <TextField
          name="Email"
          placeholder="Email"
          value={inputValues.email}
          className={styles.field}
          disabled
        />
        <TextField
          name="Contraseña"
          placeholder="Contraseña"
          value={inputValues.password}
          rightIcon={isReadOnly.password ? PencilSVG : ConfirmSVG}
          onRightIconClick={() => setReadOnly({
            ...isReadOnly,
            password: !(isReadOnly.password),
          })}
          readonly={isReadOnly.password}
          className={styles.field}
        />
      </div>
    </div>
  );
};

export { MyProfile };
