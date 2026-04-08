import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRedirect = () => {
  const { user } = useAuth();

  const routes = {
    department: "/department/periods",
    supervisor: "/supervisor/queue",
    division: "/division/overview/current",
    strategy: "/strategy/publish",
    ceo: "/ceo/dashboard",
  };

  return <Navigate to={routes[user.role]} replace />;
};

export default RoleRedirect;