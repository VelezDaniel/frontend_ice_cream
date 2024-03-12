import "./cardproduct.css";
import logoIceCream from "../../assets/imgs/helarticologo2.png";
import { Swiper, SwiperSlide } from "swiper/react";

function CardProduct({ name, price, description, image }) {
	return (
		<SwiperSlide>
			<div>
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span>${price}</span>
						<h3>{name}</h3>
						<p>{description}</p>
					</div>
					<div className="product-img">
						<img src={image} alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>
		</SwiperSlide>
	);
}

export default CardProduct;
