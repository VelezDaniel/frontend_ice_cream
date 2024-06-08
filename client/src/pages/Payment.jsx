import { useEffect, useState } from "react";
import ModalTemplate from "../components/modal/ModalTemplate";
import "../css/payed.css";
import { useNavigate, useLocation} from "react-router-dom";
import { captureOrderRequest } from "../api/payment";
// react icons
import { IoIosCloseCircleOutline } from "react-icons/io";

const Payed = () => {
	const [closeModal, setCloseModal] = useState(true);
	const [stateCancelModal, setStateCancelModal] = useState(false);
	const [stateSuccesModal, setStateSuccesModal] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	// const history = useHistory();

	useEffect(() => {
		const confirmPayment = async () => {
			const params = new URLSearchParams(location.search);
			const token = params.get("token");

			try {
				const response = await captureOrderRequest(token);

				if (response.data === "payed") {
					console.log("Payment confirmed: ", response.data);
					setStateSuccesModal(true);
				} else {
					console.log("Payment failed: ", response.data);
				}
			} catch (error) {
				console.log("error in confirm payment: ", error);
			}
		};

		confirmPayment();
	}, [location]);

	useEffect(() => {
		if (closeModal === false) {
			navigate("/");
		}
	}, [closeModal]);

	// const successEvent = () => {

	// };

	// const cancelEvent = () => {

	// };

	return (
		<div className="payed-bg">
			<div className="loader">
				<span className="loader-text">Estamos procesando tu pago...</span>
			</div>
			{stateSuccesModal && stateSuccesModal === true ? (
				<ModalTemplate bg={"bg-blue-light"} setStateModal={setCloseModal}>
					<div className="body-modal-payment">
						<div className="loader"></div>
						<div>
							<h4 className="title-modal-payment">
								¡Ya puedes saborear ese exquisito helado!
							</h4>
							<p className="description-modal-payment">
								Muy pronto recibirás tus productos
							</p>
							<button
								onClick={() => setStateSuccesModal(true)}
								className="btn-bright"
							>
								Regresar
							</button>
						</div>
					</div>
				</ModalTemplate>
			) : (
				<ModalTemplate bg={"bg-red-light"} setStateModal={setCloseModal}>
					<div className="body-modal-payment">
						<IoIosCloseCircleOutline />
						<div>
							<h4 className="title-modal-payment">
								¡Oooh Nooo! Parece que algo salio mal.
							</h4>
							<p className="description-modal-payment">
								Vuelve a intentar hacer el pago y no te quedes sin tus productos
							</p>
							<button
								onClick={() => setCloseModal(false)}
								className="btn-bright"
							>
								Regresar
							</button>
						</div>
					</div>
				</ModalTemplate>
			)}
		</div>
	);
};

export default Payed;
