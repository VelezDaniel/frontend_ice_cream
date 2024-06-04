import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	showUsersRequest,
	deleteUserRequest,
	updatePersonRequest,
	updateUserRequest,
	createUserRequest,
	getRolesRequest,
	insertRegisterRoleRequest,
} from "../../api/users";
import { createPassword } from "../../api/auth";
import ModalTemplate from "../modal/ModalTemplate";
import { useAuth } from "../../context/AuthContext";
import "./css/dash_users.css";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { LuCake } from "react-icons/lu";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
// TOAST from SONNER
import { toast, Toaster } from "sonner";

function DashUsers({ dashChange, onAction }) {
	const [usersData, setUsersData] = useState([]);
	const [userData, setUserData] = useState(null);
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);
	const [roles, setRoles] = useState([]);
	const [resToast, setResToast] = useState({});

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	const { errors: registerErrors } = useAuth();

	const openModalEdit = (index) => {
		console.log(index);
		setEditModal(true);
		setselectedObjectIndex(index);
		setUserData(usersData[index]);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setselectedObjectIndex(index);
	};

	// Use effect para traer todos los usuarios
	useEffect(() => {
		// Realizar consulta a la base de datos para traer la informacion
		const handleShowUsers = async () => {
			try {
				const items = await showUsersRequest();
				// Establecer usuarios en estado
				console.log(items);
				setUsersData(items.data.body);
			} catch (error) {
				console.log("Error in dash_users: ", error);
			}
		};
		handleShowUsers();
	}, [dashChange]);

	// use effect para traer todos los roles
	useEffect(() => {
		const handleGetRoles = async () => {
			try {
				const roleItems = await getRolesRequest();
				setRoles(roleItems.data.body);
				console.log("roleItems: ", roleItems.data.body);
				console.log("roles: ", roles);
			} catch (error) {
				console.log("Error in dash_u", error);
			}
		};
		handleGetRoles();
	}, [dashChange]);

	useEffect(() => {
		if (userData) {
			console.log(userData);
			setValue("editName", userData.name);
			setValue("editLastName", userData.lastName);
			setValue("editEmail", userData.email);
			setValue("editRole", userData.idUserRole);
			setValue("editPhone", userData.phone);
			setValue("editAddress", userData.address);
			setValue("editState", userData.state);
			setValue("editBirth", userData.birth);
		}
	}, [userData]);

	useEffect(() => {
		const showToast = () => {
			// const btn = document.getElementById(idButton);
			// btn.addEventListener("click", () => {});
			if (resToast && resToast.state === false) {
				toast.error("Lo sentimos", {
					description: resToast.message,
					duration: 5000,
				});
			} else if (resToast.state === true) {
				toast.success("Accion Exitosa", {
					description: resToast.message,
					duration: 4000,
				});
			}
		};
		showToast();
	}, [resToast]);

	const onSubmit = handleSubmit(async (values) => {
		console.log(values);
		const objectValues = {
			identity: values.addIdentity,
			name: values.addName,
			lastName: values.addLastName,
			phone: values.addPhone,
			email: values.addEmail,
			address: values.addAddress,
			birth: values.addBirth,
			password: values.addPassword,
		};
		const result = await createUserRequest(objectValues);
		console.log("result from dash_users: ", result);
		const userInserted = result.data.body;
		if (result && result.data) {
			const userInfo = {
				user: userInserted.id,
				password: objectValues.password,
			};
			const resultPass = await createPassword(userInfo);
			console.log(resultPass);
			onAction("addUser");
			if (resultPass.data.body.message === "Data save succesfully") {
				setResToast({
					state: true,
					message: "Nuevo usuario agregado",
				});
			} else {
				setResToast({
					state: false,
					message: "No se pudo agregar el usuario. Vuelve a intentarlo.",
				});
			}
		}
		reset();
		setAddModal(false);
	});

	const onSubmitEdit = handleSubmit(async (values) => {
		console.log("values for edit: ", values);
		if (
			values.editName == userData.name &&
			values.editLastName == userData.lastName &&
			values.editEmail == userData.email &&
			values.editRole == userData.idUserRole &&
			values.editPhone == userData.phone &&
			values.editAddress == userData.address &&
			values.editState == userData.state &&
			values.editBirth == userData.birth
		) {
			setResToast({
				state: false,
				message:
					"Debes cambiar al menos un dato para actualizar la información",
			});
		} else {
			try {
				let insertRole = null;
				if (values.editRole !== userData.idUserRole) {
					const role = {
						idRole: values.editRole,
					};

					insertRole = await insertRegisterRoleRequest(role);
					console.log("insertRole: ", insertRole);
				}

				const personObject = {
					id: values.userId,
					name: values.editName,
					lastName: values.editLastName,
					phone: values.editPhone === userData.phone ? null : values.editPhone,
					address: values.editAddress,
					email: values.editEmail === userData.email ? null : values.editEmail,
					birth: values.editBirth,
				};

				const userObject = {
					id: values.userId,
					state: values.editState === userData.state ? null : values.editState,
					registerRole:
						insertRole !== null ? insertRole.data.body.insertId : null,
				};

				const resultPerson = await updatePersonRequest(personObject);
				const resultUser = await updateUserRequest(userObject);

				if (resultPerson && resultUser) {
					console.log(resultPerson);
					console.log(resultUser);
				}

				reset();
				onAction("editUser");
				setEditModal(false);

				if (resultUser.data.body && resultPerson.data.body) {
					setResToast({
						state: true,
						message: "Información de usuario actualizada",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo actualizar el usuario. Vuelve a intentarlo.",
					});
				}
			} catch (error) {
				console.log("error in onsubmitEdit ", error);
			}
		}
	});

	const deleteUser = async (userData) => {
		try {
			const result = await deleteUserRequest(userData);
			if (result) {
				setDeleteModal(false);
				console.log("Registro eliminado: ", result);
				onAction("deleteUser");
				setResToast({
					state: true,
					message: "Usuario eliminado exitosamente",
				});
			} else {
				setDeleteModal(false);
				setResToast({
					state: false,
					message: "No se pudo eliminar el usuario, intentalo de nuevo",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Lista de usuarios</h2>
				<div>
					<input type="text" placeholder="Buscar por Identificacion" />
				</div>
			</div>
			<div className="div-dash-btn-add">
				<button onClick={() => setAddModal(!addModal)}>
					<FaRegUser size={20} />
					Agregar
				</button>
			</div>
			{/* MODAL AÑADIR USUARIO */}
			{addModal && (
				<ModalTemplate
					setStateModal={setAddModal}
					title="Nuevo Usuario"
					showHeader={true}
				>
					<div className="modal-content-body">
						<h4>Ingresa los datos del usuario</h4>
						<form className="dashboard-form" onSubmit={onSubmit}>
							<div className="input-group">
								<input
									type="text"
									{...register("addName", {
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
							{errors.addName && (
								<p className="notice">{errors.addName.message}</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("addLastName", {
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
							{errors.addLastName && (
								<p className="notice">{errors.addLastName.message}</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("addIdentity", {
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
								/>
							</div>
							{errors.addIdentity && (
								<p className="notice">{errors.addIdentity.message}</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("addEmail", {
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
							{errors.addEmail && (
								<p className="notice">{errors.addEmail.message}</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("addPhone", {
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
							{errors.addPhone && (
								<p className="notice">{errors.addPhone.message}</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("addAddress", {
										required: {
											value: true,
											message: "Direccion es requerida",
										},
									})}
									placeholder="Direccion"
								/>
							</div>
							{errors.addAddress && (
								<p className="notice">{errors.addAddress.message}</p>
							)}
							<div className="input-group">
								<input
									type="date"
									{...register("addBirth", {
										required: {
											value: true,
											message: "Fecha de nacimiento es requerida",
										},
									})}
								/>
							</div>
							{errors.addBirth && (
								<p className="notice">{errors.addBirth.message}</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("addPassword", {
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
											message:
												"La contraseña no puede ser mayor a 20 caracteres",
										},
									})}
									placeholder="Contraseña"
								/>
							</div>
							{errors.addPassword && (
								<p className="notice">{errors.addPassword.message}</p>
							)}
							<button className="btn-enviar" id="btn-add-user">
								Continuar
							</button>
							{registerErrors.map((error, i) => (
								<div className="errors" key={i}>
									{error}
								</div>
							))}
						</form>
					</div>
				</ModalTemplate>
			)}
			{/* Contenedor de cada fila */}
			<div className="dash-container-cards">
				{usersData.map((userData, index) => (
					<div className="dash-container-card" key={index}>
						<div className="dash-card-user">
							<div className="colum-one">
								<span>{userData.name.concat(` ${userData.lastName}`)}</span>
								<span>{userData.role}</span>
							</div>
							<div className="colum-two">
								<div>
									<span>Identificacion</span>
									<span>{userData.identity}</span>
								</div>
								<div>
									<span>Celular</span>
									<span>{userData.phone}</span>
								</div>
								<div>
									<span>Correo</span>
									<span>{userData.email}</span>
								</div>
								<div>
									<span>Dirección</span>
									<span>{userData.address}</span>
								</div>
								<div>
									<span>Estado</span>
									<span>{userData.state}</span>
								</div>
								<div>
									<span>Cambio de rol</span>
									<span>{userData.dateRole}</span>
								</div>
								<div>
									<span> </span>
									<span>
										<LuCake /> {userData.birth}
									</span>
								</div>
							</div>
						</div>

						<div className="dash-container-btns">
							<button
								className="dash-btn-edit"
								onClick={() => openModalEdit(index)}
							>
								<HiOutlinePencilAlt size={38} />
							</button>
							<button
								className="dash-btn-delete"
								onClick={() => openModalDelete(index)}
							>
								<HiOutlineTrash size={38} />
							</button>
						</div>

						{/* mostrar modal editar */}
						{editModal && selectedObjectIndex === index && (
							<ModalTemplate
								setStateModal={setEditModal}
								title="Editar Usuario"
								showHeader={true}
								designClass={""}
							>
								<div className="modal-content-body">
									<h4>Ingresa los datos del usuario</h4>
									<form className="dashboard-form" onSubmit={onSubmitEdit}>
										<input
											type="hidden"
											{...register("userId")}
											value={userData.id}
										/>
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
												defaultValue={userData.name}
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
												defaultValue={userData.lastName}
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
												defaultValue={userData.email}
											/>
										</div>
										{errors.editEmail && (
											<p className="notice">{errors.editEmail.message}</p>
										)}
										<span className="span-edit-form">Rol</span>
										{/* role */}
										<div className="form-group-select">
											<select
												className="form-control"
												{...register("editRole")}
												defaultValue={userData.idUserRole}
											>
												{roles.map((role) => (
													<option key={role.idRole} value={role.idRole}>
														{role.nameRole}
													</option>
												))}
											</select>
										</div>

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
														if (
															value !== userData.phone ||
															value === userData.phone
														) {
															return true;
														} else {
															return "Celular no valido";
														}
													},
												})}
												defaultValue={userData.phone}
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
												defaultValue={userData.address}
											/>
										</div>
										{errors.editAddress && (
											<p className="notice">{errors.editAddress.message}</p>
										)}
										<div className="form-group-select">
											<select
												className="form-control"
												{...register("editState")}
												defaultValue={userData.state}
											>
												<option value="ACTIVO">ACTIVO</option>
												<option value="INACTIVO">INACTIVO</option>
												<option value="BLOQUEADO">BLOQUEADO</option>
											</select>
										</div>
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
												defaultValue={userData.birth}
											/>
										</div>
										{errors.editBirth && (
											<p className="notice">{errors.editBirth.message}</p>
										)}
										{/* {console.log(
											"userData and role EDIT: ",
											userData,
											roleInEdit
										)} */}
										{/* Boton para enviar formulario de actualizacion de usuario */}

										<input
											type="submit"
											className="btn-enviar"
											id="btn-edit-user"
											value="Actualizar"
										/>

										{registerErrors.map((error, i) => (
											<div className="errors" key={i}>
												{error}
											</div>
										))}
									</form>
								</div>
							</ModalTemplate>
						)}

						{/* Mostrar modal eliminar */}
						{deleteModal && selectedObjectIndex === index && (
							<ModalTemplate
								setStateModal={setDeleteModal}
								title={" Eliminar Usuario "}
								showHeader={true}
								designClass={"alert"}
							>
								<div className="modal-content-body">
									<span className="modal-subtitle">
										Seguro que deseas eliminar el usuario:
									</span>
									<span className="modal-info">
										Nombre: {userData.name.concat(` ${userData.lastName}`)}
									</span>
									<span className="modal-info">
										Identificacion: {userData.identity}
									</span>
									<span>id: {userData.id}</span>
								</div>
								<div className="container-btn-alert-modal">
									<button
										className="btn-alert-modal"
										onClick={() => deleteUser(userData)}
									>
										Aceptar
									</button>
								</div>
							</ModalTemplate>
						)}
					</div>
				))}
			</div>
			<Toaster />
		</div>
	);
}

export default DashUsers;
