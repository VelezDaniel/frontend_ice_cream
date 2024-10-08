import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/imgs/helarticologo2.png";
import "./login.css";
import { togglePasswordVisibility } from "../../utils/visibility";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signin, logout, errors: signinErrors, isAuthenticated, user } = useAuth();
	const navigate = useNavigate();

	const onSubmit = handleSubmit((data) => {
		signin(data);
	});

	useEffect(() => {
		if (isAuthenticated && user && user.role) {
			if(user.state !== "ACTIVO") {
				logout();
			}
			switch (user.role) {
				case "CLIENTE":
					navigate("/");
					break;
				case "RECEPCIONISTA":
					navigate("/");
					break;
				case "TESORERO":
					navigate("/dashboard");
					break;
				case "DOMICILIARIO":
					navigate("/dashboard");
					break;
				case "ADMINISTRADOR":
					navigate("dashboard");
					break;
				case "DEVP":
					navigate("/dashboard");
				default:
					navigate("/");
					break;
			}
		}
	}, [isAuthenticated]);

	return (
		<div>
			<div className="contenedor-padre">
				<div className="contenedor_fondo"></div>
				<div className="contenedor-hijo">
					<a className="btn-volver" href="/">
						<i className="bi bi-arrow-left-short"></i>
					</a>
					<img className="logo-register" src={logoImg} alt="logo" />
					<span className="span-title">Login</span>
					<form className="form-register" onSubmit={onSubmit}>
						<div className="input-group ident-group">
							<label htmlFor="nombres">
								<i className="bi bi-person"></i>
							</label>
							<input
								type="number"
								autoComplete="off"
								{...register("identity", { required: true })}
								placeholder="Identificacion"
								id="identity"
							/>
						</div>
						{errors.identity && (
							<span className="notice">Identificaicon requerida!</span>
						)}
						<div className="input-group">
							<label htmlFor="contrasena">
								<i className="bi bi-lock"></i>
							</label>
							<input
								type="password"
								{...register("password", { required: true })}
								placeholder="Contraseña"
								id="contrasena"
							/>
							<i
								className="bi bi-eye"
								id="eye-icon"
								onClick={togglePasswordVisibility}
							></i>
						</div>
						{errors.password && (
							<span className="notice">Contraseña requerida</span>
						)}
						{signinErrors.map((error, i) => (
							<p className="notice" key={i}>
								{error}
							</p>
						))}
						<input className="btn-Ingresar" type="submit" value="Ingresar" />
						<Link className="btn-Registrarse" to="/register">
							Registrarse
						</Link>
						<a className="btn-Olvido">¿Olvidaste tu contraseña?</a>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
