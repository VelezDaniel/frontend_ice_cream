import "./css/dash_portfolio.css";
import { IoIceCreamOutline } from "react-icons/io5";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
import {toast, Toaster} from "sonner";

import ProductImgBuilder from "../../utils/ProductImgBuilder";

// import { useAuth } from "../../context/AuthContext";
import {
	showProductsRequest,
	createProductRequest,
	deleteProductRequest,
} from "../../api/products";

function DashPortfolio({ dashChange, onAction }) {
	const [productsData, setProductsData] = useState([]);
	const [productInfo, setProductInfo] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);
	const [resToast, setResToast] = useState({});

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
		const handleShowProducts = async () => {
			try {
				const items = await showProductsRequest();
				// Establecer usuarios en estado
				console.log(items);
				setProductsData(items.data.body);
			} catch (error) {
				console.log("Error in dash_portfolio: ", error);
			}
		};
		handleShowProducts();
	}, [dashChange]);

	useEffect(() => {
		if (productInfo) {
			setValue("editNameProduct", productInfo.name);
			setValue("editDescription", productInfo.description);
			setValue("editPrice", productInfo.price);
			setValue("editState", productInfo.state);
			setValue("editRank", productInfo.rank);
			setValue("editProductSize", productInfo.productSize);
			setValue("editProductType", productInfo.productType);
		}
	}, [productInfo]);

	const openModalEdit = (index) => {
		setEditModal(true);
		setselectedObjectIndex(index);
		setProductInfo(productsData[index]);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setselectedObjectIndex(index);
	};

	useEffect(() => {
		const showToast = () => {
			// const btn = document.getElementById(idButton);
			// btn.addEventListener("click", () => {});
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

	// Add new product
	const onSubmit = handleSubmit(async (values) => {
		console.log(values);
		values.id = 0;
		const result = await createProductRequest(values);
		console.log("result from dash_portfolio: ", result);
		setAddModal(false);
		if (result.data.body[0] === "Data saved succesfully") {
			setResToast({
				state: true,
				message: "Nuevo producto agregado",
			});
		} else {
			setResToast({
				state: false,
				message: "No se pudo agregar el producto. Vuelve a intentarlo.",
			});
		}
		reset();

		onAction("addProduct");
	});

	const onSubmitEdit = handleSubmit(async (values) => {
		console.log("values for edit: ", values);
		console.log("mekams: ", productInfo);
		const editProduct = {
			id: productInfo.id,
			nameProduct: values.editNameProduct,
			description: values.editDescription,
			price: values.editPrice,
			state: values.editState,
			rank: values.editRank,
			productSize: values.editProductSize,
			productType: values.editProductType,
		};

		try {
			const editResult = await createProductRequest(editProduct);
			console.log("editResult in dashportfolio: ", editResult);
			setEditModal(false);
			reset();

			if (editResult.data.body[0] === "Data updated succesfully") {
				setResToast({
					state: true,
					message: "Producto actualizado",
				});
			} else {
				setResToast({
					state: false,
					message: "No se pudo actualizar el producto. Vuelve a intentarlo.",
				});
			}

			onAction("editProduct");
		} catch (error) {
			console.log("error in onsubmitEdit ", error);
		}
	});

	const deleteProduct = async (productData) => {
		try {
			const result = await deleteProductRequest(productData);
			if (result) {
				setDeleteModal(false);
				console.log("Registro eliminado: ", result);
				setEditModal(false);

				if (result.data.body === "Information deleted") {
					setResToast({
						state: true,
						message: "Producto eliminado éxitosamente",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo eliminar el producto. Vuelve a intentarlo.",
					});
				}

				onAction("deleteProduct");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Portafolio de productos</h2>
				<div>
					<input type="text" placeholder="Buscar por nombre" />
				</div>
			</div>
			<div className="div-dash-btn-add">
				<button onClick={() => setAddModal(!addModal)}>
					<IoIceCreamOutline size={26} />
					Agregar
				</button>
			</div>
			{/* MODAL AÑADIR USUARIO */}
			{addModal && (
				<ModalTemplate
					setStateModal={setAddModal}
					title="Nuevo Producto"
					showHeader={true}
				>
					<div className="modal-content-body">
						<h4>Ingresa los datos del usuario</h4>
						<form className="dashboard-form" onSubmit={onSubmit}>
							<div className="input-group">
								<input
									type="text"
									name="nameProduct"
									{...register("nameProduct", {
										required: {
											value: true,
											message: "Este cambo es requerido",
										},
									})}
									placeholder="Nombre"
								/>
							</div>
							{errors.nameProduct && (
								<span className="notice">{errors.nameProduct.message}</span>
							)}
							<div className="input-group">
								<textarea
									cols={8}
									rows={4}
									className="textarea-form"
									{...register("description", {
										required: {
											value: true,
											message: "Este cambo es requerido",
										},
										minLength: {
											value: 10,
											message: "Descripcion debe ser mayor de 10 caracteres",
										},
										maxLength: {
											value: 60,
											message: "No puedes exceder 60 caracteres",
										},
									})}
									placeholder="Descripcion"
								/>
							</div>
							{errors.description && (
								<p className="notice">{errors.description.message}</p>
							)}
							<div className="input-group">
								<input
									type="number"
									step="0.01"
									{...register("price", {
										required: {
											value: true,
											message: "Este cambo es requerido",
										},
									})}
									placeholder="Precio unitario"
								/>
							</div>
							{errors.price && <p className="notice">{errors.price.message}</p>}
							<div className="input-group">
								<input
									type="number"
									step="0.1"
									{...register("rank", {
										required: {
											value: true,
											message: "Este cambo es requerido",
										},
										pattern: {
											value: /^\d+\.\d{1}$/, // 1 entero y un decimal
											message: "Ingrese un número entero seguido de un decimal",
										},
									})}
									placeholder="Rango"
								/>
							</div>
							{errors.rank && <p className="notice">{errors.rank.message}</p>}
							<div className="form-group-select">
								<select
									className="form-control"
									type="text"
									{...register("productSize", { required: true })}
									placeholder="Tamaño"
								>
									<option value="GRANDE">GRANDE</option>
									<option value="MEDIANO">MEDIANO</option>
									<option value="PEQUEÑO">PEQUEÑO</option>
									<option value="UNICO">UNICO</option>
								</select>
							</div>
							{errors.size && <p className="notice">{errors.size.message}</p>}
							<span className="span-edit-form">Tipo de producto</span>
							<div className="form-group-select">
								<select className="form-control" {...register("productType")}>
									<option value="Banana">Banana</option>
									<option value="Copa">Copa</option>
									<option value="Café">Café</option>
									<option value="Malteada">Malteada</option>
									<option value="Infantil">Infantil</option>
									<option value="Ensalada">Ensalada</option>
									<option value="Wafle">Wafle</option>
									<option value="Bebida">Bebida</option>
									<option value="Ninguno">Ninguno</option>
									<option value="otro">OTRO</option>
								</select>

								{watch("productType") === "otro" && (
									<>
										<input
											type="text"
											placeholder="Nuevo tipo"
											{...register("otro", {
												required: {
													value: true,
													message: "Campo requerido",
												},
											})}
										/>
										{errors.otro && <span>{errors.otro.message}</span>}
									</>
								)}
							</div>
							{errors.productType && (
								<p className="notice">{errors.productType.message}</p>
							)}
							<div className="wrap-input-submit">
								<input
									className="btn-enviar"
									id="btn-add-user"
									type="submit"
									value="Continuar"
								></input>
							</div>
						</form>
					</div>
				</ModalTemplate>
			)}
			{/* main content */}
			<div className="dash-container-cards">
				{productsData.map((productData, index) => (
					<div className="dash-container-card" key={index}>
						<div className="dash-card-user">
							<div className="colum-one">
								{productData.name && (
									<img
										src={ProductImgBuilder(productData.name.toLowerCase())}
										alt="imagen del producto"
										className="dash-card-img-product"
									/>
								)}
								
							</div>
							<div className="colum-two">
								<div>
									<span>Nombre</span>
									<span>{productData.name}</span>
								</div>
								<div>
									<span>Descripcion</span>
									<span className="span-description-card">
										{productData.description}
									</span>
								</div>
								<div>
									<span>Precio</span>
									<span>$ {productData.price}</span>
								</div>
								<div>
									<span>Estado</span>
									<span>{productData.state}</span>
								</div>
								<div>
									<span>Rango</span>
									<span>{productData.rank}</span>
								</div>
								<div>
									<span>Tamaño</span>
									<span>{productData.productSize}</span>
								</div>
								<div>
									<span>Tipo de producto</span>
									<span>{productData.productType}</span>
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
								title="Editar Producto"
								showHeader={true}
								designClass={""}
							>
								<div className="modal-content-body">
									<h5>Actualiza los datos del producto</h5>
									<form className="dashboard-form" onSubmit={onSubmitEdit}>
										<span>id: {productData.id}</span>
										<span className="span-edit-form">Nombre</span>
										<div className="input-group">
											<input
												type="text"
												{...register("editNameProduct", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
												})}
												defaultValue={productData.name}
											/>
										</div>
										{errors.editNameProduct && (
											<span>{errors.editNameProduct.message}</span>
										)}
										<span className="span-edit-form">Descripcion</span>
										<div className="input-group">
											<textarea
												className="textarea-form"
												cols={4}
												rows={3}
												{...register("editDescription", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
													minLength: {
														value: 10,
														message: "Debe tener al menos 10 caracteres",
													},
													maxLength: {
														value: 60,
														message: "no puede sobrepasar los 60 caracteres",
													},
												})}
												defaultValue={productData.description}
											/>
										</div>
										{errors.editDescription && (
											<span>{errors.editDescription.message}</span>
										)}
										<span className="span-edit-form">Precio</span>
										<div className="input-group">
											<input
												type="number"
												{...register("editPrice", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
												})}
												defaultValue={productData.price}
											/>
										</div>
										{errors.editPrice && (
											<span>{errors.editPrice.message}</span>
										)}
										<span className="span-edit-form">Estado</span>
										<select
											className="form-control"
											{...register("editState", {
												required: {
													value: true,
													message: "Este cambo es requerido",
												},
											})}
											defaultValue={productData.state}
										>
											<option value="DISPONIBLE">DISPONIBLE</option>
											<option value="NO DISPONIBLE">NO DISPONIBLE</option>
										</select>
										<span className="span-edit-form">Rango</span>
										<div className="input-group">
											<input
												type="number"
												step="0.1"
												{...register("editRank", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
													pattern: {
														value: /^\d+\.\d{1}$/, // 1 entero y un decimal
														message:
															"Ingrese un número entero seguido de un decimal",
													},
												})}
												defaultValue={productData.rank}
											/>
										</div>
										{errors.editRank && <span>{errors.editRank.message}</span>}
										<span className="span-edit-form">Tamaño</span>
										<div className="form-group-select">
											<select
												type="text"
												className="form-control"
												{...register("editSize", { required: true })}
												placeholder="Tamaño"
												defaultValue={productData.size}
											>
												<option value="GRANDE">GRANDE</option>
												<option value="MEDIANO">MEDIANO</option>
												<option value="PEQUEÑO">PEQUEÑO</option>
												<option value="UNICO">UNICO</option>
											</select>
										</div>
										{errors.editSize && (
											<span className="notice">{errors.editSize.message}</span>
										)}
										<span className="span-edit-form">Tipo de producto</span>
										<div className="form-group-select">
											<select
												className="form-control"
												{...register("editProductType")}
												defaultValue={productData.productType}
											>
												<option value="Banana">Banana</option>
												<option value="Copa">Copa</option>
												<option value="Café">Café</option>
												<option value="Malteada">Malteada</option>
												<option value="Infantil">Infantil</option>
												<option value="Ensalada">Ensalada</option>
												<option value="Wafle">Wafle</option>
												<option value="Bebida">Bebida</option>
												<option value="Ninguno">Ninguno</option>
											</select>
										</div>
										{errors.editProductType && (
											<p className="notice">{errors.editProductType.message}</p>
										)}
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
								title={" Eliminar Producto "}
								showHeader={true}
								designClass={"alert"}
							>
								<div className="modal-content-body">
									<span className="modal-subtitle">
										Seguro que deseas eliminar el producto:
									</span>
									<span className="modal-info">Nombre: {productData.name}</span>
									<span className="modal-info">
										precio: {productData.price}
									</span>
									<span>id: {productData.id}</span>
								</div>
								<div className="container-btn-alert-modal">
									<button
										className="btn-alert-modal"
										onClick={() => deleteProduct(productData)}
									>
										Aceptar
									</button>
								</div>
							</ModalTemplate>
						)}
					</div>
				))}
			</div>
			{/* <Toaster position="top-right" /> */}
		</div>
	);
}

export default DashPortfolio;
