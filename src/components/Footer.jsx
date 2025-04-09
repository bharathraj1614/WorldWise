import styles from "./Sidebar.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyrights}>
        &copy; Copy rights {new Date().getFullYear()} by WorldWise Inc.
      </div>
    </footer>
  );
}

export default Footer;
