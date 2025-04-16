import { useEffect, useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const CityContext = createContext();
const API_URL = "https://json-server-app-7b77.onrender.com";

function useCityContext() {
  const context = useContext(CityContext);
  return context;
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: [],
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payLoad,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payLoad,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
        currentCity: action.payLoad,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      throw new Error("Unknown Action Type");
  }
}

function ProvideContext({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchData() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${API_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({
          type: "rejected",
          payLoad: "There was an error while loading cities :(",
        });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${API_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There was an error while loading city data :(",
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${API_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There was an error posting data :(",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatch({ type: "city/deleted", payLoad: data.id });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There was an error while deleting data :(",
      });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export { ProvideContext, useCityContext };
