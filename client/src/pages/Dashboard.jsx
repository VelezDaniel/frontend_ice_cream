import "../css/dashboard.css";
import "../components/user_settings/usersettings.css";
import { useNavigate } from "react-router-dom";
import DashPortfolio from "../components/dashboard/dash_portfolio";
import DashBookings from "../components/dashboard/dash_booking";
import DashUsers from "../components/dashboard/dash_users";
import DashOrders from "../components/dashboard/dash_orders";
import DashAditions from "../components/dashboard/dash_aditions";
import { useEffect, useState } from "react";
import { IoIceCreamOutline } from "react-icons/io5";
import { TbCandy } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
import UserSettings from "../components/user_settings/UserSettings";

// ** MATERIAL IMPORTS **
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Tooltip from "@mui/material/Tooltip";

function Dashboard() {
	const [activeComponent, setActiveComponent] = useState(null);
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [dashContentChange, setDashContentChange] = useState(0);

	const { user } = useAuth();
	const navigate = useNavigate();

	//  Seleccionar componente PEDIDOS
	const handleOrdersComponent = () => {
		showComponent("DashOrders");
	};

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

	const redirectHome = () => {
		navigate("/");
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

	const handleActionChild = () => {
		setDashContentChange((prev) => prev + 1);
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
						<Tooltip title="Pedidos" placement="right" enterDelay={500}>
							<button
								className="btn-lateral-dash top-space"
								onClick={handleOrdersComponent}
							>
								<div className="icon-container">
									<IoIceCreamOutline size={28} />
								</div>
								<span className="btn-text">Pedidos</span>
							</button>
						</Tooltip>

						{/* Seccion deshabilitada para clientes y domiciliarios */}
						{user &&
							user.role !== "CLIENTE" &&
							user.role !== "DOMICILIARIO" && (
								<>
									<Tooltip title="Reservas" placement="right" enterDelay={500}>
										<button
											className="btn-lateral-dash"
											onClick={handleBookingsComponent}
										>
											<div className="icon-container">
												<i className="bi bi-journal-check"></i>
											</div>
											<span className="btn-text">Reservas</span>
										</button>
									</Tooltip>
									<Tooltip title="Usuarios" placement="right" enterDelay={500}>
										<button
											className="btn-lateral-dash"
											onClick={handleUsersListComponent}
										>
											<div className="icon-container">
												<i className="bi bi-people"></i>
											</div>
											<span className="btn-text">Usuarios</span>
										</button>
									</Tooltip>
									<Tooltip title="Portafolio" placement="right" enterDelay={500}>
										<button
											className="btn-lateral-dash"
											onClick={handlePortfolioComponent}
										>
											<div className="icon-container">
												<i className="bi bi-briefcase"></i>
											</div>
											<span className="btn-text">Portafolio</span>
										</button>
									</Tooltip>
									<Tooltip title="Adiciones y Sabores" placement="right" enterDelay={500}>
										<button
											className="btn-lateral-dash"
											onClick={handleAditionComponent}
										>
											<div className="icon-container">
												<TbCandy />
											</div>
											<span className="btn-text">Adiciones</span>
										</button>
									</Tooltip>
								</>
							)}

						<Tooltip title="Principal" placement="right" enterDelay={500}>
							<button
								className="btn-lateral-dash center-text"
								onClick={redirectHome}
							>
								<div className="icon-container">
									<HomeOutlinedIcon sx={{ width: 36, height: 36 }} />
								</div>
								<span className="btn-text">Home</span>
							</button>
						</Tooltip>
					</div>

					<div className="user-dashboard">
						<p className="rol-text">HELARTICO</p>
						<p className="rol-text-name">Ice cream bussines</p>
					</div>
				</div>
			</div>
			<div className="contanier-nav-component">
				<div className="nav-sup">
					<div className="logo h-content">
						<h1>HELARTICO</h1>
					</div>
					<div className="icons h-content">
						<Tooltip title="Ajustes" placement="left" enterDelay={500}>
							<a className="nav-item nav-icon" onClick={openSettingsUser}>
								<i className="bi bi-person icon-person"></i>
							</a>
						</Tooltip>
					</div>
				</div>
				<div className="div-specific-content">
					{activeComponent === "DashPortfolio" && (
						<DashPortfolio
							dashChange={dashContentChange}
							onAction={handleActionChild}
						/>
					)}
					{activeComponent === "DashBookings" && (
						<DashBookings
							dashChange={dashContentChange}
							onAction={handleActionChild}
						/>
					)}
					{activeComponent === "DashUsers" && (
						<DashUsers
							dashChange={dashContentChange}
							onAction={handleActionChild}
						/>
					)}
					{activeComponent === "DashOrders" && (
						<DashOrders
							dashChange={dashContentChange}
							onAction={handleActionChild}
						/>
					)}
					{activeComponent === "DashAditions" && (
						<DashAditions
							dashChange={dashContentChange}
							onAction={handleActionChild}
						/>
					)}
				</div>
			</div>
			{settingsVisible === true && (
				<UserSettings
					closeMethod={closeSettingsUser}
					onAction={handleActionChild}
					dashChange={dashContentChange}
				/>
			)}
		</div>
	);
}

export default Dashboard;
