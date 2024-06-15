import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Banner() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleClick = () => {
		navigate("/register");
	};

    const handleClickProducts = () => {
		navigate("/products");
	};

	return (
		<div className="welcome-menu">
			<h3>Deliciosos helados generan mágicas experiencias</h3>
			<p className="text-banner-subtext">
				Eres importante para nosotros, por eso trabajamos diariamente para darte
				el mejor servicio y las mejores experiencias, satisfaciendo tus pequeños
				y grandes antojos.
			</p>
			<div className="container-btn">
				{user && user.name ? (
					<button className="btn btn-portfolio" onClick={() => handleClickProducts}>
						Ver productos
						<i className="bi bi-arrow-right-short arrow"></i>
					</button>
				) : (
					<button className="btn btn-portfolio" onClick={() => handleClick}>
						Registrarse
						<i className="bi bi-arrow-right-short arrow"></i>
					</button>
				)}
			</div>
		</div>
	);
}

export default Banner;
