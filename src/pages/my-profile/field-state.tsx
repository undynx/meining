/* import { useContext } from 'react';
import { AppContext } from 'context';

const { state } = useContext(AppContext); */

export type FieldStateType = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
};

const initFieldState = {
  firstName: 'password',
  lastName: 'password',
  email: 'password',
  password: 'password',
};

export { initFieldState };
