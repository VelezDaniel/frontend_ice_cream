import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./register.css";
import logoImg from "../../assets/imgs/helarticologo2.png";
import { createPassword } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreatePassword({ insertId }) {
	const navigate = useNavigate();

	const { updateStateAuthentication, isAuthenticated } = useAuth();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// const { isAuthenticated, setIsAuthenticated } = useAuth();
	// const { isAuthenticated, setIsAuthenticated } = useState(false)

	useEffect(() => {
		if (isAuthenticated) navigate("/");
	}, [isAuthenticated]);

	// const user = userId;
	console.log("userId: ", insertId);
	// console.log("user: ", user);

	const handleSubmitPass = handleSubmit(async (e) => {
		// e.preventDefault();

		try {
			const userInfo = {
				user: insertId,
				password: password,
				confirmPassword: confirmPassword,
			};

			console.log("UserInfo:", userInfo);

			const res = await createPassword(userInfo);
			updateStateAuthentication(true);
			console.log("Response of createPassword:", res);
			console.log("Response data of createPassword:", res.data);
			console.log("Insert Id from createPassword:", res.insertId);

			// setPassword("");

			console.log(
				`Insert Id (proviene de password form): ${insertId}, / UserInfo post query = ${userInfo}`
			);
		} catch (error) {
			console.log("Error from createPassword: ", error);
		}
	});

	return (
		<div className="contenedor-hijo create-password">
			<a className="btn-volver" href="/">
				<i className="bi bi-arrow-left-short"></i>
			</a>
			<img className="logo-register" src={logoImg} alt="logo helartico" />
			<form className="form-register" onSubmit={handleSubmitPass}>
				<div className="input-group">
					<label htmlFor="password">
						<i className="bi bi-lock"></i>
					</label>
					<input
						type="password"
						{...register("password", {
							required: {
								value: true,
								message: "Se requiere la contraseña",
							},
							minLength: {
								value: 5,
								message: "La contraseña debe tener minimo 5 caracteres",
							},
							maxLength: {
								value: 20,
								message: "La contraseña no puede ser mayor a 20 caracteres",
							},
						})}
						placeholder="Contraseña"
						id="password"
					/>
				</div>
				{errors.password && <p className="notice">{errors.password.message}</p>}
				<div className="input-group">
					<label htmlFor="confirmPassword">
						<i className="bi bi-lock"></i>
					</label>
					<input
						type="password"
						{...register("confirmPass", {
							required: {
								value: true,
								message: "Se requiere confirmar la contraseña",
							},
							minLength: {
								value: 5,
								message: "La contraseña debe tener minimo 5 caracteres",
							},
							maxLength: {
								value: 20,
								message: "La contraseña no puede ser mayor a 20 caracteres",
							},
							validate: (value) =>
								value === watch("password") || "Las contraseñas no coinciden",
						})}
						placeholder="Confirmar contraseña"
						id="confirmPassword"
					/>
					{errors.confirmPass && (
						<p className="notice">{errors.confirmPass.message}</p>
					)}
				</div>
				<input className="btn-enviar" type="submit" value="Confirmar" />
			</form>
		</div>
	);
}

export default CreatePassword;
