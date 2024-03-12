import { useState, useEffect } from "react";
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
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmitPass = handleSubmit( async (e) => {
		// e.preventDefault();

		try {
			console.log("Password:", password);
			console.log("Confirm Password:", confirmPassword);

			if (password !== confirmPassword) {
				setPasswordError("Contraseñas no coinciden");
				return;
			}

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

			console.log(
				`Insert Id (proviene de password form): ${insertId}, / UserInfo post query = ${userInfo}`
			);
		} catch (error) {
			console.log(error);
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
						{...register("password", { required: true })}
						value={password}
						onChange={handlePasswordChange}
						placeholder="Contraseña"
						id="password"
					/>
					{passwordError && <p>{passwordError}</p>}
				</div>
				<div className="input-group">
					<label htmlFor="confirmPassword">
						<i className="bi bi-lock"></i>
					</label>
					<input
						type="password"
						{...register("confirmPass", { required: true })}
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						placeholder="Confirmar contraseña"
						id="confirmPassword"
					/>
				</div>
				<input className="btn-enviar" type="submit" value="Confirmar"></input>
			</form>
		</div>
	);
}

export default CreatePassword;
