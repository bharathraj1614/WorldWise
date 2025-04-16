import { useAuthProvider } from "../Contexts/FakeAuthContextProvider";
import { Navigate } from "react-router-dom";
import SpinnerFullPage from "../components/SpinnerFullPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthProvider();

  if (isLoading) return <SpinnerFullPage />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
