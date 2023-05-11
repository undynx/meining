import { useEffect, useState } from 'react';
import { UserCard } from 'common/user-card';
import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/routes';
import styles from './userlist.module.scss';

export const UserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUSersData = async () => {
    fetch('https://dummyapi.io/data/v1/user?limit=10', {
      headers: {
        'app-id': '645945fa70a1298f9606d753',
      },
    }).then((response) => response.json())
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUSersData();
  }, []);

  function getGender(title: string) {
    let gender: string;
    if (title === 'ms' || title === 'miss') {
      gender = 'Female';
    } else if (title === 'mr' || title === 'mrs') {
      gender = 'Male';
    } else {
      gender = 'Unknown';
    }
    return gender;
  }

  return (
    <div className={styles.container}>
      {isLoading
        ? (
          <div className={styles.imgContainer}>
            <img src="src/assets/icons/spinner.gif" alt="Spinner" className={styles.spinnerImg} />
          </div>
        )
        : (
          <div className={styles.cardContainer}>
            {users
              && users.map((user) => (
                <AppLink
                  routeName={RouteName.UserCard}
                  pathParams={{ id: user.id }}
                  className={styles.userLinks}
                >
                  <UserCard
                    key={user.id}
                    name={user.firstName}
                    lastname={user.lastName}
                    imageUrl={user.picture}
                    gender={getGender(user.title)}
                  />
                </AppLink>
              ))}
          </div>
        )}
    </div>

  );
};
