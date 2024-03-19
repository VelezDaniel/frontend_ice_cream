import "./css/dashboard.css";
import "../components/user_settings/usersettings.css";
import { useEffect, useState } from "react";
import { IoIceCreamOutline, IoClose } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
// import UserSettings from "../components/user_settings/UserSettings";

function Dashboard() {
	const [settingsVisible, setSettingsVisible] = useState(false);

	const openSettingsUser = () => {
		setSettingsVisible(true);
	};

	const closeSettingsUser = () => {
		setSettingsVisible(false);
	};

	useEffect(() => {
		const $userContainer = document.querySelector(".user-container");

		if ($userContainer) {
			if (settingsVisible) {
				$userContainer.style.display = "flex";
			} else {
				$userContainer.style.display = "none";
			}
		}
	}, [settingsVisible]);

	return (
		<div className="main-container">
			<div className="dashContent">
				<div className="style-panel">
					<div className="wrap-sup">
						<h2 className="rol-text title">Panel de Gestión</h2>
						{/* <button className="btn-mostrarmenos">
							<div className="icon-container1">
								<i className="bi bi-arrow-right"></i>
							</div>
							<span className="btn-text">Mostrar Menos</span>
						</button> */}
						<button className="btn-pedidos">
							<div className="icon-container">
								<IoIceCreamOutline size={28} />
							</div>
							<span className="btn-text">Pedidos</span>
						</button>
						<button className="btn-ventas">
							<div className="icon-container">
								<i className="bi bi-cash-coin"></i>
							</div>
							<span className="btn-text">Ventas</span>
						</button>
						<button className="btn-ventas">
							<div className="icon-container">
								<i className="bi bi-journal-check"></i>
							</div>
							<span className="btn-text">Reservas</span>
						</button>
						<button className="btn-usuario">
							<div className="icon-container">
								<i className="bi bi-people"></i>
							</div>
							<span className="btn-text">Usuarios</span>
						</button>
						<button className="btn-portafolio">
							<div className="icon-container">
								<i className="bi bi-briefcase"></i>
							</div>
							<span className="btn-text">Portafolio</span>
						</button>
					</div>
					<div className="user-dashboard">
						<p className="rol-text">ADMINISTRADOR</p>
						<p className="rol-text-name">David Calderon</p>
					</div>

					{/* <button className="btn-cerrarsesion">
						<div className="icon-container1">
							<i className="bi bi-box-arrow-right"></i>
						</div>
						Cerrar Sesión
					</button> */}
				</div>
			</div>
			<div className="nav-sup">
				<div className="logo h-content">
					<h1>HELARTICO</h1>
				</div>
				<div className="icons h-content">
					<a className="nav-item nav-icon" href="">
						<i className="bi bi-handbag"></i>
					</a>
					<a className="nav-item nav-icon" onClick={openSettingsUser}>
						<i className="bi bi-person icon-person"></i>
					</a>
				</div>
			</div>
			{/* <UserSettings closeMethod={closeSettingsUser} /> */}
			<div className="user-container settings-user-hidden">
				<div className="u-container1">
					<div className="wrap-btn">
						<button className="btn-back" onClick={closeSettingsUser}>
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
		</div>
	);
}

export default Dashboard;
