import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import { CartContext } from "./ShoppingCartContext";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth debe ser usado dentro de un provider");
	}
	return context;
};

// Creacion de provider (componente que engloba otros componentes)
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(true);
	// Estado para controlar mensajes dependiendo el momento
	const [actionTime, setActionTime] = useState(0);
	const [cart, setCart] = useContext(CartContext);

	// Efecto para eliminar errores despues de 8 segundos
	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 8000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	useEffect(() => {
		const showToast = () => {
			if (actionTime === 2 && user === null) {
				toast("Sesión cerrada", {
					className: "toast-error-style",
					description: "Has cerrado tu cuenta correctamente",
					duration: 4000,
				});
			} else if (actionTime === 1 && user !== null) {
				toast(`Bienvenido ${user.name}`, {
					className: "toast-success-style",
					description: "Iniciaste sesión",
					duration: 3000,
				});
			}
		};
		showToast();
	}, [actionTime]);

	// Metodo para register
	const signup = async (userData) => {
		try {
			const res = await registerRequest(userData);
			const userInfo = res.data.body;
			setUser(userInfo);
			return res.data;
			// setIsAuthenticated(true);
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	// Metodo para login
	const signin = async (userCredentials) => {
		try {
			const result = await loginRequest(userCredentials);

			if (result.status === 200) {
				const userInfo = result.data.body;
				setUser(userInfo);
				setActionTime(1);
				setIsAuthenticated(true);
			} else {
				setErrors([result.message]);
			}
		} catch (error) {
			console.log("error in loguinRequest ", error);

			console.log("setError: ", errors);
			if (error.response && error.response.data) {
				const errorMessage = Array.isArray(error.response.data)
					? error.response.data[0]
					: error.response.data.body || "Error desconocido";
				setErrors([errorMessage]);
			} else {
				setErrors(["Unexpected error ocurred"]);
			}
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
				const result = await verifyTokenRequest(cookies.token);

				if (!result.data) return setIsAuthenticated(false);
				const userInformation = result.data.body;
				setIsAuthenticated(true);
				setUser(userInformation);
				setLoading(false);
			} catch (error) {
				setIsAuthenticated(false);
				setUser(null);
				setLoading(false);
			}
		};
		checkLogIn();
	}, []);

	// Cerrar la sesion
	const logout = () => {
		Cookies.remove("token");
		setUser(null);
		setIsAuthenticated(false);
		setActionTime(2);
		setCart([]);
	};

	return (
		<AuthContext.Provider
			value={{
				signup,
				signin,
				logout,
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
