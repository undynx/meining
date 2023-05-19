import { useEffect, useState } from 'react';
import { UserCard } from 'common/user-card';
import { Spinner } from 'common/spinner';
import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/routes';
import styles from './user-list.module.scss';

type UserType = {
  id: string,
  title: string,
  firstName: string,
  lastName: string,
  picture: string,
};

export const UserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);

  const getUsersData = async () => {
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
    getUsersData();
  }, []);

  const getGender = (title: string) => {
    let gender: string;
    if (title === 'ms' || title === 'miss') {
      gender = 'Female';
    } else if (title === 'mr' || title === 'mrs') {
      gender = 'Male';
    } else {
      gender = 'Unknown';
    }
    return gender;
  };

  return (
    <div className={styles.container}>
      {isLoading
        ? (
          <Spinner />
        )
        : (
          <div className={styles.cardContainer}>
            {users
              && users.map((user) => {
                if (user !== null) {
                  return (
                    <AppLink
                      routeName={RouteName.UserProfile}
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
                  );
                }

                return null;
              })}
          </div>
        )}
    </div>

  );
};
