import NavBar from "../components/navbar/NavBar";
import Banner from "../components/banner/banner";
import ComponentCarousel from "../components/carousel/Carousel";
import Footer from "../components/footer/Footer";
import "../css/homepage.css";

function HomePage() {
	return (
		<div>
			<NavBar />
			<Banner />
			<ComponentCarousel />
			{/* Posters publicitarios */}
			<div className="main-container-posters">
      <div className="container-poster">
				<div className="poster-styled-two">
					<p className="poster-text">
						¡Descubre la magia en cada cucharada y dale un dulce gusto a tu día
						con nuestros helados irresistibles!
					</p>
				</div>
				<div className="poster-container-description">
					<p className="subtext-description">Nuestros productos estan disponibles en todo el valle de aburrá</p>
					<p className="small-letter">El precio del domicilio depende de tu ubicación</p>
				</div>
			</div>
			<div className="container-poster">
				<div className="poster-container-description-two">
					<h4>Contamos con servicio de Domicilios</h4>
					<p>
						Desde la comodidad de tu casa puedes pedir tus productos favoritos
						sin tener que acercarte a nuestro local físico
					</p>
					<p>Disfrutar un delicioso helado en familia nunca fue tan comodo</p>
				</div>
				<div className="poster-styled-one">
					<p>Los mejores helados en la puerta de tu casa</p>
				</div>
			</div>
      </div>
			<Footer />
		</div>
	);
}
export default HomePage;
