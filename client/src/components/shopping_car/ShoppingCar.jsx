import { IoClose } from "react-icons/io5";
import { LiaIceCreamSolid } from "react-icons/lia";
import "./shoppingcar.css";
import { CartContext } from "../../context/ShoppingCartContext";
import { useContext } from "react";
import ProductImgBuilder from "../../utils/ProductImgBuilder";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

// * MATERIAL UI IMPORTS
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
// icons
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

function ShoppingCar({ closeMethod }) {
	const [cart, setCart] = useContext(CartContext);
	const { user } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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

	const StyledTextField = styled(TextField)({
		"& .MuiInputBase-input": {
			fontFamily: "Montserrat",
			fontSize: "14px",
			fontWeight: 600,
		},
		"& .MuiInputLabel-root": {
			fontFamily: "Montserrat",
			fontSize: "14px",
			fontWeight: 600,
		},
	});

	const onSubmit = (values) => {
		console.log(values);
		console.log(cart);
	};

	return (
		<div className="car-container">
			<div className="u-container1 add-container-heigh">
				<div className="wrap-btn cont-separate">
					<div>
						<h3 className="car-title">Tu pedido</h3>
					</div>
					<button className="btn-back" onClick={closeMethod}>
						<i>
							<IoClose />
						</i>
					</button>
				</div>

				{cart && cart.length > 0 ? (
					<div className="u-container1-1 add-container-heigh">
						<div className="wrap-subtitle">
							<h4 className="car-subtitle">Lista de productos</h4>
						</div>
						<div className="divider">
							<div className="container-products">
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
											{order.orderBody.aditions && order.orderBody.aditions.length > 0 ? (
												<>
													<p className="product-size-cart">Adiciones</p>
													{order.orderBody.aditions.map((adition) => (
														<div
															className="cart-sect-horiontal"
															key={adition.id}
														>
															<p>{adition.nameAdition}</p>
															<p>${adition.priceAdition}</p>
														</div>
													))}
												</>
											) : (
												<p className="product-size-cart">Sin adiciones</p>
											)}

											{order.orderBody.sauce && order.orderBody.sauce != {} ? (
												<div className="cart-sect-horiontal">
													<p>Salsa</p>
													<p>{order.orderBody.sauce.sauceName}</p>
												</div>
											) : (
												<div className="cart-sect-horiontal">
													<p>Salsa</p>
													<p>Ninguna</p>
												</div>
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
												<IconButton
													onClick={() =>
														addToCart(order.id, order.orderBody, order.price)
													}
													sx={{ width: 42, height: 42 }}
												>
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
												<IconButton
													onClick={() => removeItemCart(order.id)}
													sx={{ width: 42, height: 42 }}
												>
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
				) : user &&
				  (user.role === "RECEPCIONISTA" ||
						user.role === "DOMICILIARIO" ||
						user.role === "TESORERO") ? (
					<div className="container-notice-shop">
						<h4>No has agregado ningún producto aún</h4>
					</div>
				) : (
					<div className="container-notice-shop">
						<h4>No has agregado ningún producto aún</h4>
						<button className="add-to-cart-shop">
							<LiaIceCreamSolid size={38} />
							Agregar
							<LiaIceCreamSolid size={38} />
						</button>
					</div>
				)}
			</div>

			{user && user.role === "RECEPCIONISTA" ? (
				<div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="form-user-receptionist"
					>
						<p className="subtitle-gray">Datos de Cliente</p>
						<StyledTextField
							id="standard"
							variant="standard"
							autoComplete="off"
							label="Nombre"
							{...register("name", {
								required: {
									value: true,
									message: "Campo nombre es requerido",
								},
								minLength: {
									value: 2,
									message: "Nombre debe ser minimo de dos letras",
								},
								maxLength: {
									value: 25,
									message: "Nombre debe ser menor a 25 letras",
								},
							})}
						/>
						{errors.name && <p className="notice">{errors.name.message}</p>}
						<StyledTextField
							id="standard"
							label="Apellido"
							variant="standard"
							autoComplete="off"
							{...register("lastName", {
								required: {
									value: true,
									message: "Apellidos es requerido",
								},
								minLength: {
									value: 2,
									message: "Apellido debe ser minimo de dos letras",
								},
								maxLength: {
									value: 40,
									message: "Apellido debe ser menor a 40 letras",
								},
							})}
						/>
						{errors.lastName && (
							<p className="notice">{errors.lastName.message}</p>
						)}
						<StyledTextField
							id="standard-number"
							label="Documento"
							autoComplete="off"
							type="number"
							variant="standard"
							{...register("identity", {
								required: {
									value: true,
									message: "Identificacion requerida",
								},
								minLength: {
									value: 6,
									message: "No es una identificacion válida",
								},
							})}
						/>
						{errors.identity && (
							<p className="notice">{errors.identity.message}</p>
						)}
						{cart && cart.length > 0 ? (
							<button className="btn-shopping-car">Agregar</button>
						) : (
							<div></div>
						)}
					</form>
				</div>
			) : cart && cart.length > 0 ? (
				<button className="btn-shopping-car">Pagar</button>
			) : (
				<div></div>
			)}
		</div>
	);
}

export default ShoppingCar;
