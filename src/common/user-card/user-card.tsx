import styles from './user-card.module.scss';

export const UserCard = () => {
  const a = 'Test';

  return (
    <div className={styles.usercard}>
      <img src="src/assets/icons/profileexample.jpg" alt="profile" className={styles.profilePicture} />
      <div className={styles.profileInfo}>
        <table>
          <tr>
            <td className={styles.data}>Nombre</td>
            <td>Pepe</td>
          </tr>
          <tr>
            <td className={styles.data}>Apellido</td>
            <td>Otro</td>
          </tr>
          <tr>
            <td className={styles.data}>Email</td>
            <td>pepe@mail.com</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
