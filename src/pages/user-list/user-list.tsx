import { useEffect, useState, useMemo } from 'react';
import { UserCard } from 'common/user-card';
import { Spinner } from 'common/spinner';
import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/routes';
import { TextField } from 'common/text-field';
import debounce from 'lodash.debounce';
import { ReactComponent as SearchSVG } from '../../assets/icons/search.svg';
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
  const [searchValue, setSearchValue] = useState('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedResults = useMemo(() => debounce(handleChange, 1000), []);

  return (
    <div className={styles.container}>

      {isLoading
        ? (
          <Spinner />
        )
        : (

          <div className={styles.listContainer}>
            <div className={styles.searchBarContainer}>
              <TextField
                name="Search bar"
                onChange={debouncedResults}
                placeholder="Search"
                className={styles.searchBar}
                leftIcon={SearchSVG}
              />
            </div>
            <div className={styles.cardContainer}>
              {searchValue === '' ? users
                && users.map((user) => (
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
                ))
                : users && users.filter((user) => user
                  .firstName.toLowerCase().match(searchValue.toLowerCase())
                || user.lastName.toLowerCase().match(searchValue.toLowerCase()))
                  .map((filteredUser: UserType) => (
                    <AppLink
                      routeName={RouteName.UserProfile}
                      pathParams={{ id: filteredUser.id }}
                      className={styles.userLinks}
                    >
                      <UserCard
                        key={filteredUser.id}
                        name={filteredUser.firstName}
                        lastname={filteredUser.lastName}
                        imageUrl={filteredUser.picture}
                        gender={getGender(filteredUser.title)}
                      />
                    </AppLink>
                  ))}
            </div>
          </div>

        )}
    </div>
  );
};
