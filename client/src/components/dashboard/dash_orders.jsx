import { BiBookmarkAltPlus } from "react-icons/bi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { showOrdersRequest } from "../../api/orders";
import ModalTemplate from "../modal/ModalTemplate";
import ProductImgBuilder from "../../utils/ProductImgBuilder";
import "./css/dash_orders.css";
// * Imports Material UI
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Stack,
} from "@mui/material";

const DashOrders = ({ dashChange, onAction }) => {
	const [ordersData, setOrdersData] = useState([]);

	// Mostrar Pedidos
	useEffect(() => {
		const handleShowOrders = async () => {
			try {
				const items = await showOrdersRequest();
				console.log("items;", items);
				setOrdersData(items.data.body);
			} catch (error) {
				console.log("error catch: ", error);
			}
		};
		handleShowOrders();
	}, [dashChange]);

	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Pedidos</h2>
				<div>
					<input type="text" placeholder="Buscar por Identificación" />
				</div>
			</div>
			<div className="div-dash-btn-add">
				<button>
					<BiBookmarkAltPlus size={26} />
					Añadir nuevo
				</button>
			</div>
			{/* MODAL AÑADIR USUARIO */}
			{/* {addModal && (
				<ModalTemplate
					setStateModal={setAddModal}
					title="Nueva Reservación"
					showHeader={true}
				>
					<div className="modal-content-body">
						<h4>Ingresa la información de la reservacion</h4>
						
					</div>
				</ModalTemplate>
			)} */}
			{/* main content */}
			<div className="container-orders-products">
				{ordersData &&
					ordersData.map((order) => (
						<div key={order.idOrder} className="container-order-products">
							<div className="order-products-header">
								<p className="font-title-description-order">Pedido: {order.idOrder}</p>
								<p className="font-title-description-order">{order.deliveryDescription}</p>
								{order.descriptionDelivery &&
									order.descriptionDelivery != null && (
										<>
											<p className="font-title-description-order">Direccion: {order.descriptionDelivery}</p>
											<p className="font-title-description-order">${order.priceDelivery}</p>
										</>
									)}
								<div className="box-info-client-order">
									<p className="font-title-description-order">Datos del Cliente</p>
									<p className="font-title-description-order">Id: {order.client.identity}</p>
									<p className="font-title-description-order">
										{order.client.name} {order.client.lastName}
									</p>
									{order.client.address != "N/A" && (
										<p>{order.client.address}</p>
									)}
									{order.client.phone != null && <p>{order.client.phone}</p>}
									{order.client.area != null && <p>{order.client.area}</p>}
								</div>
							</div>
							<div className="order-products-body">
								{order &&
									order.details &&
									order.details.map((detail) => (
										<Card className="product-card" key={detail.idDetail} sx={{ maxWidth: 300, minWidth: 254, height: "auto" }}>
											<CardMedia
												component="img"
												sx={{
													maxHeight: 124, // Ajusta esto según tus necesidades
													maxWidth: 218, // Ajusta esto según tus necesidades
													objectFit: "contain",
													margin: "0 auto",
												}}
												image={ProductImgBuilder(
													detail.product.productName.toLowerCase()
												)}
												title="imagen helado"
											/>
											<CardContent>
												<p
													className="font-title-description-order"
													gutterBottom
													variant="h5"
													component="div"
												>
													{detail.product.productName}
												</p>
												<p className="font-title-description-order">
													{detail.product.productSize}
												</p>
												{detail.product.iceQuantity &&
													detail.product.iceQuantity != 0 &&
													detail.flavorsName.length > 0 && (
														<p className="font-text-description-order">
															Sabores:{" "}
															{detail.flavorsName.map((flavor) => (
																<span key={flavor}> {flavor}</span>
															))}
														</p>
													)}
												{detail.aditionsName &&
													detail.aditionsName.length > 0 && (
														<>
															<p className="font-text-description-order">
																Adiciones
															</p>
															{detail.aditionsName.map((adition) => (
																<span
																	className="font-text-description-order"
																	key={adition}
																>
																	{" "}
																	{adition}
																</span>
															))}
															{/* <p>{detail.aditionsName}</p> */}
														</>
													)}
												{detail.detailDescription && (
													<>
														<p className="font-text-description-order">
															Comentario del cliente
														</p>
														<p
															className="font-text-description-order"
															variant="body2"
															color="primary"
														>
															{detail.detailDescription}
														</p>
														<p className="font-text-description-order">
															Cubiertos: {detail.cutlery == 1 ? "Si" : "No"}
														</p>
													</>
												)}
												<p className="font-title-description-order">
													${detail.totalProduct}
												</p>
											</CardContent>
										</Card>
									))}
							</div>
							<Stack sx={{ padding: 2 }} spacing={2} direction="row">
								<Button
									sx={{
										fontSize: 16,
										fontWeight: 600,
										color: "primary.contrastText",
										backgroundColor: "primary.main",
										paddingX: 6,
										transition: "all 0.6s ease",
										"&:hover": {
											backgroundColor: "primary.colorBtnsForms",
										},
									}}
									variant="text"
								>
									Pagado
								</Button>
								<Button
									sx={{
										fontSize: 16,
										fontWeight: 600,
										color: "primary.contrastText",
										backgroundColor: "primary.main",
										paddingX: 6,
										transition: "all 0.6s ease",
										"&:hover": {
											backgroundColor: "primary.colorBtnsForms",
										},
									}}
									variant="text"
								>
									Estado
								</Button>
							</Stack>
						</div>
					))}
			</div>
		</div>
	);
};

export default DashOrders;
