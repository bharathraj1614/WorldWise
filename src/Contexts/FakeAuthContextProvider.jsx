import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const FakeAuthContext = createContext();

function useAuthProvider() {
  return useContext(FakeAuthContext);
}

const FakeUserData = {
  name: "Captain-Jack Sparrow",
  email: "captainjack@blackpearl.sea",
  password: "WhyIsTheRumGone?!",
  avatar:
    "https://lumiere-a.akamaihd.net/v1/images/e12c6b042ba46e43697492be6bce82e81409abd7.jpeg?region=0,0,450,450&width=320",
};

const initialState = {
  userData: {},
  isAuthenticated: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        userData: { ...action.payLoad },
        isAuthenticated: true,
        error: null,
      };
    case "logout":
      return initialState;
    case "rejected":
      return {
        ...state,
        error: action.payLoad,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function FakeAuthContextProvider({ children }) {
  const [{ userData, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "login", payLoad: JSON.parse(storedUser) });
    }
    setIsLoading(false);
  }, []);

  function login(formData) {
    if (
      formData.email === FakeUserData.email &&
      formData.password === FakeUserData.password
    ) {
      localStorage.setItem("user", JSON.stringify(FakeUserData));
      dispatch({ type: "login", payLoad: FakeUserData });
    } else {
      dispatch({
        type: "rejected",
        payLoad: "The provided email or password is incorrect",
      });
    }
  }

  function logout() {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider
      value={{ userData, isAuthenticated, login, logout, error, isLoading }}
    >
      {children}
    </FakeAuthContext.Provider>
  );
}

export { FakeAuthContextProvider, useAuthProvider };
