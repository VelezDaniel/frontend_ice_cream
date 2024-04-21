import "./usersettings.css";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { IoIceCreamOutline } from "react-icons/io5";
import { updatePersonRequest } from "../../api/users";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
import { useState, useEffect } from "react";

function UserSettings({ closeMethod }) {
	const [updateModal, setUpdateModal] = useState(false);
	const { user, errors: registerErrors, logout } = useAuth();
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();
	console.log("userInfo: ", user);

	const openModalUpdate = () => {
		setUpdateModal(true);
	};

	useEffect(() => {
		if (user) {
			setValue("editName", user.name);
			setValue("editLastName", user.lastName);
			setValue("editEmail", user.email);
			setValue("editPhone", user.phone);
			setValue("editAddress", user.address);
			setValue("editBirth", user.birth);
		}
	}, [user]);

	const onSubmitEditPersonalInfo = handleSubmit(async (values) => {
		const personObject = {
			id: user.id,
			name: values.editName,
			lastName: values.editLastName,
			phone: values.editPhone === user.phone ? null : values.editPhone,
			address: values.editAddress,
			email: values.editEmail === user.email ? null : values.editEmail,
			birth: values.editBirth,
		};

		try {
			const result = updatePersonRequest(personObject);
			if (!result) {
				console.log("Actualizacion no realizada");
			}
			setUpdateModal(false);
			reset();
		} catch (error) {
			console.logg(error);
		}
	});

	const editPersonalInfoForm = (infoUser) => {
		return (
			<div className="modal-content-body">
				<h4>Ingresa los datos del usuario</h4>
				<form className="dashboard-form" onSubmit={onSubmitEditPersonalInfo}>
					{/* <input type="hidden" {...register("userId")} value={user.id} /> */}
					<span className="span-edit-form">Nombres</span>
					<div className="input-group">
						<input
							type="text"
							{...register("editName", {
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
							defaultValue={user.name}
						/>
					</div>
					{errors.editName && (
						<p className="notice">{errors.editName.message}</p>
					)}
					<span className="span-edit-form">Apellidos</span>
					<div className="input-group">
						<input
							type="text"
							{...register("editLastName", {
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
							defaultValue={user.lastName}
						/>
					</div>
					{errors.editLastName && (
						<p className="notice">{errors.editLastName.message}</p>
					)}
					<span className="span-edit-form">Correo</span>
					<div className="input-group">
						<input
							type="text"
							{...register("editEmail", {
								required: {
									value: true,
									message: "Correo es requerido",
								},
								pattern: {
									value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
									message: "Correo no es valido",
								},
							})}
							defaultValue={user.email}
						/>
					</div>
					{errors.editEmail && (
						<p className="notice">{errors.editEmail.message}</p>
					)}

					<span className="span-edit-form">Celular</span>
					<div className="input-group">
						<input
							type="text"
							{...register("editPhone", {
								required: {
									value: true,
									message: "Celular es requerido",
								},
								minLength: {
									value: 10,
									message: "No es un celular valido",
								},
								validate: (value) => {
									if (value !== user.phone || value === user.phone) {
										return true;
									} else {
										return "Celular no valido";
									}
								},
							})}
							defaultValue={user.phone}
						/>
					</div>
					{errors.editPhone && (
						<p className="notice">{errors.editPhone.message}</p>
					)}
					<span className="span-edit-form">Direccion</span>
					<div className="input-group">
						<input
							type="text"
							{...register("editAddress", {
								required: {
									value: true,
									message: "Direccion es requerida",
								},
							})}
							defaultValue={user.address}
						/>
					</div>
					{errors.editAddress && (
						<p className="notice">{errors.editAddress.message}</p>
					)}
					<span className="span-edit-form">Fecha nacimiento</span>
					<div className="input-group">
						<input
							type="date"
							{...register("editBirth", {
								required: {
									value: true,
									message: "Fecha de nacimiento requerida",
								},
							})}
							defaultValue={user.birth}
						/>
					</div>
					{errors.editBirth && (
						<p className="notice">{errors.editBirth.message}</p>
					)}
					<input
						type="submit"
						className="btn-enviar"
						id="btn-add-user"
						value="Actualizar"
						// onClick={onSubmitEdit}
					/>

					{registerErrors.map((error, i) => (
						<div className="errors" key={i}>
							{error}
						</div>
					))}
				</form>
			</div>
		);
	};

	return (
		<>
			<div className="user-container">
				<div className="u-container1">
					<div className="wrap-btn">
						<button className="btn-back" onClick={closeMethod}>
							<i>
								<IoClose />
							</i>
						</button>
					</div>
					<div className="u-container2">
						<div className="u-container2-1">
							<IoIceCreamOutline size={96} />
							<span className="user-sett-item text-highlighted">
								¡Bienvenid@ de nuevo {user.name}!
							</span>
							<span className="user-sett-item text-highlighted">
								{user.lastName}
							</span>
							<span className="user-sett-item text-highlighted">
								{user.role}
							</span>
						</div>
						<div className="u-container2-2">
							<span className="user-sett-item text-highlighted">
								{user.state}
							</span>
							<span className="user-sett-item">{user.identity}</span>
							<span className="user-sett-item">{user.phone}</span>
							<span className="user-sett-item">{user.email}</span>
							<span className="user-sett-item text-highlighted">
								{user.address}
							</span>
							<button className="btn-edit-u-data" onClick={openModalUpdate}>
								<LuPencilLine size={22} />
								Editar
							</button>
						</div>
					</div>
				</div>
				<button className="btn-cerrarsesion" onClick={logout}>
					<i className="bi bi-box-arrow-right"></i>
					Cerrar Sesión
				</button>
			</div>
			{updateModal && (
				<ModalTemplate
					setStateModal={setUpdateModal}
					title="Actualiza tu información"
					showHeader={true}
				>
					{editPersonalInfoForm(user)}
				</ModalTemplate>
			)}
		</>
	);
}
export default UserSettings;