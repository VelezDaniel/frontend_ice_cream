import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	// try {
	// 	if (context) {
	// 		return context;
	// 	}
	// } catch (error) {
	// 	throw new Error(error);
	// }
	if (!context) {
		throw new Error("useAuth debe ser usado dentro de un provider");
	}
	return context;
};

// Creacion de provider (componente que engloba otros componentes)
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	// const [regInfo, setRegInfo] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(true);

	// Efecto para eliminar errores despues de 8 segundos
	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 8000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	// Metodo para register
	const signup = async (user) => {
		try {
			const res = await registerRequest(user);
			console.log("info from authContext: ", res.data);
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
			console.log("respuesta de loguinRequest: ", res, "res.data = ", res.data);
			setIsAuthenticated(true);
			setUser(res.data);
		} catch (error) {
			console.log(error);
			// if (Array.isArray(error.response.data)) {
			// 	return setErrors(error.response.data);
			// }
			setErrors([error.response.data.message]);
			console.log("error from loginRequest in signin: ", error);
		}
	};

	// Modificar estado de autenticacion
	const updateStateAuthentication = (newAuthentication) => {
		setIsAuthenticated(newAuthentication);
	};

	// Revision de login y credenciales de usuario
	useEffect(() => {
		const checkLogIn = async () => {
			const cookies = Cookies.get();

			if (!cookies.token) {
				setIsAuthenticated(false);
				setLoading(false);
				return;
			}

			try {
				const res = await verifyTokenRequest(cookies.token);
				console.log(cookies.token);
				console.log('res: ', res)
				console.log("res.data: --> ", res.data);
				// if (!res.data) {
				// 	setIsAuthenticated(false);
				// 	setLoading(false);
				// 	return;
				// }
				if(!res.data) return setIsAuthenticated(false)

				setIsAuthenticated(true);
				setUser(res.data);
				setLoading(false);
			} catch (error) {
				console.log("Error in catch from verifyToken UseEffect", error);
				setIsAuthenticated(false);
				// setUser(null);
				setLoading(false);
			}
		};
		checkLogIn();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signup,
				signin,
				user,
				isAuthenticated,
				errors,
				updateStateAuthentication,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
