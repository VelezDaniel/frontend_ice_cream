// import CardProduct from "../card_product/CardProduct";
import "./mainproducts.css";
import CardProduct from "../card_product/CardProduct";
// import logoIceCream from '../../assets/imgs/helarticologo2.png';
// import aldea from '../../assets/imgs/main_products_imgs/aldea.png';
import {Swiper, SwiperSlide } from 'swiper/react';

function MainProducts() {

	const swiper = new Swiper(".mySwiper", {
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		loop: true,
		coverflowEffect: {
				depth: 500,
				modifer: 1,
				slidesShadows: true,
				rotate: 0,
				stretch: 0

		}
})

	return (
		<div className="superBody">
			<header>
				<div className="destacado">
					<h1>PRODUCTOS DESTACADOS</h1>
				</div>
			</header>
			<div className="swiper mySwiper ">
				<div className="swiper-wrapper">
					<CardProduct/>
				</div>
			</div>
		</div>
	);
}

export default MainProducts;