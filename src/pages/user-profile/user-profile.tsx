import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserCard } from 'common/user-card';
import { Spinner } from 'common/spinner';
import styles from './user-profile.module.scss';

type UserType = {
  id: string,
  title: string,
  firstName: string,
  lastName: string,
  picture: string,
  email: string,
  phone: string,
  dateOfBirth: string,
};

const initUser = {
  id: '',
  title: '',
  firstName: '',
  lastName: '',
  picture: '',
  email: '',
  phone: '',
  dateOfBirth: '',
};

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<UserType>(initUser);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    fetch(`https://dummyapi.io/data/v1/user/${id}`, {
      headers: {
        'app-id': '645945fa70a1298f9606d753',
      },
    }).then((response) => response.json())
      .then((response) => {
        setUser(response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading
        ? (
          <Spinner />
        )
        : (
          <UserCard
            key={user.id}
            name={user.firstName}
            lastname={user.lastName}
            imageUrl={user.picture}
            email={user.email}
            phone={user.phone}
            dateOfBirth={user.dateOfBirth}
            enlarged
          />
        )}
    </div>
  );
};
