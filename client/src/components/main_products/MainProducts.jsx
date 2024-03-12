// import CardProduct from "../card_product/CardProduct";
import "./mainproducts.css";
// import 'swiper/css/swiper.min.css'
import CardProduct from "../card_product/CardProduct";
// import logoIceCream from '../../assets/imgs/helarticologo2.png';
import aldea from "../../assets/imgs/main_products_imgs/aldea.png";
import { Swiper, SwiperSlide } from "swiper/react";

function MainProducts() {
	const products = [
		{
			name: "LA ALDEA",
			price: 2000,
			description: "Gala, helado, piña colada, fresas",
			image: aldea,
		},
		{
			name: "HELARTICO",
			price: 2000,
			description: "Gala, helado, piña colada, fresas",
			image: aldea,
		},
		{
			name: "HELARTICO2",
			price: 2000,
			description: "Gala, helado, piña colada, fresas",
			image: aldea,
		},
		{
			name: "HELARTIC3",
			price: 2000,
			description: "Gala, helado, piña colada, fresas",
			image: aldea,
		},
	];

	// const swiper = new Swiper(".mySwiper", {
	// 	effect: "coverflow",
	// 	grabCursor: true,
	// 	centeredSlides: true,
	// 	slidesPerView: "auto",
	// 	loop: true,
	// 	coverflowEffect: {
	// 		depth: 500,
	// 		modifer: 1,
	// 		slidesShadows: true,
	// 		rotate: 0,
	// 		stretch: 0,
	// 	},
	// });

	// return (
	// 	<div className="superBody">
	// 		<header>
	// 			<div className="destacado">
	// 				<h1>PRODUCTOS DESTACADOS</h1>
	// 			</div>
	// 		</header>
	// 		<div className="swiper mySwiper ">
	// 			<div className="swiper-wrapper">
	// 				<CardProduct />
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	return (
    <div className="superBody">
      <header>
        <div className="destacado">
          <h1>PRODUCTOS DESTACADOS</h1>
        </div>
      </header>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        loop={true}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          depth: 500,
          modifier: 1,
          slideShadows: true,
          rotate: 0,
          stretch: 0,
        }}
      >
        {products.map((product, index) => (
          <CardProduct key={index} {...product} />
        ))}
      </Swiper>
    </div>
  );
}

export default MainProducts;