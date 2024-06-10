import { IoClose } from "react-icons/io5";
import { LiaIceCreamSolid } from "react-icons/lia";
import "./shoppingcar.css";
import { CartContext } from "../../context/ShoppingCartContext";
import { useContext, useEffect, useState } from "react";
import ProductImgBuilder from "../../utils/ProductImgBuilder";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createOrderRequest } from "../../api/payment";
import { createUserRequest } from "../../api/users";
import { createOrderProductRequest } from "../../api/orders";
import { insertDetailflavorsOrder } from "../../api/flavors";
import ModalTemplate from "../modal/ModalTemplate";
// * SONNER TOAST
import { Toaster, toast } from "sonner";
// * MATERIAL UI IMPORTS
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
// * icons
import { FaArrowRight } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

function ShoppingCar({ closeMethod }) {
	const [cart, setCart] = useContext(CartContext);
	// const [finalOrder, setFinalOrder] = useState(null);
	const [modal, setModal] = useState(false);
	const [formIsActive, setFormIsActive] = useState(false);

	let finalOrder;

	const { user } = useAuth();
	const navigate = useNavigate();

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

	// useEffect(() => {
	// 	if (idOrder) {
	// 		console.log(idOrder);
	// 		cart.map((order) => {
	// 			if (order.id === idOrder) {
	// 				return order;
	// 			} else {
	// 				return null;
	// 			}
	// 		});
	// 	}
	// 	setValue()
	// }, [idOrder]);

	// const editProduct = (id) => {
	// 	setIdOrder(id);
	// };

	// const redirectTo = (page) => {
	// 	navigate(`${page}`);
	// };

	const handlerPaymentRedirect = () => {
		if (user && user.role === "CLIENTE") {
			goToPay();
		} else {
			setModal(false);
			setFormIsActive(true);
			// goToPrevFormPayment();
		}
	};

	const goToPay = async () => {
		if (user && user.role === "CLIENTE") {
			finalOrder = {
				cart: cart,
				client: user,
				totalPriceOrder: totalPrice,
			};
			try {
				localStorage.setItem("cart", JSON.stringify(cart));

				const response = await createOrderRequest({
					userInformation: user,
					orderInformation: cart,
				});
				if (response) {
					console.log(response);
					window.location.href = response.data.links[1].href;
				}
			} catch (error) {
				console.log("Error in goToPay: ", error);
			}
		}
	};

	const toastErrorCart = () => {
		toast.error("Ooh ooh", {
			className: "toast-error-style",
			description: "No algo salió mal... Por favor intentalo de nuevo",
			duration: 5000,
		});
	};

	const onSubmit = async (values) => {
		values.id = 0;
		finalOrder = {
			cart: cart,
			client: values,
			totalPriceOrder: totalPrice,
		};
		// setFinalOrder(order);
		// cart.client = values;
		console.log(values);
		console.log(cart);
		console.log(finalOrder);
		const createClient = await createUserRequest(values);
		console.log(createClient);
		if (
			(createClient && createClient.data.body.affectedRows) ||
			(createClient && createClient.data.body.identity == values.identity)
		) {
			// Se utiliza For of porque este permite el uso de async await, el forEach no
			for (const element of cart) {
				const order = {
					id: 0,
					quantity: element.quantity,
					description: element.orderBody.description,
					totalValueProduct: element.price,
					cutlery: element.orderBody.cutlery === true ? 1 : 0,
					idProduct: element.orderBody.productInfo.id,
				};

				try {
					const orderResult = await createOrderProductRequest(order);
					console.log("orderResult: ", orderResult);

					if (orderResult && orderResult.data.body[1].insertId) {
					}
				} catch (error) {
					console.error("Error creating order: ", error);
					// Optionally handle the error (e.g., roll back previous operations, notify user)
					toastErrorCart();
					return;
				}
			}

			// const order = {
			// 	id: 0,
			// 	quantity: element.quantity,
			// 	description: element.orderBody.description,
			// 	totalValueProduct: element.price,
			// 	cutlery: (element.orderBody.cutlery === true) ? 1 : 0,
			// 	idProduct: element.orderBody.productInfo.id,
			// }
			// const orderResult = await createOrderProductRequest(order);
			// console.log("orderResult: ", orderResult);

			// const flavorDetail = {
			// 	id: 0,
			// 	flavors: cart.orderBody.flavors,
			// };
			// for (let i = 0; i < cart.orderBody.flavors.length; i++) {
			// 	const flavor = {
			// 		id: 0,
			// 		idFlavor: cart.orderBody.flavors.id[i],
			// 		idOrder: orderResult,
			// 	};

			// 	const flavorDetailResult = await insertDetailflavorsOrder(flavor);
			// }
			// Si el cliente seleccionó alguna adición se ejecuta esta lógica
			// if (cart.orderBody.aditions.length > 0) {
			// }
		} else {
			// Si no se ejecuta la consulta se muestra un mensaje de error
			toastErrorCart();
		}
	};

	const onSubmitUserForm = async (values) => {
		console.log("user info: ", values);
		// Guardar los datos (unicamente tabla persona)
		const client = {
			id: 0,
			name: values.name,
			lastName: values.lastName,
			identity: values.identity,
			phone: values.phone,
			email: values.email,
			address: values.address,
			birth: values.birth,
			accionRequestForm: "prevPayForm",
		};
		const result = await createUserRequest(client);

		// Validar si se actualizó o se inserto y agregar datos del cliente al carrito para efectuar la factura correctamente
		if (result && result.data.body.affectedRows) {
			console.log(result);
			finalOrder = {
				cart: cart,
				client: client,
				totalPriceOrder: totalPrice,
			};
			goToPay();
		} else if (result && result.data.body.identity == client.identity) {
			finalOrder = {
				cart: cart,
				client: result.data.body,
				totalPriceOrder: totalPrice,
			};
			// cart.client = result.data.body;
			goToPay();
		} else {
			toastErrorCart();
		}
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
											{order.orderBody.aditions &&
											order.orderBody.aditions.length > 0 ? (
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
				<button onClick={() => setModal(true)} className="btn-shopping-car">
					Pagar
				</button>
			) : (
				<div></div>
			)}
			{modal && modal === true && (
				<ModalTemplate
					showHeader={true}
					designClass={""}
					setStateModal={setModal}
					title={"Elige tu forma de pago"}
				>
					<div className="box-payment-methods">
						<h4>Puedes elegir solo una forma de pago</h4>
						<div>
							<button
								onClick={() => handlerPaymentRedirect()}
								className="btn-shopping-car"
							>
								Pagar ahora
							</button>
							<button className="btn-shopping-car">Contra entrega</button>
						</div>
					</div>
				</ModalTemplate>
			)}

			{formIsActive && formIsActive === true && (
				<ModalTemplate
					showHeader={true}
					designClass={""}
					title={"Permitenos conocerte"}
					setStateModal={setFormIsActive}
				>
					<div className="body-modal-prevpay-form">
						<div className="box-subtitle-prevpay-form">
							<p className="p1">Por favor ingresa tus datos</p>
							<p className="p2">
								(estos serán utilizados solo para identificar tu compra)
							</p>
						</div>
						<form
							className="form-register"
							onSubmit={handleSubmit(onSubmitUserForm)}
						>
							<div className="input-group">
								<label htmlFor="name">
									<i className="bi bi-person"></i>
								</label>
								<input
									type="text"
									autoComplete="off"
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
									placeholder="Nombres"
								/>
							</div>
							{errors.name && <p className="notice">{errors.name.message}</p>}
							<div className="input-group">
								<label htmlFor="lastName">
									<i className="bi bi-person"></i>
								</label>
								<input
									type="text"
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
									placeholder="Apellidos"
								/>
							</div>
							{errors.lastName && (
								<p className="notice">{errors.lastName.message}</p>
							)}
							<div className="input-group">
								<label htmlFor="identity">
									<i className="bi bi-person-vcard"></i>
								</label>
								<input
									type="number"
									autoComplete="off"
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
									placeholder="Documento"
									// value={userId}
								/>
							</div>
							{errors.identity && (
								<p className="notice">{errors.identity.message}</p>
							)}
							<div className="input-group">
								<label htmlFor="email">
									<i className="bi bi-envelope"></i>
								</label>
								<input
									type="text"
									autoComplete="off"
									{...register("email", {
										required: {
											value: true,
											message: "Correo es requerido",
										},
										pattern: {
											value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
											message: "Correo no es valido",
										},
									})}
									placeholder="Correo (mismo de Paypal)"
								/>
							</div>
							{errors.email && <p className="notice">{errors.email.message}</p>}
							<div className="input-group">
								<label htmlFor="phone">
									<i className="bi bi-phone"></i>
								</label>
								<input
									type="number"
									autoComplete="off"
									{...register("phone", {
										required: {
											value: true,
											message: "Celular es requerido",
										},
										minLength: {
											value: 10,
											message: "No es un celular valido",
										},
									})}
									placeholder="Celular"
								/>
							</div>
							{errors.phone && <p className="notice">{errors.phone.message}</p>}

							<div className="input-group">
								<label htmlFor="address">
									<i className="bi bi-house"></i>
								</label>
								<input
									type="text"
									autoComplete="off"
									{...register("address", {
										required: {
											value: true,
											message: "Dirección es requerida",
										},
										minLength: {
											value: 6,
											message: "No es una dirección válida",
										},
									})}
									placeholder="Dirección"
								/>
							</div>
							{errors.address && (
								<p className="notice">{errors.address.message}</p>
							)}

							<label htmlFor="birth">
								<i className="bi bi-calendar3"></i> Fecha de Nacimiento
							</label>
							<input
								type="date"
								id="nacimiento"
								{...register("birth", {
									required: {
										value: true,
										message: "Fecha de nacimiento es requerida",
									},
								})}
							/>
							{errors.birth && <p className="notice">{errors.birth.message}</p>}
							<div className="box-text-terms-prev-form">
								<p>
									Para continuar debes aceptar los terminos y condiciones de
									nuestro sitio y la política de tratamiento de datos
								</p>
								<a href="">
									Ver documentos <FaArrowRight />
								</a>
								<label className="container-checkbox">
									<input
										type="checkbox"
										{...register("terms", {
											required: {
												value: true,
												message: "Debes aceptar los terminos",
											},
										})}
									/>
									<svg viewBox="0 0 64 64" height="1.5em" width="1.5em">
										<path
											d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
											pathLength="575.0541381835938"
											className="path"
										></path>
									</svg>
									<p>Aceptar todos</p>
								</label>
							</div>
							{errors.terms && <p className="notice">{errors.terms.message}</p>}
							<input className="btn-enviar" type="submit" value="Continuar" />
						</form>
					</div>
				</ModalTemplate>
			)}
			<Toaster position="top-left" />
		</div>
	);
}

export default ShoppingCar;
