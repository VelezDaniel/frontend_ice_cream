import { BiBookmarkAltPlus } from "react-icons/bi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { showOrdersRequest } from "../../api/orders";
import ModalTemplate from "../modal/ModalTemplate";
import ProductImgBuilder from "../../utils/ProductImgBuilder";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
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
			<div>
				{ordersData &&
					ordersData.map((order) => (
						<div className="container-order-products">
							<div className="order-products-header">
								<p>{order.idOrder}</p>
								<p>{order.deliveryDescription}</p>
								<p>${order.totalOrder}</p>
								<div>
									<p>Datos del Cliente</p>
									<p>{order.client.identity}</p>
									<p>`{order.client.name} {order.client.lastName}`</p>
									{order.client.address != "N/A" && (
										<p>{order.client.address}</p>
									)}
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default DashOrders;
