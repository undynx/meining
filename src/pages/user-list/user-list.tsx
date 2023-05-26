import { useEffect, useState, useMemo } from 'react';
import { UserCard } from 'common/user-card';
import { Spinner } from 'common/spinner';
import { AppLink } from 'routes/app-link';
import { RouteName } from 'routes/routes';
import { TextField } from 'common/text-field';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';
import axios from 'axios';
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
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const notifyErr = () => toast.error('Error');

  const getUsersData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://dummyapi.io/data/v1/user', {
        headers: {
          'app-id': '645945fa70a1298f9606d753',
        },
      });
      setIsLoading(false);
      setUsers(response.data.data);
    } catch {
      setIsLoading(false);
      notifyErr();
    }
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

  const userCard = (user: UserType) => (
    <AppLink
      key={user.id}
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

  const cardContainer = () => {
    if (users) {
      if (searchValue) {
        return (
          users.filter((user) => user.firstName.toLowerCase().match(searchValue.toLowerCase())
          || user.lastName.toLowerCase().match(searchValue.toLowerCase()))
            .map((filteredUser: UserType) => (
              userCard(filteredUser)
            )));
      }

      return users.map((user) => (
        userCard(user)
      ));
    }

    return null;
  };

  if (isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <div className={styles.container}>
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
          {cardContainer()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
