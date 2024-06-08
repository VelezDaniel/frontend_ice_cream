import { useEffect, useState } from "react";
import ModalTemplate from "../components/modal/ModalTemplate";
import "../css/payed.css";
import { useNavigate } from "react-router-dom";

const Payed = () => {
	const [closeModal, setCloseModal] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (closeModal === false) {
			navigate("/");
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
							Muy pronto recibirás tus productos
						</p>
						<button onClick={() => setCloseModal(false)} className="btn-bright">
							Regresar
						</button>
					</div>
				</div>
			</ModalTemplate>
		</div>
	);
};

export default Payed;
