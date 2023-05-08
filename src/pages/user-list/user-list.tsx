import { useEffect, useState } from 'react';
import { UserCard } from 'common/user-card';

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://dummyapi.io/data/v1/user?limit=10', {
      headers: {
        'app-id': '645945fa70a1298f9606d753',
      },
    })
      .then((response) => response.json())
      .then((user) => setUsers(user));
  }, [users]);

  return (
    <>
      <UserCard name="Maite" lastname="Martinez" />
      <UserCard name="Otra" lastname="Ejemplo" />
    </>
  );
};
