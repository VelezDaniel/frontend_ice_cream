import "./css/dash_aditions.css";
import { TbCandy } from "react-icons/tb";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
import { toast } from "sonner";
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

const DashAditions = ({ dashChange, onAction }) => {
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
	const [resToast, setResToast] = useState({});

	const {
		register,
		handleSubmit,
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
				setFlavorsData(flavors.data.body);
			} catch (error) {
				console.log("Error in dash_portfolio: ", error);
			}
		};
		handleShowAditions();
		handleShowFlavors();
	}, [dashChange]);

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
			setTypeOfInformation("editFlavor");
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

	useEffect(() => {
		const showToast = () => {
			if (resToast && resToast.state === false) {
				toast.error("Lo sentimos", {
					className: "toast-error-style",
					description: resToast.message,
					duration: 5000,
				});
			} else if (resToast.state === true) {
				toast.success("Accion Exitosa", {
					className: "toast-success-style",
					description: resToast.message,
					duration: 4000,
				});
			}
		};
		showToast();
	}, [resToast]);

	// Funcion para agregar informacion (adicion o sabor)
	const onSubmit = (addingInfo) => {
		return handleSubmit(async (values) => {
			values.id = 0;
			if (addingInfo === "adition") {
				try {
					const result = await createAditionRequest(values);
					setAddAditionModal(false);

					if (result.data.body[0] === "Data saved succesfully") {
						setResToast({
							state: true,
							message: "Nueva adición agregada",
						});
					} else {
						setResToast({
							state: false,
							message: "No se pudo agregar la adición. Vuelve a intentarlo.",
						});
					}

					reset();
					onAction("addAdition");
				} catch (error) {
					console.log(error);
				}
			} else if (addingInfo === "flavor") {
				try {
					const result = await createFlavorRequest(values);
					setAddFlavorModal(false);

					if (result.data.body[0] === "Data saved succesfully") {
						setResToast({
							state: true,
							message: "Nuevo sabor agregado",
						});
					} else {
						setResToast({
							state: false,
							message: "No se pudo agregar el sabor. Vuelve a intentarlo.",
						});
					}

					reset();
					onAction("addFlavor");
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log("Consulta no realizada");
			}
		});
	};

	// Funcion para Editar informacion (adicion o sabor)
	const onSubmitEdit = (editingInfo) => {
		return handleSubmit(async (values) => {
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
					setEditModal(false);

					if (editResult.data.body[0] === "Data updated succesfully") {
						setResToast({
							state: true,
							message: "Adición actualizada",
						});
					} else {
						setResToast({
							state: false,
							message: "No se pudo actualizar la adición. Vuelve a intentarlo.",
						});
					}

					reset();
					onAction("editAdition");
				} catch (error) {
					console.log("error in onsubmitEdit ", error);
				}
			} else if (editingInfo === "flavor") {
				const editFlavor = {
					id: flavorInfo.id,
					nameFlavor: values.editNameFlavor,
					stateFlavor: values.editStateFlavor,
				};

				try {
					const editResult = await createFlavorRequest(editFlavor);
					setEditModal(false);

					if (editResult.data.body[0] === "Data updated succesfully") {
						setResToast({
							state: true,
							message: "Sabor actualizado",
						});
					} else {
						setResToast({
							state: false,
							message: "No se pudo actualizar el sabor. Vuelve a intentarlo.",
						});
					}
					reset();
					onAction("editFlavor");
				} catch (error) {
					console.log("error in onsubmitEdit ", error);
				}
			} else {
				setResToast({
					state: false,
					message: "NO se ejecuto la funcion !",
				});
			}
		});
	};

	// Funcion para eliminar informacion (adicion o sabor)
	const handleDeleteInfo = async (deletingInfo, infoSelected) => {
		if (infoSelected === "adition") {
			try {
				const result = await deleteAditionRequest(deletingInfo);
				setDeleteModal(false);

				if (result.data.body === "Information deleted") {
					setResToast({
						state: true,
						message: "Adición eliminada con éxito",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo eliminar la adición. Vuelve a intentarlo.",
					});
				}

				onAction("deleteAdition");
			} catch (error) {
				console.log(error);
			}
		} else if (infoSelected === "flavor") {
			try {
				const result = await deleteFlavorRequest(deletingInfo);
				setDeleteModal(false);
				if (result.data.body === "Information deleted") {
					setResToast({
						state: true,
						message: "Sabor eliminado éxitosamente",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo eliminar el sabor. Vuelve a intentarlo.",
					});
				}

				onAction("deleteFlavor");
			} catch (error) {
				console.log(error);
			}
		} else {
			setResToast({
				state: false,
				message: "No se ha seleccionado nada",
			});
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
								<div className="styled-span-aditions">
									<span>Número adición</span>
									<span>{aditionData.id}</span>
								</div>
								<div className="styled-span-aditions">
									<span>Nombre</span>
									<span>{aditionData.nameAdition}</span>
								</div>
								<div className="styled-span-aditions">
									<span>Precio</span>
									<span>$ {aditionData.priceAdition}</span>
								</div>
								<div className="styled-span-aditions">
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
						{editModal &&
							typeOfInformation === "editAdition" &&
							selectedObjectIndex === index && (
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
						{deleteModal &&
							typeOfInformation === "deleteAdition" &&
							selectedObjectIndex === index && (
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
								<div className="styled-span-aditions">
									<span>Número sabor</span>
									<span>{flavorData.id}</span>
								</div>
								<div className="styled-span-aditions">
									<span>Nombre</span>
									<span>{flavorData.nameFlavor}</span>
								</div>
								<div className="styled-span-aditions">
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
						{editModal &&
							typeOfInformation === "editFlavor" &&
							selectedObjectIndex === index && (
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
						{deleteModal &&
							typeOfInformation === "deleteFlavor" &&
							selectedObjectIndex === index && (
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
			{/* <Toaster position="top-right" /> */}
		</div>
	);
};
export default DashAditions;
