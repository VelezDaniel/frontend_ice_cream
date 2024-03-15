import "./usersettings.css";

function UserSettings() {
	return (
		<div className="user-container">
			<div className="u-container1">
				<div className="wrap-btn">
					<button className="btn-back">
						<i className="bi bi-arrow-left-short"></i>
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
