import { useEffect, useState } from "react";
import { showProductsRequest } from "../api/products";
import NavBar from "../components/navbar/NavBar";
import "../css/products.css";
import { PiStarBold } from "react-icons/pi";
import ModalProduct from "../components/modal/modal_product/ModalProduct";
import ProductImgBuilder from "../utils/ProductImgBuilder";

function Products() {
	const [products, setProducts] = useState([]);
	const [productSelected, setProductSelected] = useState(null);
	const [showModalProductSelected, setShowModalProductSelected] =
		useState(false);

	useEffect(() => {
		// Realizar consulta a la base de datos para traer la informacion de productos
		const handleShowProducts = async () => {
			try {
				const items = await showProductsRequest();
				console.log("items: ",items);
				const allItems = items.data.body;
				const availableItems = allItems.filter(
					(item) => item.state === "DISPONIBLE"
				);
				setProducts(availableItems);
			} catch (error) {
				console.log("Error in Products: ", error);
			}
		};
		handleShowProducts();
	}, []);

	// Logica para separar los productos segun el tipo de producto
	const separatedProducts = {};
	products.forEach((product) => {
		if (!separatedProducts[product.productType]) {
			separatedProducts[product.productType] = [];
		}
		separatedProducts[product.productType].push(product);
		console.log("separate: ", separatedProducts);
	});

	useEffect(() => {
		if (showModalProductSelected) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [showModalProductSelected]);

	const handleProduct = (product) => {
		setShowModalProductSelected(true);
		console.log("product from handle ", product);
		setProductSelected(product);
	};

	return (
		<>
			<NavBar navBarType="NoHome" />
			<div className={`products-body`}>
				<header className="header-products">
					<h1>Productos</h1>
				</header>
				<main className="products-board">
					{/* Iterar cada seccion con sus productos */}
					{Object.entries(separatedProducts).map(([type, productsOfType]) => (
						<section key={type}>
							<h2>
								{type === "Infantil" ? type.concat("es") : type.concat("s")}
							</h2>
							<ul>
								{productsOfType.map((product) => (
									<li
										key={product.id}
										className="li-card-product"
										onClick={() => handleProduct(product)}
									>
										<div className="box-img-card-product">
											<img
												src={ProductImgBuilder(product.name.toLowerCase())}
												alt="imagen helado"
												className="img-card-portfolio"
											/>
										</div>
										<div className="box-info-product">
											<div className="info-product-1">
												<span
													className={`${
														type === "Wafle" ? "p-smaller" : "p-name-product"
													}`}
												>
													{product.name}
												</span>
												<span className="italic-item">
													{product.productType}
												</span>
												<span className="carousel-p-size">
													{product.productSize}
												</span>
											</div>
											<div className="info-product-2">
												<span className="carousel-p-price">
													${product.price}
												</span>
												<div className="rank-box">
													<PiStarBold className="icon-star" />
													<p>{product.rank}</p>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						</section>
					))}
					{showModalProductSelected && (
						<ModalProduct
							setStateModal={setShowModalProductSelected}
							product={productSelected}
						/>
					)}
				</main>
			</div>
		</>
	);
}

export default Products;
