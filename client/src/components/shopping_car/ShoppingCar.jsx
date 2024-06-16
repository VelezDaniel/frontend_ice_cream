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
import { showDeliveriesRequest } from "../../api/deliveries";
import { createUserRequest, showUserRequest } from "../../api/users";
import {
	createNewOrderRequest,
	createOrderProductRequest,
} from "../../api/orders";
import { insertDetailflavorsOrder } from "../../api/flavors";
import ModalTemplate from "../modal/ModalTemplate";
// * SONNER TOAST
import { toast } from "sonner";
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
	const [parcialOrder, setParcialOrder] = useState(null);
	const [deliveries, setDeliveries] = useState(null);

	let finalOrder;

	const { user } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
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

	useEffect(() => {
		const showDeliveries = async () => {
			const result = await showDeliveriesRequest();
			console.log("result deliveira; ", result);
			setDeliveries(result.data.body);
		};
		showDeliveries();
	}, []);

	useEffect(() => {
		// Mantener el local storage actualizado
		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
	}, [cart, totalPrice]);

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

	// In directamente al pago
	const goToPay = async () => {
		if (user && user.role === "CLIENTE") {
			finalOrder = {
				cart: cart,
				client: user,
				fromLocal: false,
				totalPriceOrder: totalPrice,
			};

			try {
				localStorage.setItem("finalOrder", JSON.stringify(finalOrder));

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
		} else {
			try {
				localStorage.setItem("finalOrder", JSON.stringify(finalOrder));

				const response = await createOrderRequest({
					userInformation: finalOrder.client,
					orderInformation: cart,
				});
				if (response) {
					console.log(response);
					window.location.href = response.data.links[1].href;
				}
			} catch (error) {
				console.log("Error in goToPay in ELSE: ", error);
			}
		}
	};

	const toastErrorCart = () => {
		toast.error("Ooh ooh", {
			className: "toast-error-style",
			description: "Algo salió mal... Por favor intentalo de nuevo",
			duration: 5000,
		});
	};

	const toastSuccessCart = () => {
		toast.success("Pedido exitoso", {
			className: "toast-success-style",
			description: "Se ha creado el pedido efectivamente",
			duration: 5000,
		});
	};

	// Para tomar pedido en el local (RECEPCIONISTA)
	const onSubmit = async (values) => {
		// Validar si el cliente ya a comprado antes
		const resultGetClient = await showUserRequest({ id: values.identity });

		if (resultGetClient.data.body.identity == values.identity) {
			finalOrder = {
				cart: cart,
				client: resultGetClient.data.body,
				fromLocal: true,
				totalPriceOrder: totalPrice,
			};
		} else {
			values.id = 0;
			console.log(values);
			console.log(cart);
			const createClient = await createUserRequest(values);
			console.log("createcliente", createClient);
			if(createClient.status === 201) {
			values.id = createClient.data.body.idClient;
				finalOrder = {
					cart: cart,
					client: values,
					fromLocal: true,
					totalPriceOrder: totalPrice,
				};
			}
		}

		// values.id = 0;
		// console.log(values);
		// console.log(cart);
		// const createClient = await createUserRequest(values);
		// console.log("createcliente", createClient);
		// if (createClient.status === 201) {
			// values.id = createClient.data.body.idClient;
			// finalOrder = {
			// 	cart: cart,
			// 	client: values,
			// 	fromLocal: true,
			// 	totalPriceOrder: totalPrice,
			// };

			console.log("finalOrder: ", finalOrder);
			const newOrder = await createNewOrderRequest(finalOrder);
			console.log("newOrder", newOrder);

			if (newOrder && newOrder.data.body[0] == "true") {
				setCart([]);
				reset();
				toastSuccessCart();
			} else {
				toastErrorCart();
			}
		// } else {
		// 	// Si no se ejecuta la consulta se muestra un mensaje de error
		// 	toastErrorCart();
		// }
	};

	//
	// Formulario para usuario no registrados
	const onSubmitUserForm = async (values) => {
		console.log("client info: ", values);
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
			area: values.area,
			accionRequestForm: "prevPayForm",
		};
		const result = await createUserRequest(client);

		console.log("result of client with prevForm ", result);

		if (result && result.data.body.affectedRows == 1) {
			// Cambiar el id del cliente al recibido por la consulta

			const resultGetClient = await showUserRequest({ id: client.identity });
			console.log("resultGet client : ", resultGetClient);
			if (resultGetClient) {
				finalOrder = {
					cart: cart,
					client: resultGetClient.data.body,
					fromLocal: false,
					totalPriceOrder: totalPrice,
				};
				console.log("final order before goTopay: ", finalOrder);
				goToPay();
			} else {
				toastErrorCart();
			}
		} else if (result && result.data.body.identity == client.identity) {
			finalOrder = {
				cart: cart,
				client: result.data.body,
				fromLocal: false,
				totalPriceOrder: totalPrice,
			};
			finalOrder.client.area = values.area;

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
						<br />
						<br />
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

							<span className="font-small-desc">
								Selecciona el area donde te encuentras
							</span>
							<div className="form-group-select">
								<select
									className="form-control"
									{...register("area", {
										required: {
											value: true,
											message: "Selecciona el area donde te encuentras",
										},
									})}
								>
									{deliveries &&
										deliveries.map((area) => (
											<option key={area.id} value={area.id}>
												{area.deliveryDescription}
											</option>
										))}
								</select>
							</div>
							{errors.area && <p className="notice">{errors.area.message}</p>}

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
			{/* <Toaster position="top-left" /> */}
		</div>
	);
}

export default ShoppingCar;
