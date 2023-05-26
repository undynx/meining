import styles from './spinner.module.scss';

export const Spinner = () => (
  <div className={styles.imgContainer}>
    <img src="/src/assets/icons/spinner.gif" alt="Spinner" className={styles.spinnerImg} />
  </div>
);
