import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuthProvider } from "../Contexts/FakeAuthContextProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const { isAuthenticated, login, error } = useAuthProvider();
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("captainjack@blackpearl.sea");
  const [password, setPassword] = useState("WhyIsTheRumGone?!");
  const [shown, setShown] = useState(false);

  function handleSubmit(e) {
    e.preventDefault(e);
    if (email && password) login({ email, password });
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type={shown ? "text" : "password"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <span className={styles.peekContainer}>
            <input
              className={styles.peek}
              style={{ display: "inline-block" }}
              type="checkbox"
              onChange={() => setShown(!shown)}
            />
            <p>Show Password</p>
          </span>
        </div>

        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
