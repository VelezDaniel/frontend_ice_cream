import "../css/dashboard.css";
import "../components/user_settings/usersettings.css";
import DashPortfolio from "../components/dashboard/dash_portfolio";
import DashBookings from "../components/dashboard/dash_booking";
import DashUsers from "../components/dashboard/dash_users";
import DashOrders from "../components/dashboard/dash_orders";
import DashAditions from "../components/dashboard/dash_aditions";
import { useEffect, useState } from "react";
import { IoIceCreamOutline, IoClose } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { TbCandy } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
	const [activeComponent, setActiveComponent] = useState(null);
	const [settingsVisible, setSettingsVisible] = useState(false);

	const { user } = useAuth();
	console.log("show User: ", user);

	//  Seleccionar componente PEDIDOS
	const handleOrdersComponent = () => {
		showComponent("DashOrders");
	}
	// ! Seleccionar componente VENTAS

	// Seleccionar componente RESERVAS
	const handleBookingsComponent = () => {
		showComponent("DashBookings");
	};

	//  Seleccionar componente Usuarios
	const handleUsersListComponent = () => {
		showComponent("DashUsers");
	};

	// Seleccionar componente PORTAFOLIO
	const handlePortfolioComponent = () => {
		showComponent("DashPortfolio");
	};

	// Seleccionar componente ADICIONES
	const handleAditionComponent = () => {
		showComponent("DashAditions");
	};

	// Cambiar el componente a mostrar en el dashboard
	const showComponent = (component) => {
		setActiveComponent(component);
	};

	// Abrir ajustes de usuario
	const openSettingsUser = () => {
		setSettingsVisible(true);
	};

	// Cerrar ajustes de usuario
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
						<button className="btn-lateral-dash top-space" onClick={handleOrdersComponent}>
							<div className="icon-container">
								<IoIceCreamOutline size={28} />
							</div>
							<span className="btn-text">Pedidos</span>
						</button>
						<button className="btn-lateral-dash" >
							<div className="icon-container">
								<i className="bi bi-cash-coin"></i>
							</div>
							<span className="btn-text">Ventas</span>
						</button>
						<button className="btn-lateral-dash" onClick={handleBookingsComponent}>
							<div className="icon-container">
								<i className="bi bi-journal-check"></i>
							</div>
							<span className="btn-text">Reservas</span>
						</button>
						<button className="btn-lateral-dash" onClick={handleUsersListComponent}>
							<div className="icon-container">
								<i className="bi bi-people"></i>
							</div>
							<span className="btn-text">Usuarios</span>
						</button>
						<button
							className="btn-lateral-dash"
							onClick={handlePortfolioComponent}
						>
							<div className="icon-container">
								<i className="bi bi-briefcase"></i>
							</div>
							<span className="btn-text">Portafolio</span>
						</button>
						<button
							className="btn-lateral-dash"
							onClick={handleAditionComponent}
						>
							<div className="icon-container">
							<TbCandy />
							</div>
							<span className="btn-text">Adiciones</span>
						</button>
					</div>
					<div className="user-dashboard">
						<p className="rol-text">HELARTICO</p>
						<p className="rol-text-name">Ice cream bussines</p>
					</div>

					{/* <button className="btn-cerrarsesion">
						<div className="icon-container1">
							<i className="bi bi-box-arrow-right"></i>
						</div>
						Cerrar Sesión
					</button> */}
				</div>
			</div>
			<div className="contanier-nav-component">
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
				<div className="div-specific-content">
					{activeComponent === "DashPortfolio" && <DashPortfolio />}
					{activeComponent === "DashBookings" && <DashBookings />}
					{activeComponent === "DashUsers" && <DashUsers />}
					{activeComponent === "DashOrders" && <DashOrders/>}
					{activeComponent === "DashAditions" && <DashAditions/>}
				</div>
			</div>
			{/* USER SETTINGS */}
			<div
				className={`user-container ${
					settingsVisible ? "settings-user-visible" : "settings-user-hidden"
				}`}
			>
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
