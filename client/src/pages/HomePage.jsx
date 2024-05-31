import NavBar from "../components/navbar/NavBar";
import Banner from "../components/banner/banner";
import ComponentCarousel from "../components/carousel/Carousel";
import Footer from "../components/footer/Footer";
import "../css/homepage.css";

function HomePage() {
	return (
		<div className="body-home">
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
					<p className="subtext-description">Nuestros productos estan disponibles en los municipios</p>
					<div className="box-places">
						<p>Itagüí</p>
						<p>Sabaneta</p>
						<p>Envigado</p>
					</div>
					<p className="small-letter">El precio del domicilio depende de tu ubicación</p>
				</div>
			</div>
			<div className="container-poster">
				<div className="poster-container-description-two">
					<h4 className="subtext-description">Contamos con servicio de Domicilios</h4>
					<p className="description-small">
						Desde la comodidad de tu casa puedes pedir tus productos favoritos
						sin tener que acercarte a nuestro local físico
					</p>
					<p className="description-small">Disfrutar un delicioso helado en familia nunca fue tan comodo</p>
				</div>
				<div className="poster-styled-one">
					<p className="poster-text-2">Los mejores helados en la puerta de tu casa</p>
				</div>
			</div>
      </div>
			<Footer />
		</div>
	);
}
export default HomePage;
