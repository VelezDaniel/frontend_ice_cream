import { useEffect, useState } from "react";
import ModalTemplate from "../components/modal/ModalTemplate";
import "../css/payed.css";
import { useNavigate } from "react-router-dom";
import { createNewOrderRequest } from "../api/orders";
import { useAuth } from "../context/AuthContext";
// * SONNER
import { toast } from "sonner";

const Payed = () => {
	const [closeModal, setCloseModal] = useState(true);
	const [stateRequest, setStateRequest] = useState(false);

	const { user } = useAuth();
	const navigate = useNavigate();

	const showToast = (orderGenerated) => {
		if (orderGenerated && orderGenerated.data.status == 201) {
			toast.success("Accion Exitosa", {
				className: "toast-success-style",
				description: "Tu pedido se ha creado correctamente",
				duration: 4000,
			});
		} else {
			toast.error("Lo sentimos", {
				className: "toast-error-style",
				description: "Algo fue mal con tu pedido... Lo estamos revisando",
				duration: 5000,
			});
		}
	};

	const closeModalAndSendInfo = () => {
		setCloseModal(false);
	};

	const handleCreateOrder = async (finalOrder) => {
		const newOrder = await createNewOrderRequest(finalOrder);
		if (newOrder) {
			setStateRequest(true);
			showToast(newOrder);
			localStorage.removeItem("cart");
			localStorage.removeItem("totalPrice");
			navigate("/");
		} else {
			console.log("ERROR EN handleCreateOrder");
		}
	};

	useEffect(() => {
		if (closeModal === false) {
			const existentFinalOrder = localStorage.getItem("finalOrder");

			const existentCart = localStorage.getItem("cart");
			const existentTotalPrice = localStorage.getItem("totalPrice");

			let finalOrderData = null;
			// let cartData = null;
			// let totalPrice = 0;

			if (existentFinalOrder) {
				finalOrderData = JSON.parse(existentFinalOrder);
				handleCreateOrder(finalOrderData);
			} else if (existentCart && existentTotalPrice) {
				const arrayExistentCart = JSON.parse(existentCart);

				if (
					arrayExistentCart &&
					arrayExistentCart.length > 0 &&
					existentTotalPrice
				) {
					const finalOrder = {
						cart: arrayExistentCart,
						client: {
							id: user.id,
							name: user.name,
							lastName: user.lastName,
							identity: user.identity,
							area: user.area,
						},
						fromLocal: false,
						totalPriceOrder: parseInt(existentTotalPrice),
					};
					handleCreateOrder(finalOrder);
				}
			}
		}
	}, [closeModal]);

	return (
		<div className="payed-bg">
			<ModalTemplate bg={"bg-blue-light"} setStateModal={setCloseModal}>
				<div className="body-modal-payment">
					<div className="loader"></div>
					<div>
						<h4 className="title-modal-payment">
							¡Ya puedes saborear ese exquisito helado!
						</h4>
						<p className="description-modal-payment">
							Pago realizado correctamente
						</p>
						<p className="description-modal-payment">
							Muy pronto recibirás tus productos
						</p>
						<button
							onClick={() => closeModalAndSendInfo(false)}
							className="btn-bright"
						>
							Confirmar pedido
						</button>
					</div>
				</div>
			</ModalTemplate>
		</div>
	);
};

export default Payed;
