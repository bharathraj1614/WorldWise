import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../Contexts/FakeAuthContextProvider";
import styles from "./User.module.css";

function User() {
  const { userData, logout } = useAuthProvider();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={userData.avatar} alt={userData.name} />
      <span>Welcome, {userData.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
