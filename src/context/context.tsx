import {
  createContext, useReducer, ReactNode, Dispatch,
} from 'react';
import PropTypes from 'prop-types';
import { AppReducer, initialUser, UserStateType } from './context-reducer';

type AppProviderProps = {
  children: ReactNode,
};

const AppContext = createContext<{
  state: UserStateType;
  dispatch: Dispatch<any>;
}>({
  state: initialUser,
  dispatch: () => null,
});

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialUser);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
