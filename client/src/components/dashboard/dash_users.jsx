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

function DashUsers() {
	const [usersData, setUsersData] = useState([]);
	// const [userData, setUserData] = useState({});
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);
	const [roles, setRoles] = useState([]);
	// Se utiliza para controlar el valor de rol, en el modal edit (con el fin de comparar su id con el del rol que tiene el usuario en la base de datos)
	const [roleInEdit, setRoleInEdit] = useState(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const { errors: registerErrors } = useAuth();

	const openModalEdit = (index) => {
		setEditModal(true);
		setselectedObjectIndex(index);
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
	}, []);

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
	}, []);

	// useEffect(() => {
	// 	setValue('name', userData.name);
	// 	setValue('lastName', userData.lastName);
	// }, [setValue, userData]);

	const onSubmit = handleSubmit(async (values) => {
		console.log(values);
		const result = await createUserRequest(values);
		console.log("result from dash_users: ", result);
		const userInserted = result.data.body;
		if (result && result.data) {
			const userInfo = {
				user: userInserted.id,
				password: values.password,
			};
			const resultPass = await createPassword(userInfo);
			console.log(resultPass);
		}
		reset();
		window.location.reload();
	});

	const handleSubmitEdit = (userData) => {
		updateUser(userData, roleInEdit);
	};

	const updateUser = async (userData, role) => {
		let resultUser,
			resultPerson,
			insertRole,
			operationDone = false;
		console.log("role in updateUser: ", role);
		try {
			if (userData) {
				// Si el rol del usuario es diferente del rol seleccionado en el formulario
				if (userData.idUserRole != role.idRole) {
					insertRole = await insertRegisterRoleRequest(role);
					console.log("insertRole: ", insertRole);
					const idRoleinserted = insertRole.insertId;
					userData.registerRole = idRoleinserted;
					resultUser = await updateUserRequest(userData);

					resultPerson = await updatePersonRequest(userData);
					operationDone = true;
				} else {
					// SI no son diferentes la tabla registro_rol no se actualiza
					resultUser = await updateUserRequest(userData);
					resultPerson = await updatePersonRequest(userData);
					operationDone = true;
				}
				if (operationDone) {
					setEditModal(false);
					console.log("Registro actualizado: ", resultPerson);
					window.location.reload();
				}
				console.log("insertRole: ", insertRole);
				console.log("Result User: ", resultUser);
				console.log("resultPerson: ", resultPerson);
			} else {
				throw new Error("user not found or not inserted");
			}
		} catch (error) {
			console.log("error in dash-users: ", error);
		}
	};

	const deleteUser = async (userData) => {
		try {
			const result = await deleteUserRequest(userData);
			if (result) {
				setDeleteModal(false);
				console.log("Registro eliminado: ", result);
				window.location.reload();
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
									{...register("name", { required: true })}
									placeholder="Nombres"
								/>
							</div>
							{errors.name && <p className="notice">Campo nombres requerido</p>}
							<div className="input-group">
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
								<input
									type="text"
									{...register("identity", { required: true })}
									placeholder="Documento"
								/>
							</div>
							{errors.identity && (
								<p className="notice">Campo Documento requerido</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("email", { required: true })}
									placeholder="correo"
								/>
							</div>
							{errors.email && <p className="notice">Campo correo requerido</p>}
							<div className="input-group">
								<input
									type="text"
									{...register("phone", { required: true })}
									placeholder="Celular"
								/>
							</div>
							{errors.phone && (
								<p className="notice">Campo Celular requerido</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("address", { required: true })}
									placeholder="Direccion"
								/>
							</div>
							{errors.address && <p className="notice">Direccion requerida</p>}
							<div className="input-group">
								<input type="date" {...register("birth", { required: true })} />
							</div>
							{errors.birth && (
								<p className="notice">Campo nacimiento requerido</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("password", { required: true })}
									placeholder="Contraseña"
								/>
							</div>
							{errors.password && (
								<p className="notice">contraseña requerida</p>
							)}
							<input
								className="btn-enviar"
								id="btn-add-user"
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
									<form
										className="dashboard-form"
										// onSubmit={handleSubmitEdit(userData)}
									>
										<span>id: {userData.id}</span>
										<span className="span-edit-form">Nombres</span>
										<div className="input-group">
											<input
												type="text"
												name="name"
												defaultValue={userData.name}
											/>
										</div>
										{errors.name && (
											<p className="notice">Campo nombres requerido</p>
										)}
										<span className="span-edit-form">Apellidos</span>
										<div className="input-group">
											<input
												type="text"
												name="lastName"
												defaultValue={userData.lastName}
											/>
										</div>
										{errors.lastName && (
											<p className="notice">Campo apellidos requerido</p>
										)}
										<span className="span-edit-form">Correo</span>
										<div className="input-group">
											<input
												type="text"
												name="email"
												defaultValue={userData.email}
											/>
										</div>
										{errors.email && (
											<p className="notice">Campo correo requerido</p>
										)}
										<span className="span-edit-form">Rol</span>
										{/* role */}
										<div className="form-group-select">
											<select
												name="roles"
												className="form-control"
												defaultValue={userData.idUserRole}
												
												onChange={(e) => {
													// NECESARIO para guardar el objeto completo de role
													const selectedRoleId = e.target.value;
													console.log("selectedRoleId: ", selectedRoleId);
													console.log("roles in edit: ", roles);
													const selectedRoleObject = roles.find(
														(role) => role.idRole.toString() === selectedRoleId
													);
													console.log("roleObject: ", selectedRoleObject);
													setRoleInEdit(selectedRoleObject);
												}}
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
												name="phone"
												defaultValue={userData.phone}
											/>
										</div>
										{errors.phone && (
											<p className="notice">Campo Celular requerido</p>
										)}
										<span className="span-edit-form">Direccion</span>
										<div className="input-group">
											<input
												type="text"
												name="address"
												defaultValue={userData.address}
											/>
										</div>
										{errors.address && (
											<p className="notice">Direccion requerida</p>
										)}
										<span className="span-edit-form">Fecha nacimiento</span>
										<div className="input-group">
											<input
												type="date"
												name="birth"
												defaultValue={userData.birth}
											/>
										</div>
										{errors.birth && (
											<p className="notice">Campo nacimiento requerido</p>
										)}
										{console.log('userData and role EDIT: ', userData, roleInEdit)}
										{/* Boton para enviar formulario de actualizacion de usuario */}
										<input
											type="submit"
											className="btn-enviar"
											id="btn-add-user"
											value="Actualizar"
											onClick={() => {
												updateUser(userData, roleInEdit);
											}}
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
		</div>
	);
}

export default DashUsers;
