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
						<Card sx={{ maxWidth: 345 }}>
							<CardMedia
								component="img"
								alt="imagen helado"
								height="140"
								image={ProductImgBuilder(order.name.toLowerCase())}
							/>
							<CardContent>
								<p gutterBottom variant="h5" component="div">
									Lizard
								</p>
								<p variant="body2" color="text.secondary">
									Lizards are a widespread group of squamate reptiles, with over
									6,000 species, ranging across all continents except Antarctica
								</p>
							</CardContent>
							<CardActions>
								<Button size="small">Share</Button>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					))}
			</div>
		</div>
	);
};

export default DashOrders;
