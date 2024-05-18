import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/imgs/helarticologo2.png";

function NoneUserAuthenticated({ closeMethod }) {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("../login");
	};

	const handleRegister = () => {
		navigate("../register");
	}

	return (
		<>
			<div className="user-container size-container">
				<div className="u-container1">
					<div className="wrap-btn">
						<button className="btn-back" onClick={closeMethod}>
							<i>
								<IoClose />
							</i>
						</button>
					</div>
					<div className="u-container2">
						<div className="u-container2-1">
						<img className="img-logo-user-settings" src={logoImg} alt="" />
							<span className="user-sett-item text-highlighted">
								¡Bienvenid@!
							</span>
							<span className="user-sett-item text-highlighted">
								Aun no has ingresado
							</span>
							<span className="user-sett-item text-highlighted" id="long-text">
								Para ver mas opciones y disfrutar de todas las funcionalidades
								puedes registrarte o si ya tienes un usuario inicia sesión
							</span>
						</div>
					</div>
				</div>
				<div className="container-btns-user-settings">
					<button className="btn-cerrarsesion" onClick={handleLogin}>
						{/* <i className="bi bi-box-arrow-right"></i> */}
						Ingresar
					</button>

					<button className="btn-cerrarsesion" onClick={handleRegister}>
						{/* <i className="bi bi-box-arrow-right"></i> */}
						Registrarse
					</button>
				</div>
			</div>
		</>
	);
}
export default NoneUserAuthenticated;
