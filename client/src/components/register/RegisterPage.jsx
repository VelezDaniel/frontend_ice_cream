import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./register.css";
import CreatePassword from "./CreatePassword";
import logoImg from "../../assets/imgs/helarticologo2.png";
// import { registerRequest, createPassword } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signup, errors: registerErrors } = useAuth();
	// const navigate = useNavigate();

	const [userId, setUserId] = useState();
	const [registerForm, setRegisterForm] = useState(true);
	const [passwordForm, setPasswordForm] = useState(false);

	// useEffect(() => {
	// 	if (isAuthenticated) navigate("/");
	// }, [isAuthenticated]);

	const handleUserIdChange = (e) => {
		setUserId(e.target.value);
	};

	const onSubmit = handleSubmit(async (values) => {
		const resultSignup = await signup(values);
		if (resultSignup && resultSignup.status === 201) {
			setRegisterForm(false);
			setPasswordForm(true);
		}
		console.log("resultSignup: ", resultSignup);
	});

	return (
		<div className="contenedor-padre">
			<div className="contenedor_fondo"></div>
			{/* Contenedor registro */}
			{registerForm && (
				<div className="contenedor-hijo">
					<a className="btn-volver" href="/">
						<i className="bi bi-arrow-left-short"></i>
					</a>
					<img className="logo-register" src={logoImg} alt="" />
					<span>Ingresa tus datos</span>
					<form className="form-register" onSubmit={onSubmit}>
						<div className="input-group">
							<label htmlFor="name">
								<i className="bi bi-person"></i>
							</label>
							<input
								type="text"
								{...register("name", {
									required: {
										value: true,
										message: "Campo nombre es requerido",
									},
									minLength: {
										value: 2,
										message: "Nombre debe ser minimo de dos letras",
									},
									maxLength: {
										value: 25,
										message: "Nombre debe ser menor a 25 letras",
									},
								})}
								placeholder="Nombres"
							/>
						</div>
						{errors.name && <p className="notice">{errors.name.message}</p>}
						<div className="input-group">
							<label htmlFor="lastName">
								<i className="bi bi-person"></i>
							</label>
							<input
								type="text"
								{...register("lastName", {
									required: {
										value: true,
										message: "Apellidos es requerido",
									},
									minLength: {
										value: 2,
										message: "Apellido debe ser minimo de dos letras",
									},
									maxLength: {
										value: 40,
										message: "Apellido debe ser menor a 40 letras",
									},
								})}
								placeholder="Apellidos"
							/>
						</div>
						{errors.lastName && (
							<p className="notice">{errors.lastName.message}</p>
						)}
						<div className="input-group">
							<label htmlFor="identity">
								<i className="bi bi-person-vcard"></i>
							</label>
							<input
								type="text"
								{...register("identity", {
									required: {
										value: true,
										message: "Identificacion requerida",
									},
									minLength: {
										value: 6,
										message: "No es una identificacion válida",
									},
								})}
								placeholder="Documento"
								// value={userId}
								onChange={handleUserIdChange}
							/>
						</div>
						{errors.identity && (
							<p className="notice">{errors.identity.message}</p>
						)}
						<div className="input-group">
							<label htmlFor="email">
								<i className="bi bi-envelope"></i>
							</label>
							<input
								type="text"
								{...register("email", {
									required: {
										value: true,
										message: "Correo es requerido",
									},
									pattern: {
										value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
										message: "Correo no es valido",
									},
								})}
								placeholder="correo"
							/>
						</div>
						{errors.email && <p className="notice">{errors.email.message}</p>}
						<div className="input-group">
							<label htmlFor="phone">
								<i className="bi bi-phone"></i>
							</label>
							<input
								type="text"
								{...register("phone", {
									required: {
										value: true,
										message: "Celular es requerido",
									},
									minLength: {
										value: 10,
										message: "No es un celular valido",
									},
								})}
								placeholder="Celular"
							/>
						</div>
						{errors.phone && <p className="notice">{errors.phone.message}</p>}
						<label htmlFor="birth">
							<i className="bi bi-calendar3"></i> Fecha de Nacimiento
						</label>
						<input
							type="date"
							id="nacimiento"
							{...register("birth", {
								required: {
									value: true,
									message: "Fecha de nacimiento es requerida",
								},
							})}
						/>
						{errors.birth && <p className="notice">{errors.birth.message}</p>}
						<div className="input-border-none">
							<label htmlFor="terms">Terminos y condiciones</label>
							<input
								type="checkbox"
								{...register("terms", { required: true })}
							/>
						</div>
						{errors.checkbox && (
							<p className="notice">Debes aceptar los terminos</p>
						)}
						<input
							className="btn-enviar"
							type="submit"
							value="Continuar"
						></input>
						{Array.isArray(registerErrors) &&
							registerErrors.map((error, i) => (
								<div className="errors" key={i}>
									{error}
								</div>
							))}
					</form>
				</div>
			)}
			{/* Password Form */}
			{/* <CreatePassword insertId={insertId} /> */}
			{passwordForm && <CreatePassword insertId={userId} />}
			{/* {passwordForm && <div></div>} */}
		</div>
	);
}

export default RegisterPage;
