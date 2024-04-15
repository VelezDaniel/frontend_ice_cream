// import "./css/dash_portfolio.css";
import { TbCandy } from "react-icons/tb";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
// import { useAuth } from "../../context/AuthContext";
import {
	showAditionsRequest,
	createAditionRequest,
	deleteAditionRequest,
} from "../../api/aditions";
import {
	showFlavorsRequest,
	createFlavorRequest,
	deleteFlavorRequest,
} from "../../api/flavors";

const DashAditions = () => {
	const [aditionsData, setAditionsData] = useState([]);
	const [aditionInfo, setAditionInfo] = useState([]);
	const [flavorsData, setFlavorsData] = useState([]);
	const [flavorInfo, setFlavorInfo] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [addAditionModal, setAddAditionModal] = useState(false);
	const [addFlavorModal, setAddFlavorModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);
	const [typeOfInformation, setTypeOfInformation] = useState(null);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	// Use effect para traer todas las adiciones y sabores
	useEffect(() => {
		// Realizar consulta a la base de datos para traer la informacion adiciones
		const handleShowAditions = async () => {
			try {
				const aditions = await showAditionsRequest();
				// Establecer usuarios en estado
				console.log(aditions);
				setAditionsData(aditions.data.body);
			} catch (error) {
				console.log("Error in dash_portfolio: ", error);
			}
		};

		// Traer informacion Sabores
		const handleShowFlavors = async () => {
			try {
				const flavors = await showFlavorsRequest();
				// Establecer usuarios en estado
				console.log(flavors);
				setFlavorsData(flavors.data.body);
			} catch (error) {
				console.log("Error in dash_portfolio: ", error);
			}
		};
		handleShowAditions();
		handleShowFlavors();
	}, []);

	useEffect(() => {
		if (aditionInfo) {
			setValue("editNameAdition", aditionInfo.nameAdition);
			setValue("editPrice", aditionInfo.priceAdition);
			setValue("editStateAdition", aditionInfo.stateAdition);
		}
	}, [aditionInfo]);

	useEffect(() => {
		if (flavorInfo) {
			setValue("editNameFlavor", flavorInfo.nameFlavor);
			setValue("editStateFlavor", flavorInfo.stateFlavor);
		}
	}, [flavorInfo]);

	const openModalEdit = (index, infoType) => {
		setselectedObjectIndex(index);
		if (infoType === "adition") {
			setAditionInfo(aditionsData[index]);
			setTypeOfInformation("editAdition");
			setEditModal(true);
		} else {
			setFlavorInfo(flavorsData[index]);
			setTypeOfInformation("editFlavor")
			setEditModal(true);
		}
	};

	const openModalDelete = (index, infoType) => {
		setselectedObjectIndex(index);
		if (infoType === "adition") {
			// setAditionInfo(aditionsData[index]);
			setTypeOfInformation("deleteAdition");
			setDeleteModal(true);
		} else {
			// setFlavorInfo(flavorsData[index]);
			setTypeOfInformation("deleteFlavor");
			setDeleteModal(true);
		}
	};

	// Funcion para agregar informacion (adicion o sabor)
	const onSubmit = (addingInfo) => {
		return handleSubmit(async (values) => {
			console.log(values);
			console.log(addingInfo);
			values.id = 0;
			if (addingInfo === "adition") {
				try {
					const result = await createAditionRequest(values);
					console.log("result from dash_portfolio: ", result);
					setAddAditionModal(false);
					reset();
				} catch (error) {
					console.log(error);
				}
			} else if (addingInfo === "flavor") {
				try {
					const result = await createFlavorRequest(values);
					console.log("result from dash_portfolio: ", result);
					setAddFlavorModal(false);
					reset();
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log("Consulta no realizada");
			}

			// window.location.reload();
		});
	};

	// Funcion para Editar informacion (adicion o sabor)
	const onSubmitEdit = (editingInfo) => {
		return handleSubmit(async (values) => {
			console.log("values for edit: ", values);
			if (editingInfo === "adition") {
				console.log("mekams: ", aditionInfo);
				const editAdition = {
					id: aditionInfo.id,
					nameAdition: values.editNameAdition,
					price: values.editPrice,
					stateAdition: values.editStateAdition,
				};

				try {
					const editResult = await createAditionRequest(editAdition);
					console.log("editResult in dashportfolio: ", editResult);
					setEditModal(false);
					reset();
					// window.location.reload();
				} catch (error) {
					console.log("error in onsubmitEdit ", error);
				}
			} else if (editingInfo === "flavor") {
				console.log("mekams: ", flavorInfo);
				const editFlavor = {
					id: flavorInfo.id,
					nameFlavor: values.editNameFlavor,
					stateFlavor: values.editStateFlavor,
				};

				try {
					const editResult = await createFlavorRequest(editFlavor);
					console.log("editResult in dashportfolio: ", editResult);
					setEditModal(false);
					reset();
					// window.location.reload();
				} catch (error) {
					console.log("error in onsubmitEdit ", error);
				}
			} else {
				console.log("NO se ejecuto la funcion !");
			}
		});
	};

	// Funcion para eliminar informacion (adicion o sabor)
	const handleDeleteInfo = async (deletingInfo, infoSelected) => {
		if (infoSelected === "adition") {
			try {
				const result = await deleteAditionRequest(deletingInfo);
				if (result) {
					setDeleteModal(false);
					console.log("Registro eliminado: ", result);
					window.location.reload();
				}
			} catch (error) {
				console.log(error);
			}
		} else if (infoSelected === "flavor") {
			try {
				const result = await deleteFlavorRequest(deletingInfo);
				if (result) {
					setDeleteModal(false);
					console.log("Registro eliminado: ", result);
					// setEditModal(false);
					window.location.reload();
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("NO SE SELECCIONÓ NADA");
		}
	};

	/**
	 * ###############################
	 *  * FORMULARIOS PARA EL CRUD *
	 * ###############################
	 */

	// *** FORMULARIOS PARA ADICION ***
	// --- Agregar Adicion ---
	const addAditionForm = () => {
		return (
			<div className="modal-content-body">
				<h4>Ingresa la información de la adición</h4>
				<form className="dashboard-form" onSubmit={onSubmit("adition")}>
					<div className="input-group">
						<input
							type="text"
							name="nameAdition"
							{...register("nameAdition", {
								required: {
									value: true,
									message: "Este cambo es requerido",
								},
							})}
							placeholder="Nombre"
						/>
					</div>
					{errors.nameAdition && (
						<span className="notice">{errors.nameAdition.message}</span>
					)}
					<div className="input-group">
						<input
							type="number"
							{...register("price", {
								required: {
									value: true,
									message: "Este cambo es requerido",
								},
								pattern: {
									value: /^\d{3,}$/, // Al menos 3 enteros y 2 decimales
									message: "Precio debe tener al menos 3 numeros enteros",
								},
							})}
							placeholder="Precio unitario"
						/>
					</div>
					{errors.price && <p className="notice">{errors.price.message}</p>}
					<select
						className="form-control"
						{...register("stateAdition", {
							required: {
								value: true,
								message: "Este cambo es requerido",
							},
						})}
					>
						<option value="DISPONIBLE">DISPONIBLE</option>
						<option value="NO DISPONIBLE">NO DISPONIBLE</option>
					</select>
					{errors.stateAdition && (
						<p className="notice">{errors.stateAdition.message}</p>
					)}
					<input
						className="btn-enviar"
						id="btn-add-user"
						type="submit"
						value="Guardar"
					></input>
				</form>
			</div>
		);
	};

	// --- Editar Adicion ---
	const editAditionForm = (aditionData) => {
		return (
			<div className="modal-content-body">
				<h5>Actualiza los datos de la adición</h5>
				<form className="dashboard-form" onSubmit={onSubmitEdit("adition")}>
					<span>id: {aditionData.id}</span>
					<span className="span-edit-form">Nombre</span>
					<div className="input-group">
						<input
							type="text"
							{...register("editNameAdition", {
								required: {
									value: true,
									message: "Este cambo es requerido",
								},
							})}
							defaultValue={aditionData.nameAdition}
						/>
					</div>
					{errors.editNameAdition && (
						<span>{errors.editNameAdition.message}</span>
					)}
					<span className="span-edit-form">Precio</span>
					<div className="input-group">
						<input
							type="number"
							step="0.01"
							{...register("editPrice", {
								required: {
									value: true,
									message: "Este cambo es requerido",
								},
								pattern: {
									value: /^\d{3,}$/, // Al menos 3 enteros
									message: "Precio debe tener al menos 3 números enteros",
								},
							})}
							defaultValue={aditionData.price}
						/>
					</div>
					{errors.editPrice && <span>{errors.editPrice.message}</span>}
					<span className="span-edit-form">Estado</span>
					<select
						className="form-control"
						{...register("editStateAdition", {
							required: {
								value: true,
								message: "Este cambo es requerido",
							},
						})}
						defaultValue={aditionData.stateAdition}
					>
						<option value="DISPONIBLE">DISPONIBLE</option>
						<option value="NO DISPONIBLE">NO DISPONIBLE</option>
					</select>
					<input
						type="submit"
						className="btn-enviar"
						id="btn-add-user"
						value="Actualizar"
					/>
				</form>
			</div>
		);
	};

	// --- Eliminar Adicion ---
	const deleteAditionForm = (aditionData) => {
		return (
			<>
				<div className="modal-content-body">
					<span className="modal-subtitle">
						Seguro que deseas eliminar la adición:
					</span>
					<span className="modal-info">Nombre: {aditionData.nameAdition}</span>
					<span className="modal-info">precio: {aditionData.price}</span>
					<span>id: {aditionData.id}</span>
				</div>
				<div className="container-btn-alert-modal">
					<button
						className="btn-alert-modal"
						onClick={() => handleDeleteInfo(aditionData, "adition")}
					>
						Aceptar
					</button>
				</div>
			</>
		);
	};

	// *** FORMULARIOS PARA SABORES ***

	// --- Agregar Sabor ---
	const addFlavorForm = () => {
		return (
			<div className="modal-content-body">
				<h4>Ingresa la información del Sabor</h4>
				<form className="dashboard-form" onSubmit={onSubmit("flavor")}>
					<div className="input-group">
						<input
							type="text"
							name="nameFlavor"
							{...register("nameFlavor", {
								required: {
									value: true,
									message: "Este cambo es requerido",
								},
							})}
							placeholder="Nombre"
						/>
					</div>
					{errors.nameFlavor && (
						<span className="notice">{errors.nameFlavor.message}</span>
					)}
					<select
						className="form-control"
						{...register("stateFlavor", {
							required: {
								value: true,
								message: "Este cambo es requerido",
							},
						})}
					>
						<option value="DISPONIBLE">DISPONIBLE</option>
						<option value="NO DISPONIBLE">NO DISPONIBLE</option>
					</select>
					{errors.stateFlavor && (
						<p className="notice">{errors.stateFlavor.message}</p>
					)}
					<input
						className="btn-enviar"
						id="btn-add-user"
						type="submit"
						value="Guardar"
					></input>
				</form>
			</div>
		);
	};

	// ---Editar Sabor ---
	const editFlavorForm = (flavorData) => {
		return (
			<div className="modal-content-body">
				<h5>Actualiza los datos del Sabor</h5>
				<form className="dashboard-form" onSubmit={onSubmitEdit("flavor")}>
					<span>id: {flavorData.id}</span>
					<span className="span-edit-form">Nombre</span>
					<div className="input-group">
						<input
							type="text"
							{...register("editNameFlavor", {
								required: {
									value: true,
									message: "Este cambo es requerido",
								},
							})}
							defaultValue={flavorData.nameFlavor}
						/>
					</div>
					{errors.editNameFlavor && (
						<span>{errors.editNameFlavor.message}</span>
					)}
					<span className="span-edit-form">Estado</span>
					<select
						className="form-control"
						{...register("editStateFlavor", {
							required: {
								value: true,
								message: "Este cambo es requerido",
							},
						})}
						defaultValue={flavorData.stateFlavor}
					>
						<option value="DISPONIBLE">DISPONIBLE</option>
						<option value="NO DISPONIBLE">NO DISPONIBLE</option>
					</select>
					<input
						type="submit"
						className="btn-enviar"
						id="btn-add-user"
						value="Actualizar"
					/>
				</form>
			</div>
		);
	};

	// ---Eliminar Sabor ---
	const deleteFlavorForm = (flavorData) => {
		return (
			<>
				<div className="modal-content-body">
					<span className="modal-subtitle">
						Seguro que deseas eliminar el Sabor:
					</span>
					<span className="modal-info">Nombre: {flavorData.nameFlavor}</span>
					<span className="modal-info">Estado: {flavorData.state}</span>
					<span>id: {flavorData.id}</span>
				</div>
				<div className="container-btn-alert-modal">
					<button
						className="btn-alert-modal"
						onClick={() => handleDeleteInfo(flavorData, "flavor")}
					>
						Aceptar
					</button>
				</div>
			</>
		);
	};

	// ! AQUI TERMINA ############################################

	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Lista de Adiciones, Sabores de Helado</h2>
				<div>
					<input type="text" placeholder="Buscar por nombre" />
				</div>
			</div>
			<div className="div-dash-btn-add">
				<button onClick={() => setAddAditionModal(!addAditionModal)}>
					<TbCandy size={26} />
					Agregar Adicion
				</button>
				<button onClick={() => setAddFlavorModal(!addFlavorModal)}>
					<TbCandy size={26} />
					Agregar Sabor
				</button>
			</div>
			<div className="dash-box-titles">
				<h2>Adiciones</h2>
			</div>
			{/* MODAL AÑADIR ADICION */}
			{addAditionModal && (
				<ModalTemplate
					setStateModal={setAddAditionModal}
					title="Nueva Adición"
					showHeader={true}
				>
					{addAditionForm()}
				</ModalTemplate>
			)}

			<div className="dash-container-cards">
				{aditionsData.map((aditionData, index) => (
					<div className="dash-container-card" key={index}>
						<div className="dash-card-user">
							{/* <div className="colum-one">
								<img
									src={photo}
									alt="imagen del helado"
									className="dash-card-img-product"
								/>
							</div> */}
							<div className="colum-two">
							<div>
									<span>Nombre</span>
									<span>{aditionData.id}</span>
								</div>
								<div>
									<span>Nombre</span>
									<span>{aditionData.nameAdition}</span>
								</div>
								<div>
									<span>Precio</span>
									<span>$ {aditionData.priceAdition}</span>
								</div>
								<div>
									<span>Estado</span>
									<span>{aditionData.stateAdition}</span>
								</div>
							</div>
						</div>

						<div className="dash-container-btns">
							<button
								className="dash-btn-edit"
								onClick={() => openModalEdit(index, "adition")}
							>
								<HiOutlinePencilAlt size={38} />
							</button>
							<button
								className="dash-btn-delete"
								onClick={() => openModalDelete(index, "adition")}
							>
								<HiOutlineTrash size={38} />
							</button>
						</div>
						{/* mostrar modal editar */}
						{editModal && typeOfInformation === "editAdition" && selectedObjectIndex === index && (
							<ModalTemplate
								setStateModal={setEditModal}
								title="Editar Adición"
								showHeader={true}
								designClass={""}
							>
								{editAditionForm(aditionData)}
							</ModalTemplate>
						)}
						{/* Mostrar modal eliminar */}
						{deleteModal && typeOfInformation === "deleteAdition" && selectedObjectIndex === index && (
							<ModalTemplate
								setStateModal={setDeleteModal}
								title={" Eliminar Adición "}
								showHeader={true}
								designClass={"alert"}
							>
								{deleteAditionForm(aditionData)}
							</ModalTemplate>
						)}
					</div>
				))}
			</div>
			<div className="dash-box-titles">
				<h2>Sabores</h2>
			</div>
			{/* MODAL AÑADIR SABOR */}
			{addFlavorModal && (
				<ModalTemplate
					setStateModal={setAddFlavorModal}
					title="Nuevo Sabor de Helado"
					showHeader={true}
				>
					{addFlavorForm()}
				</ModalTemplate>
			)}
			<div className="dash-container-cards">
				{flavorsData.map((flavorData, index) => (
					<div className="dash-container-card" key={index}>
						<div className="dash-card-user">
							{/* <div className="colum-one">
								<img
									src={photo}
									alt="imagen del helado"
									className="dash-card-img-product"
								/>
							</div> */}
							<div className="colum-two">
							<div>
									<span>Nombre</span>
									<span>{flavorData.id}</span>
								</div>
								<div>
									<span>Nombre</span>
									<span>{flavorData.nameFlavor}</span>
								</div>
								<div>
									<span>Estado</span>
									<span>{flavorData.stateFlavor}</span>
								</div>
							</div>
						</div>

						<div className="dash-container-btns">
							<button
								className="dash-btn-edit"
								onClick={() => openModalEdit(index, "flavor")}
							>
								<HiOutlinePencilAlt size={38} />
							</button>
							<button
								className="dash-btn-delete"
								onClick={() => openModalDelete(index, "flavor")}
							>
								<HiOutlineTrash size={38} />
							</button>
						</div>
						{/* mostrar modal editar */}
						{editModal && typeOfInformation === "editFlavor" && selectedObjectIndex === index && (
							<ModalTemplate
								setStateModal={setEditModal}
								title="Editar Sabor de Helado"
								showHeader={true}
								designClass={""}
							>
								{editFlavorForm(flavorData)}
							</ModalTemplate>
						)}
						{/* Mostrar modal eliminar */}
						{deleteModal && typeOfInformation === "deleteFlavor" && selectedObjectIndex === index && (
							<ModalTemplate
								setStateModal={setDeleteModal}
								title={" Eliminar Sabor de Helado "}
								showHeader={true}
								designClass={"alert"}
							>
								{deleteFlavorForm(flavorData)}
							</ModalTemplate>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
export default DashAditions;