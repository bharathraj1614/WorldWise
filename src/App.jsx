import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FakeAuthContextProvider } from "./Contexts/FakeAuthContextProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy } from "react";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
import Form from "./components/Form";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <>
      <FakeAuthContextProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="cities" element={<CityList />} />
              <Route path="form" element={<Form />} />
              <Route path="countries" element={<CountryList />} />
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities/:id" element={<City />} />
            </Route>
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </FakeAuthContextProvider>
    </>
  );
}

export default App;
