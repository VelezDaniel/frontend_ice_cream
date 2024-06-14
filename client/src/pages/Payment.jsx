import { useEffect, useState } from "react";
import ModalTemplate from "../components/modal/ModalTemplate";
import "../css/payed.css";
import { useNavigate } from "react-router-dom";
import { createNewOrderRequest } from "../api/orders";
import { useAuth } from "../context/AuthContext";

// react icons

const Payed = () => {
	const [closeModal, setCloseModal] = useState(true);
	// const [stateSuccesModal, setStateSuccesModal] = useState(false);
	const [stateRequest, setStateRequest] = useState(false);

	const { user } = useAuth();
	const navigate = useNavigate();

	const closeModalAndSendInfo = () => {
		setCloseModal(false);
	};

	const handleCreateOrder = async (finalOrder) => {
		console.log("finalOrder: ", finalOrder);
		const newOrder = await createNewOrderRequest(finalOrder);
		console.log("newOrder in payment", newOrder);
		if (newOrder) {
			setStateRequest(true);
			localStorage.removeItem("cart");
			localStorage.removeItem("totalPrice");
			navigate("/");
		} else {
			console.log("ERROR EN handleCreateOrder");
		}
	};

	// const closePaymentPage = () => {};

	// useEffect(() => {

	// }, [user]);

	useEffect(() => {
		if (closeModal === false) {
			const existentCart = localStorage.getItem("cart");
			const existentTotalPrice = localStorage.getItem("totalPrice");

			if (existentCart && existentTotalPrice) {
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
							Regresar
						</button>
					</div>
				</div>
			</ModalTemplate>
		</div>
	);
};

export default Payed;
