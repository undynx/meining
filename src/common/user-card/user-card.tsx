import styles from './user-card.module.scss';

export interface UserCardProps {
  name: string,
  lastname: string,
  imageUrl: string,
  gender?: string,
}

export const UserCard = ({
  name, lastname, imageUrl, gender = 'Unkwnown',
}: UserCardProps) => (
  <div className={styles.usercard}>
    <img src={imageUrl} alt="profile" className={styles.profilePicture} />
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
          <tr>
            <td className={styles.data}>Gender</td>
            <td>{gender}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
