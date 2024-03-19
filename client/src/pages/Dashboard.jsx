import "./css/dashboard.css";
import { IoIceCreamOutline } from "react-icons/io5";
import UserSettings from "../components/user_settings/UserSettings";

function Dashboard() {
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
			{/* DASHBOARD */}
			<div className="nav-sup">
				<div className="logo h-content">
					<h1>HELARTICO</h1>
				</div>
				<div className="icons h-content">
					<a className="nav-item nav-icon" href="">
						<i className="bi bi-handbag"></i>
					</a>
					<a className="nav-item nav-icon" href="login">
						<i className="bi bi-person icon-person"></i>
					</a>
				</div>
			</div>
			<UserSettings />
		</div>
	);
}

export default Dashboard;
