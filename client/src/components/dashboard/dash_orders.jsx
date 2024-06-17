import { BiBookmarkAltPlus, BiIdCard } from "react-icons/bi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	showOrdersRequest,
	updateOrderInformationRequest,
} from "../../api/orders";
import ModalTemplate from "../modal/ModalTemplate";
import ProductImgBuilder from "../../utils/ProductImgBuilder";
import "./css/dash_orders.css";
// * Imports Material UI
import { Card, CardContent, CardMedia, Button, Stack } from "@mui/material";
// * SONNER
import { toast } from "sonner";

const DashOrders = ({ dashChange, onAction }) => {
	const [ordersData, setOrdersData] = useState([]);
	const [ordersClosed, setOrdersClosed] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [actionType, setActionType] = useState("");
	const [modalChangePayed, setModalChangePayed] = useState(false);
	const [modalChangeStateOrder, setModalChangeStateOrder] = useState(false);
	const [modalIsFinished, setModalIsFinished] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const showToast = (type) => {
		if (type === 1) {
			toast.success("Cambio exitoso", {
				className: "toast-success-style",
				description: "Se han guardado los cambios exitosamente",
				duration: 5000,
			});
		} else {
			toast.error("Lo sentimos :(", {
				className: "toast-error-style",
				description: "Algo salió mal... Por favor intentalo de nuevo",
				duration: 5000,
			});
		}
	};

	const payStates = [
		{
			idState: 1,
			descriptionState: "PAGADO",
		},
		{
			idState: 2,
			descriptionState: "POR PAGAR",
		},
	];

	const orderState = [
		{
			idStateOrder: 1,
			description: "En preparación",
		},
		{
			idStateOrder: 2,
			description: "En camino",
		},
		{
			idStateOrder: 3,
			description: "Entregado",
		},
	];

	const closeOrder = async () => {
		const info = {
			idOrder: selectedOrder.idOrder,
			row: 1,
			requiredAction: actionType,
		};

		const updateResult = await updateOrderInformationRequest(info);

		console.log("updateResult: ", updateResult);
		if (updateResult) {
			showToast(1);
			setModalChangePayed(false);
			setModalChangeStateOrder(false);
			setModalIsFinished(false);
			onAction("orderUpdated");
		} else {
			showToast(0);
		}
	};

	const handleUpdateOrder = handleSubmit(async (values) => {
		// order.actionType = actionType;

		const info = {
			idOrder: selectedOrder.idOrder,
			row: values.row,
			requiredAction: actionType,
		};

		console.log("info pre update", info);

		const updateResult = await updateOrderInformationRequest(info);

		console.log("updateResult: ", updateResult);
		if (updateResult) {
			showToast(1);
			setModalChangePayed(false);
			setModalChangeStateOrder(false);
			setModalIsFinished(false);
			onAction("orderUpdated");
		} else {
			showToast(0);
		}
	});

	// Mostrar Pedidos
	useEffect(() => {
		const handleShowOrders = async () => {
			try {
				const items = await showOrdersRequest();
				console.log("items;", items);

				const openOrders = items.data.body.filter(
					(order) => order.finished === 0
				);
				const closedOrders = items.data.body.filter(
					(order) => order.finished === 1
				);

				setOrdersData(openOrders);
				setOrdersClosed(closedOrders);
			} catch (error) {
				console.log("error catch: ", error);
			}
		};
		handleShowOrders();
	}, [dashChange]);

	const renderOrders = (orders) => {
		return orders.map((order) => (
			<div key={order.idOrder} className="container-order-products">
				<div className="order-products-header">
					<div
						id="text-order-description"
						className="font-title-description-order"
					>
						<p>Pedido: {order.idOrder}</p>
						<p>Estado: {order.stateOrderDelivery}</p>
						<p>Pagado: {order.stateDescription}</p>
						<p>Terminado: {order.finished === 0 ? "NO" : "SI"}</p>
					</div>
					<p className="font-title-description-order">
						{order.deliveryDescription}
					</p>
					{order.descriptionDelivery && order.descriptionDelivery != null && (
						<>
							<p className="font-title-description-order">
								Direccion: {order.descriptionDelivery}
							</p>
							<p className="font-title-description-order">
								${order.priceDelivery}
							</p>
						</>
					)}
					<div className="box-info-client-order">
						<p className="font-title-description-order">Datos del Cliente</p>
						<p className="font-title-description-order">
							Id: {order.client.identity}
						</p>
						<p className="font-title-description-order">
							{order.client.name} {order.client.lastName}
						</p>
						{order.client.address != "N/A" && (
							<p className="font-title-description-order">
								{order.client.address}
							</p>
						)}
						{order.client.phone != null && (
							<p className="font-title-description-order">
								{order.client.phone}
							</p>
						)}
					</div>
				</div>
				<div className="order-products-body">
					{order &&
						order.details &&
						order.details.map((detail) => (
							<Card
								className="card-product"
								key={detail.idDetail}
								sx={{
									maxWidth: 266,
									minWidth: 224,
									minHeight: 190,
									paddingTop: 3,
								}}
							>
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
									{detail.aditionsName && detail.aditionsName.length > 0 && (
										<>
											<p className="font-text-description-order">Adiciones</p>
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
						onClick={() => {
							setSelectedOrder(order);
							setActionType("PAYED");
							setModalChangePayed(true);
						}}
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
						onClick={() => {
							setSelectedOrder(order);
							setActionType("STATE");
							setModalChangeStateOrder(true);
						}}
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
					<Button
						id="state-btn-order"
						onClick={() => {
							setSelectedOrder(order);
							setActionType("FINISHED");
							setModalIsFinished(true);
						}}
						disabled={
							order.stateDescription === "PAGADO" &&
							order.stateOrderDelivery === "Entregado"
								? false
								: true
						}
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
							"&:disabled": {
								backgroundColor: "primary.colorDisable",
							},
						}}
						variant="text"
					>
						TERMINADO
					</Button>
				</Stack>
				{/* MODALS */}
				{/* MODAL PAYED CHANGED */}
				{modalChangePayed && (
					<ModalTemplate
						setStateModal={setModalChangePayed}
						title="Cambiar estado de pago"
						showHeader={true}
						designClass={""}
					>
						<div className="box-form-orders">
							<form className="dashboard-form" onSubmit={handleUpdateOrder}>
								<select
									className="form-control"
									{...register("row", {
										required: {
											value: true,
											message: "Debes seleccionar uno",
										},
									})}
								>
									{payStates.map((state) => (
										<option key={state.idState} value={state.idState}>
											{state.descriptionState}
										</option>
									))}
								</select>
								{errors.row && <p className="notice">{errors.row.message}</p>}

								<input
									type="submit"
									className="btn-enviar"
									id="btn-add-user"
									value="Actualizar"
								/>
							</form>
						</div>
					</ModalTemplate>
				)}
				{/* MODAL STATE CHANGED */}
				{modalChangeStateOrder && (
					<ModalTemplate
						setStateModal={setModalChangeStateOrder}
						title="Cambiar estado del pedido"
						showHeader={true}
						designClass={""}
					>
						<div className="box-form-orders">
							<form className="dashboard-form" onSubmit={handleUpdateOrder}>
								<select
									className="form-control"
									{...register("row", {
										required: {
											value: true,
											message: "Debes seleccionar uno",
										},
									})}
								>
									{orderState.map((state) => (
										<option key={state.idStateOrder} value={state.idStateOrder}>
											{state.description}
										</option>
									))}
								</select>
								{errors.row && <p className="notice">{errors.row.message}</p>}

								<input
									type="submit"
									className="btn-enviar"
									id="btn-add-user"
									value="Actualizar"
								/>
							</form>
						</div>
					</ModalTemplate>
				)}
				{/* CERRAR PEDIDO (no aparecerá en la lista de pedidos) */}
				{modalIsFinished && (
					<ModalTemplate
						setStateModal={setModalIsFinished}
						title="Cerrar pedido"
						showHeader={true}
						designClass={""}
					>
						<div className="box-form-orders custom-modal-order">
							<p className="text-custom-finish">
								¿Estas seguro que deseas cerrar este pedido permanentemente?
							</p>
							<Button
								onClick={() => closeOrder()}
								className="btn-static-with"
								type="submit"
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
								Aceptar
							</Button>

							<Button
								className="btn-static-with"
								onClick={() => setModalIsFinished(false)}
								sx={{
									fontSize: 16,
									fontWeight: 600,
									color: "primary.contrastText",
									backgroundColor: "error.main",
									paddingX: 6,
									transition: "all 0.6s ease",
									"&:hover": {
										backgroundColor: "error.dark",
									},
								}}
								variant="text"
							>
								Cancelar
							</Button>
						</div>
					</ModalTemplate>
				)}
			</div>
		));
	};

	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Pedidos</h2>
			</div>
			{renderOrders(ordersData)}
			{/* <div className="container-orders-products"></div> */}
			<div className="p-cont-header">
				<h2>Pedidos Cerrados</h2>
			</div>
			{renderOrders(ordersClosed)}
		</div>
	);
};

export default DashOrders;
