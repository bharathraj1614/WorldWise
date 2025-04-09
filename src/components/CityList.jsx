import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCityContext } from "../Contexts/ContextProvider";
export default function CityList() {
  const { cities, isLoading } = useCityContext();
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Start selecting the places You've visited" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
