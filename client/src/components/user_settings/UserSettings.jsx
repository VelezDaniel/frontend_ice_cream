import "./usersettings.css";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

function UserSettings() {

	const [settingsVisible, setSettingsVisible] = useState(false);

	// ? Terminar el menu de ajustes para usuario con sus datos
	// Se requiere la informacion del usuario para mostrar el menu
	// const openSettingsUser = () => {
	// 	setSettingsVisible(true);
	// }

	// const closeSettingsUser = () => {
	// 	setSettingsVisible(false);
	// }

	// useEffect(() => {

	// })

	return (
		<div className="user-container">
			<div className="u-container1">
				<div className="wrap-btn">
					<button className="btn-back">
						<i>
							<IoClose />
						</i>
					</button>
				</div>
				<div className="u-container2">
					<div className="u-container2-1">
						<span className="user-sett-item text-highlighted">Nombres</span>
						<span className="user-sett-item text-highlighted">Apellidos</span>
						<span className="user-sett-item">Administrador</span>
					</div>
					<div className="u-container2-2">
						<span className="user-sett-item text-highlighted">Estado</span>
						<span className="user-sett-item">Identificacion</span>
						<span className="user-sett-item">Celular</span>
						<span className="user-sett-item">correodeluser@gmail.com</span>
						<span className="user-sett-item text-highlighted">Direccion</span>
						<button className="btn-edit-u-data">
							<LuPencilLine size={22} />
							Editar
						</button>
					</div>
				</div>
			</div>

			<button className="btn-cerrarsesion">
				<i className="bi bi-box-arrow-right"></i>
				Cerrar Sesión
			</button>
		</div>
	);
}

export default UserSettings;