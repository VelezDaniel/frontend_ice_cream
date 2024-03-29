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

	// const handleSubmitData = handleSubmit(async (values) => {
	// 	try {
	// 		// console.log(`values: ${values}`);
	// 		const res = await registerRequest(values);
	// 		console.log(`response of registerRequest: ${res}`);
	// 		setUserId(res.insertId);
	// 		setRegisterForm(false);
	// 		setPasswordForm(true)
	// 	} catch (error) {
	// 		console.log("Error durante el registro:", error);
	// 	}
	// });

	const onSubmit = handleSubmit(async (values) => {
		setRegisterForm(false);
		setPasswordForm(true);
		await signup(values);
	});

	// const handleSubmitPass = async () => {
	// 	// e.preventDefault();

	// 	try {
	// 		console.log("Password:", password);
	// 		console.log("Confirm Password:", confirmPassword);

	// 		// if (password !== confirmPassword) {
	// 		// 	setPasswordError("Contraseñas no coinciden");
	// 		// 	return;
	// 		// }

	// 		const userInfo = {
	// 			user: userId,
	// 			password: password,
	// 			confirmPassword: confirmPassword,
	// 		};

	// 		console.log("UserInfo:", userInfo);

	// 		const result = await createPassword(userInfo);

	// 		console.log("Response of createPassword:", result);
	// 		console.log("Response data of createPassword:", result.data);
	// 		console.log("Insert Id from createPassword:", result.insertId);

	// 		console.log(
	// 			`Insert Id (proviene de register form): ${insertId}, / UserInfo post query = ${userInfo}`
	// 		);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

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
								{...register("name", { required: true })}
								placeholder="Nombres"
							/>
						</div>
						{errors.name && <p className="notice">Campo nombres requerido</p>}
						<div className="input-group">
							<label htmlFor="lastName">
								<i className="bi bi-person"></i>
							</label>
							<input
								type="text"
								{...register("lastName", { required: true })}
								placeholder="Apellidos"
							/>
						</div>
						{errors.lastName && (
							<p className="notice">Campo apellidos requerido</p>
						)}
						<div className="input-group">
							<label htmlFor="identity">
								<i className="bi bi-person-vcard"></i>
							</label>
							<input
								type="text"
								{...register("identity", { required: true })}
								placeholder="Documento"
								// value={userId}
								onChange={handleUserIdChange}
							/>
						</div>
						{errors.identity && (
							<p className="notice">Campo Documento requerido</p>
						)}
						<div className="input-group">
							<label htmlFor="email">
								<i className="bi bi-envelope"></i>
							</label>
							<input
								type="text"
								{...register("email", { required: true })}
								placeholder="correo"
							/>
						</div>
						{errors.email && <p className="notice">Campo correo requerido</p>}
						<div className="input-group">
							<label htmlFor="phone">
								<i className="bi bi-phone"></i>
							</label>
							<input
								type="text"
								{...register("phone", { required: true })}
								placeholder="Celular"
							/>
						</div>
						{errors.phone && <p className="notice">Campo Celular requerido</p>}
						<label htmlFor="birth">
							<i className="bi bi-calendar3"></i> Fecha de Nacimiento
						</label>
						<input type="date" {...register("birth", { required: true })} />
						{errors.birth && (
							<p className="notice">Campo nacimiento requerido</p>
						)}
						<input
							className="btn-enviar"
							type="submit"
							value="Continuar"
						></input>
						{registerErrors.map((error, i) => (
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
