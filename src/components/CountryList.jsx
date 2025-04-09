import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCityContext } from "../Contexts/ContextProvider";

function CountryList() {
  const { cities, isLoading } = useCityContext();
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Start selecting the places You've visited" />;
  const countries = cities.reduce(
    (arr, city) =>
      !arr.map((el) => el.country).includes(city.country)
        ? [...arr, { country: city.country, emoji: city.emoji }]
        : arr,
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
