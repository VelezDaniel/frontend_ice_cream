import Carousel from "react-multi-carousel";
import "./carousel.css";
import "react-multi-carousel/lib/styles.css";
import ProductImgBuilder from "../../utils/ProductImgBuilder";
import { PiStarBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { showProductsRequest } from "../../api/products";
import ModalProduct from "../modal/modal_product/ModalProduct";

const ComponentCarousel = () => {
	const [products, setProducts] = useState([]);
	const [showModalProductSelected, setShowModalProductSelected] = useState(false);
	const [productSelected, setProductSelected] = useState(null);


	useEffect(() => {
		// Realizar consulta a la base de datos para traer la informacion
		const handleShowProducts = async () => {
			try {
				const items = await showProductsRequest();
				// Establecer productos destacados
				setProducts(items.data.body);
			} catch (error) {
				console.log("Error in Carousel home: ", error);
			}
		};
		handleShowProducts();
	}, []);

	const handleProduct = (product) => {
		setShowModalProductSelected(true);
		setProductSelected(product);
	};

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	return (
		<div className="superBody">
			<header>
				<div className="destacado">
					<h1>PRODUCTOS DESTACADOS</h1>
				</div>
			</header>

			<Carousel className="carousel-design" responsive={responsive}>
				{products.map((product) => (
					<div className="carousel-card" key={product.id}>
						<div className="box-img-carousel-product">
							<img src={ProductImgBuilder(product.name.toLowerCase())} alt="imagen helado" />
						</div>
						<div className="carousel-card-product-content">
							<div className="carousel-card-p-subcontent">
								<p className="carousel-p-price">${product.price}</p>
								<div className="carousel-p-box">
									<p className="carousel-p-name">{product.name}</p>
									<div className="rank-box">
										<PiStarBold className="icon-star" />
										<p>{product.rank}</p>
									</div>
								</div>
									<p className="carousel-p-size">{product.productSize}</p>
								<p className="carousel-p-description">{product.description}</p>
							</div>
						</div>
						<button className="btn-carousel-card-product" onClick={() => handleProduct(product)}>
							Comprar
						</button>
					</div>
				))}
			</Carousel>
			{showModalProductSelected && (
				<ModalProduct
				setStateModal={setShowModalProductSelected}
				product={productSelected}
			/>
			)}
		</div>
	);
};

export default ComponentCarousel;
