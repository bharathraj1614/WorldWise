import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import { ProvideContext } from "../Contexts/ContextProvider";
import User from "../components/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <ProvideContext>
        <Sidebar />
        <Map />
        <User />
      </ProvideContext>
    </div>
  );
}

export default AppLayout;
