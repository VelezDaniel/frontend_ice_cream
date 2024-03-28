import { useEffect, useState } from "react";
import { showUsers } from "../../api/users";
import "./css/dash_users.css";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

function DashUsers() {
	const [usersData, setUsersData] = useState([]);

	useEffect(() => {
		// Realizar consulta a la base de datos para traer la informacion
		const handleShowUsers = async () => {
			try {
				const items = await showUsers();
				console.log(items.data.body);
				// Establecer usuarios en estado
				setUsersData(items.data.body);
			} catch (error) {
				console.log('Error in dash_users: ',error);
			}
		}
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
			<div>
				<button>
					<FaRegUser />
					Agregar
				</button>
			</div>
			<div className="dash-container-cards">
				{usersData.map((user, index) => (
					<div className="dash-container-card" key={index}>
						<div className="dash-card-user">
							<div className="colum-one">
								<span>{user.name.concat(` ${user.lastName}`)}</span>
								<span>{user.role}</span>
							</div>
							<div className="colum-two">
								<div>
									<span>Identificacion</span>
									<span>{user.identity}</span>
								</div>
								<div>
									<span>Celular</span>
									<span>{user.phone}</span>
								</div>
								<div>
									<span>Correo</span>
									<span>{user.email}</span>
								</div>
								<div>
									<span>Dirección</span>
									<span>{user.address}</span>
								</div>
								<div>
									<span>Estado</span>
									<span>{user.state}</span>
								</div>
								<div>
									<span> </span>
									<span>{user.birth}</span>
								</div>
							</div>
						</div>
						<div className="dash-container-btns">
							<button>
								<HiOutlinePencilAlt />
							</button>
							<button>
								<HiOutlineTrash />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default DashUsers;
