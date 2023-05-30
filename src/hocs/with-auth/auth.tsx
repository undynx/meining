import { GetUserController } from 'networking/controllers/get-user-controller';
import { AppContext, userActions } from 'context';
import { useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserSerializer } from 'networking/serializers/get-user-serializer';

type ChildrenProps = {
  children: ReactNode,
};

const Auth = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const authenticate = async () => {
    try {
      const user = await GetUserController.me();
      await dispatch({
        type: userActions.USER_LOGGED,
        user: GetUserSerializer.deSerialize(user.data),
      });
    } catch {
      await dispatch({ type: userActions.USER_LOGGED_OUT });
      navigate('/');
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

export { Auth };
