import { IoClose } from "react-icons/io5";
import "./shoppingcar.css";
import { CartContext } from "../../context/ShoppingCartContext";
import { useContext } from "react";
import ProductImgBuilder from "../../utils/ProductImgBuilder";

// * MATERIAL UI IMPORTS
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

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

	// ? FUNCIONES PREVIAS NECESARIAS PARA EL CARRITO
	const addToCart = (id, orderBody, price) => {
		setCart((currentItems) => {
			const isItemsFound = currentItems.find((item) => item.id === id);
			if (isItemsFound) {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			} else {
				return [...currentItems, { id, quantity: 1, price, orderBody }];
			}
		});
	};

	// // ? Añadir al carrito un producto
	// const addToCart = () => {
	// 	setCart((currentItems) => {
	// 		const isItemsFound = currentItems.find((item) => item.id === id);
	// 		if (isItemsFound) {
	// 			return currentItems.map((item) => {
	// 				if (item.id === id) {
	// 					return { ...item, quantity: item.quantity + 1 };
	// 				} else {
	// 					return item;
	// 				}
	// 			});
	// 		} else {
	// 			return [...currentItems, { id, quantity: 1, price }];
	// 		}
	// 	});
	// };

	// ? Eliminar un producto del carrito (uno por uno)
	const removeItemCart = (id) => {
		setCart((currentItems) => {
			if (currentItems.find((item) => item.id === id)?.quantity === 1) {
				return currentItems.filter((item) => item.id !== id);
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	// ? Eliminar completamente el producto sin importar si cantidad es mayor a 1
	const removeAllProduct = (id) => {
		const updateCart = cart.filter((item) => item.id !== id);
		setCart(updateCart);
	};

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
						<div className="container-prodcuts">
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

										<div className="container-icons-product-cart">
											{/* Edit button */}
											<IconButton sx={{ width: 42, height: 42 }}>
												<DeleteOutlineOutlinedIcon
													color="primary"
													sx={{
														width: 30,
														height: 30,
													}}
												/>
											</IconButton>
											{/* Plus button */}
											<IconButton onClick={() => addToCart(order.id, order.orderBody, order.price)} sx={{ width: 42, height: 42 }}>
												<AddOutlinedIcon
													color="primary"
													sx={{
														width: 30,
														height: 30,
													}}
												/>
											</IconButton>
											<span className="amount-product">{order.quantity}</span>
											{/* Minus Button */}
											<IconButton onClick={() => removeItemCart(order.id)} sx={{ width: 42, height: 42 }}>
												<RemoveOutlinedIcon
													color="primary"
													sx={{
														width: 30,
														height: 30,
													}}
												/>
											</IconButton>
											{/* Delete button */}
											<IconButton
												onClick={() => removeAllProduct(order.id)}
												sx={{ width: 42, height: 42 }}
											>
												<DeleteOutlinedIcon
													color="primary"
													sx={{
														width: 30,
														height: 30,
													}}
												/>
											</IconButton>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="container-products-cart-price top-space">
							<p>Productos: {quantity}</p>
							<p>Total: ${totalPrice}</p>
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
