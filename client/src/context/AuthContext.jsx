import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";


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
	const [dashLocation, setDashLocation] = useState(null);
	const [dashAction, setDashAction] = useState(null);
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

	// Revisar contenido de user (al ser asincrono se debe usar useEffect de esta manera)
	useEffect(() => {
		console.log("User global: ", user);
	}, [user]);
	
	// Metodo para register
	const signup = async (userData) => {
		try {
			const res = await registerRequest(userData);
			console.log('res_register in authContext: ',res);
			const userInfo = res.data.body;
			console.log("UserInfo: ", userInfo);
			setUser(userInfo);
			return res.data;
			// setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			setErrors(error.response.data);
		}
	};

	// Metodo para login
	const signin = async (userCredentials) => {
		try {
			const result = await loginRequest(userCredentials);
			console.log("respuesta de loguinRequest: ", result, "res.data = ", result.data);
			const userInfo = result.data.body;
			console.log(`UserInfo:  ${userInfo}`);
			setUser(userInfo);
			console.log("user credentials from authcontext: ", userCredentials);
			setIsAuthenticated(true);
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

	const updateDashBoardLocation = (newLocation) => {
		setDashLocation(newLocation);
	}

	const updateDashBoardAction = (newAction) => {
		setDashAction(newAction);
	}

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
				console.log(cookies.token);
				console.log("res: ", result);
				console.log("res.data: --> ", result.data.body);
				// if (!res.data) {
				// 	setIsAuthenticated(false);
				// 	setLoading(false);
				// 	return;
				// }
				if (!result.data) return setIsAuthenticated(false);
				const userInformation = result.data.body;
				setIsAuthenticated(true);
				setUser(userInformation);
				setLoading(false);
			} catch (error) {
				console.log("Error in catch from verifyToken UseEffect", error);
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
	}

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