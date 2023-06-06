import { userActions } from './actions';

export type UserStateType = {
  firstName: string,
  lastName: string,
  email: string,
  token: string,
  logged: boolean,
};

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  token: '',
  logged: false,
};

type Action = {
  type: string,
  user: UserStateType,
};

const AppReducer = (state: UserStateType, action: Action) => {
  switch (action.type) {
    case userActions.USER_LOGGED:
      return {
        ...state,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        token: action.user.token,
        logged: true,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { initialUser, AppReducer };
