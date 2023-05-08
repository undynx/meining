import styles from './user-card.module.scss';

export interface UserCardProps {
  name: string,
  lastname: string,
}

export const UserCard = ({ name, lastname, email }: UserCardProps) => {
  const a = 'Test';

  return (
    <div className={styles.usercard}>
      <img src="src/assets/icons/profileexample.jpg" alt="profile" className={styles.profilePicture} />
      <div className={styles.profileInfo}>
        <table>
          <tbody>
            <tr>
              <td className={styles.data}>Nombre</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td className={styles.data}>Apellido</td>
              <td>{lastname}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
