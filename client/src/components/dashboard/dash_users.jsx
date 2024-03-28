import { useEffect, useState } from "react";
import { showUsers } from "../../api/users";
import ModalTemplate from "../modal/ModalTemplate";
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

	const openModalEdit = (index) => {
		setEditModal(true);
		setSelectedUserIndex(index);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setSelectedUserIndex(index);
	};

	// const openNewUserModal = () => {
	// 	setNewUSerModalOpen(true);
	// }

	// const closeModal = () => {
	// 	setEditModalOpen(false);
	// };

	useEffect(() => {
		// Realizar consulta a la base de datos para traer la informacion
		const handleShowUsers = async () => {
			try {
				const items = await showUsers();
				// Establecer usuarios en estado
				setUsersData(items.data.body);
			} catch (error) {
				console.log("Error in dash_users: ", error);
			}
		};
		handleShowUsers();
	}, []);

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
					<p>New user</p>
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
								<div>
									<span>{userData.email}</span>
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
