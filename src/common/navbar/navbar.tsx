import { AppLink, RouteName } from 'routes';

import styles from './navbar.module.scss';
import { ReactComponent as ProfileSVG } from '../../assets/icons/profile.svg';
import { ReactComponent as HomeSVG } from '../../assets/icons/home.svg';

export const Navbar = () => (
  <div className={styles.navbar}>
    <AppLink routeName={RouteName.Home}>
      <HomeSVG className={`${styles.homeIcon} ${styles.singleIcon}`} />
    </AppLink>
    <div className={styles.profileDiv}>
      Hola, TuNombre!
      <ProfileSVG className={`${styles.profileIcon} ${styles.singleIcon}`} />
    </div>
  </div>
);
