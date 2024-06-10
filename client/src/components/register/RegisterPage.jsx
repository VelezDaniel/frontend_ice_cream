import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./register.css";
import CreatePassword from "./CreatePassword";
import logoImg from "../../assets/imgs/helarticologo2.png";
// import { RiContractLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
// Toast from Sonner
import { Toaster, toast } from "sonner";

function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signup, errors: registerErrors } = useAuth();

	const [userId, setUserId] = useState();
	const [registerForm, setRegisterForm] = useState(true);
	const [passwordForm, setPasswordForm] = useState(false);

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

	// const onSubmit = handleSubmit(async (values) => {
	// 	const resultSignup = await signup(values);
	// 	console.log("resultSignup: ", resultSignup);
	// 	if (resultSignup) {
	// 		return await resultSignup;
	// 	}
	// });

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
								autoComplete="off"
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
								autoComplete="off"
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
								type="number"
								autoComplete="off"
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
								autoComplete="off"
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
								placeholder="Correo"
							/>
						</div>
						{errors.email && <p className="notice">{errors.email.message}</p>}
						<div className="input-group">
							<label htmlFor="phone">
								<i className="bi bi-phone"></i>
							</label>
							<input
								type="number"
								autoComplete="off"
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

						<div className="input-group">
							<label htmlFor="address">
								<i className="bi bi-house"></i>
							</label>
							<input
								type="text"
								autoComplete="off"
								{...register("address", {
									required: {
										value: true,
										message: "Dirección es requerida",
									},
									minLength: {
										value: 6,
										message: "No es una dirección válida",
									},
								})}
								placeholder="Dirección"
							/>
						</div>
						{errors.address && (
							<p className="notice">{errors.address.message}</p>
						)}

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

						<input className="btn-enviar" type="submit" value="Continuar" />
						{Array.isArray(registerErrors) &&
							registerErrors.map((error, i) => (
								<div className="errors" key={i}>
									{error}
								</div>
							))}
					</form>
				</div>
			)}
			<Toaster />
			{/* Password Form */}
			{/* <CreatePassword insertId={insertId} /> */}
			{passwordForm && <CreatePassword insertId={userId} />}
			{/* {passwordForm && <div></div>} */}
		</div>
	);
}

export default RegisterPage;
