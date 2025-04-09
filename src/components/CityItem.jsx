import { useCityContext } from "../Contexts/ContextProvider";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import FlagEmoji from "./flagEmoji";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCityContext();
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <Link
      className={`${styles.cityItem} ${
        currentCity.id === id ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${lat}&lng=${lng}`}
    >
      <span className={styles.emoji}>
        <FlagEmoji countryCode={emoji} />
      </span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handleClick}>
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
