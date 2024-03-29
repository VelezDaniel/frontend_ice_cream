import "./modal_template.css";
import { IoIosClose } from "react-icons/io";

const ModalTemplate = ({
	modalContent,
	children,
	setStateModal,
	title,
	showHeader,
	designClass,
}) => {
	return (
		<div className="cover-modal">
			<div className="container-modal">
				{showHeader && (
					<div
						className={`modal-header ${
							designClass === "alert" ? "modal-alert-color" : "modal-info-color"
						}`}
					>
						<h3>{title}</h3>
					</div>
				)}
				<button
					className="btn-close-modal"
					onClick={() => setStateModal(false)}
				>
					<IoIosClose size={34} />
				</button>
				{modalContent ? (
					<div className="modal-content">{modalContent}</div>
				) : (
					<div className="modal-content">{children}</div>
				)}
			</div>
		</div>
	);
};

export default ModalTemplate;
