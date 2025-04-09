import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { FakeAuthContextProvider } from "./Contexts/FakeAuthContextProvider";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <FakeAuthContextProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </FakeAuthContextProvider>
    </>
  );
}

export default App;
