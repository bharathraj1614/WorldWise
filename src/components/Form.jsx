// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import Spinner from "./Spinner";
import styles from "./Form.module.css";
import ButtonBack from "./ButtonBack";
import Message from "./Message";
import useParmsLocation from "../Hooks/useParmsLocation";
import FlagEmoji from "./FlagEmoji";
import { useCityContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

function Form() {
  const { createCity, isLoading } = useCityContext();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isCityDetailsLoading, setIsCityDetailsLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");

  const { lat, lng } = useParmsLocation(); //fetch location from url

  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchData() {
        try {
          setIsCityDetailsLoading(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That dosen't seems to be a country, please select some where else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode.toLowerCase());
          setCountryCodeError("");
        } catch (error) {
          setCountryCodeError(error.message);
        } finally {
          setIsCityDetailsLoading(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app", { replace: true });
  }

  if (isCityDetailsLoading) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (countryCodeError) return <Message message={countryCodeError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <FlagEmoji countryCode={emoji} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
