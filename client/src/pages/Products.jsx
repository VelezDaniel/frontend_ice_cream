import { useState } from "react";
import { showProducts } from "../api/products";

function Products() {
	const [products, setProducts] = useState([]);

	// let products;
	const handleShowProducts = async () => {
		try {
			const result = await showProducts();
      const productsInfo = result.data.body;
			console.log(productsInfo);
			setProducts(productsInfo);
		} catch (error) {
			console.log("Error in Products.jsx: ", error);
		}
	};

	return (
		<div>
			<div>
				<h1>Productos</h1>
				<button onClick={handleShowProducts}>Productos</button>
			</div>
			<div>
				{products.map((product) => (
					<div key={product.ID_PRODUCTO}>
						<h3>{product.NOMBRE_PRODUCTO}</h3>
						<p>Precio: {product.PRECIO_UNITARIO}</p>
						<p>Descripción: {product.DESCRIPCION_PRODUCTO}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Products;
