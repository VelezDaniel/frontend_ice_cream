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

function DashAditions() {
	const [aditionsData, setAditionsData] = useState([]);
	const [aditionInfo, setAditionInfo] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);
	// const [productTypes, setProductsType] = useState(null);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	// Use effect para traer todos los productos
	useEffect(() => {
		// Realizar consulta a la base de datos para traer la informacion
		const handleShowAditions = async () => {
			try {
				const items = await showAditionsRequest();
				// Establecer usuarios en estado
				console.log(items);
				setAditionsData(items.data.body);
			} catch (error) {
				console.log("Error in dash_portfolio: ", error);
			}
		};
		handleShowAditions();
	}, []);

	useEffect(() => {
		if (aditionInfo) {
			setValue("editNameAdition", aditionInfo.nameAdition);
			setValue("editPrice", aditionInfo.priceAdition);
			setValue("editStateAdition", aditionInfo.stateAdition);
		}
	}, [aditionInfo]);

	const openModalEdit = (index) => {
		setEditModal(true);
		setselectedObjectIndex(index);
		setAditionInfo(aditionsData[index]);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setselectedObjectIndex(index);
	};

	// Add new adition
	const onSubmit = handleSubmit(async (values) => {
		console.log(values);
		values.id = 0;
		const result = await createAditionRequest(values);
		console.log("result from dash_portfolio: ", result);
		setAddModal(false);
		reset();
		// window.location.reload();
	});

	const onSubmitEdit = handleSubmit(async (values) => {
		console.log("values for edit: ", values);
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
	});

	const deleteAdition = async (aditionData) => {
		try {
			const result = await deleteAditionRequest(aditionData);
			if (result) {
				setDeleteModal(false);
				console.log("Registro eliminado: ", result);
				setEditModal(false);
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Lista de Adiciones</h2>
				<div>
					<input type="text" placeholder="Buscar por nombre" />
				</div>
			</div>
			<div className="div-dash-btn-add">
				<button onClick={() => setAddModal(!addModal)}>
					<TbCandy size={26} />
					Agregar
				</button>
			</div>
			{/* MODAL AÑADIR USUARIO */}
			{addModal && (
				<ModalTemplate
					setStateModal={setAddModal}
					title="Nueva Adición"
					showHeader={true}
				>
					<div className="modal-content-body">
						<h4>Ingresa la información de la adición</h4>
						<form className="dashboard-form" onSubmit={onSubmit}>
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
											message:
												"Precio debe tener al menos 3 numeros enteros",
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
							{errors.stateAdition && <p className="notice">{errors.stateAdition.message}</p>}
							<input
								className="btn-enviar"
								id="btn-add-user"
								type="submit"
								value="Continuar"
							></input>
						</form>
					</div>
				</ModalTemplate>
			)}
			{/* main content */}
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
								onClick={() => openModalEdit(index)}
							>
								<HiOutlinePencilAlt size={38} />
							</button>
							<button
								className="dash-btn-delete"
								onClick={() => openModalDelete(index)}
							>
								<HiOutlineTrash size={38} />
							</button>
						</div>

						{/* mostrar modal editar */}
						{editModal && selectedObjectIndex === index && (
							<ModalTemplate
								setStateModal={setEditModal}
								title="Editar Adición"
								showHeader={true}
								designClass={""}
							>
								<div className="modal-content-body">
									<h5>Actualiza los datos de la adición</h5>
									<form className="dashboard-form" onSubmit={onSubmitEdit}>
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
														message:
															"Precio debe tener al menos 3 números enteros",
													},
												})}
												defaultValue={aditionData.price}
											/>
										</div>
										{errors.editPrice && (
											<span>{errors.editPrice.message}</span>
										)}
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
							</ModalTemplate>
						)}
						{/* Mostrar modal eliminar */}
						{deleteModal && selectedObjectIndex === index && (
							<ModalTemplate
								setStateModal={setDeleteModal}
								title={" Eliminar Adición "}
								showHeader={true}
								designClass={"alert"}
							>
								<div className="modal-content-body">
									<span className="modal-subtitle">
										Seguro que deseas eliminar la adición:
									</span>
									<span className="modal-info">Nombre: {aditionData.nameAdition}</span>
									<span className="modal-info">
										precio: {aditionData.price}
									</span>
									<span>id: {aditionData.id}</span>
								</div>
								<div className="container-btn-alert-modal">
									<button
										className="btn-alert-modal"
										onClick={() => deleteAdition(aditionData)}
									>
										Aceptar
									</button>
								</div>
							</ModalTemplate>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default DashAditions;
