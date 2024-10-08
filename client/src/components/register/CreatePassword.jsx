import { useForm } from "react-hook-form";
import "./register.css";
import logoImg from "../../assets/imgs/helarticologo2.png";
import { createPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";

function CreatePassword({ insertId }) {
	const navigate = useNavigate();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleSubmitPass = handleSubmit(async (values) => {

		try {
			const userInfo = {
				user: insertId,
				password: values.password,
				confirmPassword: values.confirmPassword,
			};

			const res = await createPassword(userInfo);

			if(res.data.body.message == "Data save succesfully") {
				navigate("/login");
			} else {
				navigate("/register");
			}

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
				</div>
					{errors.confirmPass && (
						<p className="notice">{errors.confirmPass.message}</p>
					)}
				<input className="btn-enviar" type="submit" value="Confirmar" />
			</form>
		</div>
	);
}

export default CreatePassword;
