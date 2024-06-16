import "./usersettings.css";
import { LuPencilLine } from "react-icons/lu";
// import { IoExitOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/imgs/helarticologo2.png";
import { updatePersonRequest } from "../../api/users";
import { showDeliveriesRequest } from "../../api/deliveries";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

function UserSettings({ closeMethod, dashChange, onAction }) {
	const navigate = useNavigate();
	const [updateModal, setUpdateModal] = useState(false);
	const [deliveries, setDeliveries] = useState(null);
	const { user, errors: registerErrors, logout } = useAuth();
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	const [resToast, setResToast] = useState({});

	const openModalUpdate = () => {
		setUpdateModal(true);
	};

	const handlerLogout = () => {
		logout();
		navigate("/");
	};

	useEffect(() => {
		if (user) {
			setValue("editName", user.name);
			setValue("editLastName", user.lastName);
			setValue("editEmail", user.email);
			setValue("editPhone", user.phone);
			setValue("editAddress", user.address);
			setValue("editArea", user.area);
		}
	}, [user]);

	useEffect(() => {}, [dashChange]);

	useEffect(() => {
		const showDeliveries = async () => {
			const result = await showDeliveriesRequest();
			console.log("result deliveira; ", result);
			setDeliveries(result.data.body);
		};
		showDeliveries();
	}, []);

	useEffect(() => {
		const showToast = () => {
			if (resToast && resToast.state === false) {
				toast.error("Lo sentimos", {
					className: "toast-error-style",
					description: resToast.message,
					duration: 5000,
				});
			} else if (resToast.state === true) {
				toast.success("Accion Exitosa", {
					className: "toast-success-style",
					description: resToast.message,
					duration: 4000,
				});
			}
		};
		showToast();
	}, [resToast]);

	const onSubmitEditPersonalInfo = handleSubmit(async (values) => {
		const personObject = {
			id: user.id,
			name: values.editName,
			lastName: values.editLastName,
			phone: values.editPhone === user.phone ? null : values.editPhone,
			address: values.editAddress,
			area: values.editArea,
			email: values.editEmail === user.email ? null : values.editEmail,
		};

		try {
			const result = await updatePersonRequest(personObject);
			if (!result) {
				console.log("Actualizacion no realizada");
			}
			console.log("result: ", result);
			setUpdateModal(false);
			reset();
			onAction("editCurrentUserInfo");
			// if (result.data.body[0] === "Data updated succesfully") {
			// 	setResToast({
			// 		state: true,
			// 		message: "Sabor actualizado",
			// 	});
			// } else {
			// 	setResToast({
			// 		state: false,
			// 		message: "No se pudo actualizar el sabor. Vuelve a intentarlo.",
			// 	});
			// }
			// window.location.reload();
		} catch (error) {
			console.logg(error);
		}
	});

	const editPersonalInfoForm = () => {
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

					<span className="font-small-desc">
						Selecciona el area donde te encuentras
					</span>
					<div className="form-group-select">
						<select
							defaultValue={user.area}
							className="form-control"
							{...register("area", {
								required: {
									value: true,
									message: "Selecciona el area donde te encuentras",
								},
							})}
						>
							{deliveries &&
								deliveries.map((area) => (
									<option key={area.id} value={area.id}>
										{area.deliveryDescription}
									</option>
								))}
						</select>
					</div>
					{errors.area && <p className="notice">{errors.area.message}</p>}
					<input
						type="submit"
						className="btn-enviar"
						id="btn-add-user"
						value="Actualizar"
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
							<img className="img-logo-user-settings" src={logoImg} alt="" />
							<span className="user-sett-item text-highlighted">
								¡Bienvenid@ de nuevo {user.name}!
							</span>
							<div className="grid-user-settings-info">
								<div className="column-1-user-settings">
									<p className="label-text-user-setting">Nombre</p>
									<p>{user.name.concat(` ${user.lastName}`)}</p>
									<p className="label-text-user-setting">Rol</p>
									<p>{user.role}</p>
									<p className="label-text-user-setting">Estado</p>
									<p>{user.state}</p>
									<p className="label-text-user-setting">Identidad</p>
									<p>{user.identity}</p>
									<p className="label-text-user-setting">Celular</p>
									<p>{user.phone}</p>
									<p className="label-text-user-setting">Correo</p>
									<p>{user.email}</p>
									<p className="label-text-user-setting">Dirección</p>
									<p>{user.address}</p>
								</div>
							</div>
							<button className="btn-edit-u-data" onClick={openModalUpdate}>
								<LuPencilLine size={22} />
								Editar mi información
							</button>
						</div>
					</div>
				</div>
				<button className="btn-cerrarsesion" onClick={handlerLogout}>
					{/* <IoExitOutline size={24} /> */}
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
			<Toaster position="top-right" />
		</>
	);
}
export default UserSettings;
