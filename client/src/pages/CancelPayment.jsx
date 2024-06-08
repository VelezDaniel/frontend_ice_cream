import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/cancelpayed.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ModalTemplate from "../components/modal/ModalTemplate";

const CancelPayment = () => {
	const [closeModal, setCloseModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
		if (closeModal === false) {
			navigate("/");
		}
	}, [closeModal]);

	return (
		<div className="payed-bg">
			<ModalTemplate bg={"bg-red-light"} setStateModal={setCloseModal}>
				<div className="body-modal-payment">
				<IoIosCloseCircleOutline size={88} className="icon-cancel-payment" />
					<div>
						<h4 className="title-modal-payment">
							¡Ooohps!
						</h4>
						<p className="description-modal-payment">
							No se pudo realizar el pago
						</p>
            <p className="description-modal-payment">Vamos a volver a intentarlo</p>
						<button onClick={() => setCloseModal(false)} className="btn-bright">
							Regresar
						</button>
					</div>
				</div>
			</ModalTemplate>
		</div>
	);
};

export default CancelPayment;
