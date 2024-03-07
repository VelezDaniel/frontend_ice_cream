import "./cardproduct.css";
import logoIceCream from "../../assets/imgs/helarticologo2.png";

function CardProduct() {
	return (
		<div>
			<div className="swiper-slide">
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span> $20.000</span>
						<h3>LA ALDEA</h3>
						<p>
							Gala, helado , piña calada , fresas, durazno , queso y chantilly
						</p>
					</div>
					<div className="product-img">
						<img src={aldea} alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>

			<div className="swiper-slide">
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span> $20.000</span>
						<h3>HELARTICO</h3>
						<p>frutas, helado, queso, yogurt sin sabor ,chantilly y salsas.</p>
					</div>
					<div className="product-img">
						<img src="images/helarticogrande.png" alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>

			<div className="swiper-slide">
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span> $19.000</span>
						<h3>MEGA SPLIT</h3>
						<p>
							{" "}
							Helado , banano, fresas, queso , mora calada , chantilly y salsas.
						</p>
					</div>
					<div className="product-img">
						<img src="images/Megasplit.png" alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>
			<div className="swiper-slide">
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span> $15.000</span>
						<h3>IRLANDEZ</h3>
						<p>Granizado de Cafe con Ron y crema de chantilly.</p>
					</div>
					<div className="product-img">
						<img src="images/irlandez.png" alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>

			<div className="swiper-slide">
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span> $10.000</span>
						<h3>OSITO</h3>
						<p>Helado y decoracion infantil.</p>
					</div>
					<div className="product-img">
						<img src="images/Osito.png" alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>

			<div className="swiper-slide">
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span> $15.000</span>
						<h3>SALPICON ESPECIAL</h3>
						<p>mezcla de frutas, helado, queso y chantilly.</p>
					</div>
					<div className="product-img">
						<img src="images/Salpiconespecial.png" alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>
			<div className="swiper-slide">
						<div className="icon-card">
							<i className="fa-solid fa-circle-arrow-left"></i>
							<img src={logoIceCream} alt="logo" />
							<i className="fa-regular fa-heart"></i>
						</div>
						<div className="product-content">
							<div className="product-txt">
								<span> $16.000</span>
								<h3>SIROPE DE BRAWNIE</h3>
								<p>Torta de brawnie caliente, helado y chantilly.</p>
							</div>
							<div className="product-img">
								<img
									src="images/sirope de brownie-Photoroom.png-Photoroom.png"
									alt=""
								/>
							</div>
						</div>
						<a href="#" className="btn-1">
							Comprar
						</a>
					</div>
			{/* <CardProduct /> */}
			<div className="swiper-slide">
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span> $20.000</span>
						<h3>WAFFLE ESPECIAL</h3>
						<p>torta de waffle,duraznos, fresas , helado y chantilly.</p>
					</div>
					<div className="product-img">
						<img src="images/wafleespecial.png" alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>

			<div className="swiper-slide">
				<div className="icon-card">
					<i className="fa-solid fa-circle-arrow-left"></i>
					<img src={logoIceCream} alt="logo" />
					<i className="fa-regular fa-heart"></i>
				</div>
				<div className="product-content">
					<div className="product-txt">
						<span> $20.000</span>
						<h3>IMPERIAL</h3>
						<p>Banano, durazno, fresas, yogurt, helado y chantilly.</p>
					</div>
					<div className="product-img">
						<img src="images/imperial.png" alt="" />
					</div>
				</div>
				<a href="#" className="btn-1">
					Comprar
				</a>
			</div>
		</div>
	);
}

export default CardProduct;
