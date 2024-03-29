import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	showUsersRequest,
	deleteUserRequest,
} from "../../api/users";
import { createPassword } from "../../api/auth";
import { createUserRequest } from "../../api/users";
import ModalTemplate from "../modal/ModalTemplate";
import { useAuth } from "../../context/AuthContext";
import "./css/dash_users.css";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

function DashUsers() {
	const [usersData, setUsersData] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [newUserModal, setNewUSerModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedUserIndex, setSelectedUserIndex] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { errors: registerErrors } = useAuth();

	const openModalEdit = (index) => {
		setEditModal(true);
		setSelectedUserIndex(index);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setSelectedUserIndex(index);
	};

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

	const onSubmit = handleSubmit(async (values) => {
		console.log(values)
		const result = await createUserRequest(values);
		console.log('result from dash_users: ',result);
		const userInserted = result.data.body;
		if (result && result.data) {
			const userInfo = {
				user: userInserted.id,
				password: values.password,
			}
			const resultPass = await createPassword(userInfo);
			console.log(resultPass);
		}
		
	});

	// const deleteUser = async (userData) => {
	// 	try {
	// 		const result = await deleteUserRequest(userData);
	// 		if (result) {
	// 			// setDeleteModal(false);
	// 			console.log("Registro eliminado");
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const handleDeleteUser = () => {

	// }

	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Lista de usuarios</h2>
				<div>
					<input type="text" placeholder="Buscar por Identificacion" />
				</div>
			</div>
			<div className="div-btn-add-user">
				<button onClick={() => setNewUSerModal(!newUserModal)}>
					<FaRegUser size={20} />
					Agregar
				</button>
			</div>
			{/* MODAL AÑADIR USUARIO */}
			{newUserModal && (
				<ModalTemplate
					setStateModal={setNewUSerModal}
					title="Nuevo Usuario"
					showHeader={true}
				>
					<div className="modal-content-body">
						<h4>Ingresa los datos del usuario</h4>
						<form className="form-register" onSubmit={onSubmit}>
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
									<span> </span>
									<span>{userData.birth}</span>
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
						{editModal && selectedUserIndex === index && (
							<ModalTemplate
								setStateModal={setEditModal}
								title="Editar Usuario"
								showHeader={true}
								designClass={""}
							>
								<p>Ponete a funcionar</p>
								<p>{userData.name}</p>
								<p>{userData.lastName}</p>
							</ModalTemplate>
						)}
						{/* Mostrar modal eliminar */}
						{deleteModal && selectedUserIndex === index && (
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
								</div>
								<div className="container-btn-alert-modal">
									<button
										className="btn-alert-modal"
										// onClick={deleteUser(userData)}
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
