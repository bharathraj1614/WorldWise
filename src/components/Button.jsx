import styles from "./Button.module.css";
function Button({ children, btnType, onClick, type }) {
  return (
    <button
      type={btnType ? btnType : ""}
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
