import "./footer.css";
import logoImg from "../../assets/imgs/helarticologo2.png";
import { useNavigate } from "react-router-dom";

function Footer() {
	const navigate = useNavigate();
	const goToRegister = () => {
		navigate("/register");
	};
	return (
		<div className="content">
			<div className="celda123">
				<div className="celda1 flex_center">
					<img src={logoImg} alt="" />
				</div>
				<div className="celda2 flex_center">
					<h2>Horarios de atención</h2>
					<div className="box-item-foot">
						<h3>Lunes a sábado</h3>
						<p>1:00pm a 8:30pm</p>
					</div>
					<div className="box-item-foot">
						<h3>Domingos y festivos</h3>
						<p>1:00pm a 9:00pm</p>
					</div>
					<div className="box-item-foot">
						<h3>Ubicación</h3>
						<p>Carrera 55 #63A-82 Barrio La Aldea</p>
					</div>
				</div>
				<div className="celda3 flex_center">
					<button onClick={() => goToRegister()} className="container-btn">
						<p>Registrate</p>
						<i className="bi bi-arrow-right-circle"></i>
					</button>
					<p className="item">Contacto</p>
					<p className="item">3016040064</p>
					<p className="item">Redes Sociales</p>
					<div className="btn-foot-social-media">
						<i className="bi-facebook"> Helados helartico</i>
					</div>
					<div className="btn-foot-social-media">
						<i className="bi-instagram"> @Heladoshelartico</i>
					</div>
					<div className="btn-foot-social-media">
						<i className="bi-whatsapp"></i> 3016040064
					</div>
				</div>
			</div>
			<div className="celda4">
				<h1> ¡Helados para satisfacer tus mayores antojos!</h1>
			</div>
			<div className="celda5">
				<p>COPYRIGHT 2024</p>
				<p>Todos los derechos de autor son reservados</p>
				<p>Politica de privacidad</p>
				<a href="#top">Inicio</a>
			</div>
		</div>
	);
}

export default Footer;
