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
// import { LuPencilLine } from "react-icons/lu";
import { TbCandy } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
import UserSettings from "../components/user_settings/UserSettings";

// ** MATERIAL IMPORTS **
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function Dashboard() {
	const [activeComponent, setActiveComponent] = useState(null);
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [dashContentChange, setDashContentChange] = useState(0);

	const { user } = useAuth();
	console.log("show User: ", user);
	const navigate = useNavigate();

	//  Seleccionar componente PEDIDOS
	const handleOrdersComponent = () => {
		showComponent("DashOrders");
		// updateDashBoardAction("DashOrders");
	};
	// ! Seleccionar componente VENTAS

	// Seleccionar componente RESERVAS
	const handleBookingsComponent = () => {
		showComponent("DashBookings");
		// updateDashBoardLocation("DashBookings");
	};

	//  Seleccionar componente Usuarios
	const handleUsersListComponent = () => {
		showComponent("DashUsers");
		// updateDashBoardLocation("DashUsers");
	};

	// Seleccionar componente PORTAFOLIO
	const handlePortfolioComponent = () => {
		showComponent("DashPortfolio");
		// updateDashBoardLocation("DashPortfolio");
	};

	// Seleccionar componente ADICIONES
	const handleAditionComponent = () => {
		showComponent("DashAditions");
		// updateDashBoardLocation("DashAditions");
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
						{/* <button className="btn-mostrarmenos">
							<div className="icon-container1">
								<i className="bi bi-arrow-right"></i>
							</div>
							<span className="btn-text">Mostrar Menos</span>
						</button> */}
						<button
							className="btn-lateral-dash top-space"
							onClick={handleOrdersComponent}
						>
							<div className="icon-container">
								<IoIceCreamOutline size={28} />
							</div>
							<span className="btn-text">Pedidos</span>
						</button>

						{/* seccion permitida solo para el administrador */}
						{user && (user.role === "ADMIN" || user.role === "TESORERO") && (
							<button className="btn-lateral-dash">
								<div className="icon-container">
									<i className="bi bi-cash-coin"></i>
								</div>
								<span className="btn-text">Ventas</span>
							</button>
						)}

						{/* Seccion deshabilitada para clientes y domiciliarios */}
						{user &&
							user.role !== "CLIENTE" &&
							user.role !== "DOMICILIARIO" && (
								<>
									<button
										className="btn-lateral-dash"
										onClick={handleBookingsComponent}
									>
										<div className="icon-container">
											<i className="bi bi-journal-check"></i>
										</div>
										<span className="btn-text">Reservas</span>
									</button>
									<button
										className="btn-lateral-dash"
										onClick={handleUsersListComponent}
									>
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
								</>
							)}

						<button
							className="btn-lateral-dash center-text"
							onClick={redirectHome}
						>
							<div className="icon-container">
								<HomeOutlinedIcon sx={{ width: 36, height: 36 }} />
							</div>
							<span className="btn-text">Home</span>
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
						<a className="nav-item nav-icon" onClick={openSettingsUser}>
							<i className="bi bi-person icon-person"></i>
						</a>
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
				<UserSettings closeMethod={closeSettingsUser} />
			)}
		</div>
	);
}

export default Dashboard;
