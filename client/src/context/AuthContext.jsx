import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	try {
		if (context) {
			return context;
		}
	} catch (error) {
		throw new Error(error);
	}
	// if (!context) {
	// 	throw new Error("useAuth debe ser usado dentro de un provider");
	// }
	// return context;
};

// Creacion de provider (componente que engloba otros componentes)
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setErrors] = useState([]);

	// Metodo para register
	const signup = async (user) => {
		try {
			const res = await registerRequest(user);
			console.log("info from authContext: ",res.data);
			setUser(res.data);
			// setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			setErrors(error.response.data);
		}
	};

	// Metodo para login
	const signin = async (user) => {
		try {
			const res = await loginRequest(user);
			console.log("respuesta de loguinRequest: ", res);
		} catch (error) {
			// setErrors(error.response.data);
			console.log("error from loginRequest in signin: ", error);
		}
	};

	// Modificar estado de autenticacion
	const updateStateAuthentication = (newAuthentication) => {
		setIsAuthenticated(newAuthentication);
	}

	// Efecto para eliminar errores despues de 8 segundos
	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 8000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	return (
		<AuthContext.Provider
			value={{
				signup,
				signin,
				user,
				isAuthenticated,
				errors,
				updateStateAuthentication,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
