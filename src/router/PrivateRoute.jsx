import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import UseAuth from "../hooks/UseAuth";

const PrivateRoute = ({ children }) => {
    const location = useLocation()
  const { user, loading } = UseAuth();
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;
