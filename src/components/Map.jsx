import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCityContext } from "../Contexts/ContextProvider";
import Button from "./Button";

import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../Hooks/useGeoLocation";
import useParmsLocation from "../Hooks/useParmsLocation";
import User from "./User";

function Map() {
  const { cities } = useCityContext();

  const [mapPosition, setMapPosition] = useState({
    lat: 13.080348058280157,
    lng: 80.22766113281251,
  });

  const {
    isLoading: isGeoLocationLoading,
    position: geoPosition,
    getPosition,
  } = useGeolocation(mapPosition);

  const parmsLocation = useParmsLocation(); //fetch location from url

  useEffect(
    function () {
      if (geoPosition) setMapPosition(geoPosition);
    },
    [geoPosition]
  );

  useEffect(() => {
    if (parmsLocation.lat && parmsLocation.lng) {
      setMapPosition(parmsLocation);
    }
  }, [parmsLocation, mapPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isGeoLocationLoading ? "Loading..." : "Use your position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span> {city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  // map.setView(position); //ALSO CAN BE USED INSTEAD OF FLY TO
  map.flyTo(position, map.getZoom());
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default Map;
