import { IoClose } from "react-icons/io5";
import "./shoppingcar.css";
import { CartContext } from "../../context/ShoppingCartContext";
import { useContext } from "react";
import ProductImgBuilder from "../../utils/ProductImgBuilder";

function ShoppingCar({ closeMethod }) {
	const [cart, setCart] = useContext(CartContext);

	const quantity = cart.reduce((accumulator, current) => {
		console.log("CART: ", cart);
		return accumulator + current.quantity;
	}, 0);

	const totalPrice = cart.reduce(
		(accumulator, current) => accumulator + current.quantity * current.price,
		0
	);

	return (
		<div className="car-container">
			<div className="u-container1 add-container-heigh">
				<div className="wrap-btn">
					<button className="btn-back" onClick={closeMethod}>
						<i>
							<IoClose />
						</i>
					</button>
				</div>
				<div>
					<h3 className="car-title">Tu pedido</h3>
				</div>
				<div className="u-container1-1 add-container-heigh">
					<div className="wrap-subtitle">
						<h4 className="car-subtitle">Lista de productos</h4>
					</div>
					<div className="divider">
						<div>
							{cart.map((order) => (
								<div className="small-card-cart" key={order.id}>
									<div className="box-img-card-product">
										<img
											src={ProductImgBuilder(
												order.orderBody.productInfo.name.toLowerCase()
											)}
										/>
									</div>
									<div className="container-cart-order-info">
										<p className="subtitle-gray">
											{order.orderBody.productInfo.name}
										</p>
										<p className="product-size-cart">
											{order.orderBody.productInfo.productSize}
										</p>
										<div className="cart-sect-horiontal bottom-space">
											<p>Precio</p>
											<p className="subtitle-gray">
												${order.orderBody.productInfo.price}
											</p>
										</div>
										{order.orderBody.aditions ? (
											<>
												<p className="product-size-cart">Adiciones</p>
												{order.orderBody.aditions.map((adition) => (
													<div className="cart-sect-horiontal" key={adition.id}>
														<p>{adition.nameAdition}</p>
														<p>${adition.priceAdition}</p>
													</div>
												))}
											</>
										) : (
											<p className="product-size-cart">Sin adiciones</p>
										)}
										<div className="cart-sect-horiontal top-space-smallest">
											<p>Total Producto</p>
											<p className="total-product-order">${order.price}</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<div>
							<div>Items in car: {quantity}</div>
							<div>Total: ${totalPrice}</div>
						</div>
					</div>
				</div>
			</div>
			<button onClick={() => console.log(cart)} className="btn-shopping-car">
				Pagar
			</button>
		</div>
	);
}

export default ShoppingCar;
