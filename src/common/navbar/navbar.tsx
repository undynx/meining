import { AppLink, RouteName } from 'routes';
import { AppContext } from 'context';
import { useContext } from 'react';

import styles from './navbar.module.scss';
import { ReactComponent as ProfileSVG } from '../../assets/icons/profile.svg';
import { ReactComponent as HomeSVG } from '../../assets/icons/home.svg';

export const Navbar = () => {
  const { state } = useContext(AppContext);

  return (
    <div className={styles.navbar}>
      <AppLink routeName={RouteName.Home}>
        <HomeSVG className={`${styles.homeIcon} ${styles.singleIcon}`} />
      </AppLink>
      <div className={styles.profileDiv}>
        {`Hola, ${state.firstName}`}
        <ProfileSVG className={`${styles.profileIcon} ${styles.singleIcon}`} />
      </div>
    </div>
  );
};
