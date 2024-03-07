import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/imgs/helarticologo2.png";
import "./login.css";
import { togglePasswordVisibility } from "../../utils/visibility";

function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const {signin, errors: signinErrors} = useAuth();

	const onSubmit = handleSubmit((data) => {
		signin(data);
		console.log(data);
	});

	return (
		<div>
			<div className="contenedor-padre">
				<div className="contenedor_fondo"></div>
				<div className="contenedor-hijo">
					<a className="btn-volver" href="/">
						<i className="bi bi-arrow-left-short"></i>
					</a>
					<img className="logo-register" src={logoImg} alt="" />
					<span className="span-title">Login</span>
					<form className="form-register" onSubmit={onSubmit}>
						<div className="input-group ident-group">
							<label htmlFor="nombres">
								<i className="bi bi-person"></i>
							</label>
							{/* <input type="text" name="nombres" id="nombres" placeholder="Nombres" /> */}
							<input
								type="number"
								{...register("user", { required: true })}
								placeholder="Identificacion"
								id="user"
							/>
						</div>
						{errors.user && <span className="errors">Identificaicon requerida!</span>}
						<div className="input-group">
							<label htmlFor="contraseña">
								<i className="bi bi-lock"></i>
							</label>
							{/* <input type="text" name="apellidos" id="apellidos" placeholder="Apellidos"/> */}
							<input
								type="password"
								{...register("password", { required: true })}
								placeholder="Contraseña"
								id="contraseña"
							/>
							<i
								className="bi bi-eye"
								id="eye-icon"
								onClick={togglePasswordVisibility}
							></i>
						</div>
            {errors.password && <span className="errors">Contraseña requerida</span>}
						{signinErrors.map((error, i) => (
						<div className="errors" key={i}>
							{error}
						</div>
					))}
						<input className="btn-Ingresar" type="submit" value="Ingresar" />
						<input
							className="btn-Registrarse"
							type="submit"
							value="Registrarse"
						/>
						<input
							className="btn-Olvido"
							type="submit"
							value="¿Olvidaste tu contraseña?"
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
