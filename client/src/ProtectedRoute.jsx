import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
	const { loading, isAuthenticated, user } = useAuth();
  if(loading) return <h1>Cargando Página... unos segundos</h1>
	if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
	if(user && user.role === "CLIENTE") return <Navigate to={"/"} />

	return (
		// Componente especial que redirecciona a la ruta elegida por el usuario
		<Outlet />
	);
}

export default ProtectedRoute;
