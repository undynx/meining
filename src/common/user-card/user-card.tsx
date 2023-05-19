import styles from './user-card.module.scss';

export interface UserCardProps {
  name: string,
  lastname: string,
  imageUrl: string,
  gender?: string,
  enlarged?: boolean,
  email?: string,
  dateOfBirth?: string,
  phone?: string,
}

export const UserCard = ({
  name, lastname, imageUrl, gender = 'Unkwnown', enlarged = false, email, dateOfBirth, phone,
}: UserCardProps) => (
  <div className={enlarged ? styles.usercardEnlarged : styles.usercard}>
    <img src={imageUrl} alt="profile" className={styles.profilePicture} />
    <table className={styles.profileInfo}>
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
        {enlarged && (
        <>
          <tr>
            <td className={styles.data}>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td className={styles.data}>Phone</td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td className={styles.data}>Date of Birth</td>
            <td>{dateOfBirth}</td>
          </tr>
        </>
        )}
      </tbody>
    </table>
  </div>
);
