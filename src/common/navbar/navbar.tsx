import { AppLink, RouteName } from 'routes';
import { AppContext, userActions } from 'context';
import { useContext } from 'react';

import styles from './navbar.module.scss';
import { ReactComponent as ProfileSVG } from '../../assets/icons/profile.svg';
import { ReactComponent as HomeSVG } from '../../assets/icons/home.svg';
import { ReactComponent as LogOutSVG } from '../../assets/icons/log-out.svg';

export const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className={styles.navbar}>
      <AppLink routeName={RouteName.UserList}>
        <HomeSVG className={`${styles.homeIcon} ${styles.singleIcon}`} />
      </AppLink>
      <div className={styles.profileDiv}>
        {`Hola, ${state.firstName}`}
        <AppLink routeName={RouteName.MyProfile}>
          <ProfileSVG className={`${styles.profileIcon} ${styles.singleIcon}`} />
        </AppLink>
        <AppLink routeName={RouteName.Login}>
          <LogOutSVG
            className={`${styles.logoutIcon} ${styles.singleIcon}`}
            onClick={async () => {
              await dispatch({ type: userActions.USER_LOGGED_OUT });
            }}
          />
        </AppLink>
      </div>
    </div>
  );
};
