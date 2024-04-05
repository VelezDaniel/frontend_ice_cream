import "./css/dash_portfolio.css";
import { IoIceCreamOutline } from "react-icons/io5";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
// import { useAuth } from "../../context/AuthContext";
import { showProductsRequest, createProductRequest } from "../../api/products";

import photo from "../../assets/imgs/main_products_imgs/irlandez.png";

function DashPortfolio() {
	const [prodcutsData, setProductsData] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);

	const {
		register,
		handleSubmit,
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
	}, []);

	const openModalEdit = (index) => {
		setEditModal(true);
		setselectedObjectIndex(index);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setselectedObjectIndex(index);
	};

	const onSubmit = handleSubmit(async (values) => {
		console.log(values);
		const result = await createProductRequest(values);
		console.log("result from dash_portfolio: ", result);
		reset();
		window.location.reload();
	});

	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Portafolio de productos</h2>
				<div>
					<input type="text" placeholder="Buscar por nombre" />
				</div>
			</div>
			<div className="div-dash-btn-add">
				<button>
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
									{...register("name", { required: true })}
									placeholder="Nombre"
								/>
							</div>
							{errors.name && <p className="notice">Campo nombre requerido</p>}
							<div className="input-group">
								<input
									type="text"
									{...register("description", { required: true })}
									placeholder="Descripcion"
								/>
							</div>
							{errors.description && (
								<p className="notice">Campo descripcion requerido</p>
							)}
							<div className="input-group">
								<input
									type="text"
									{...register("price", { required: true })}
									placeholder="Precio unitario"
								/>
							</div>
							{errors.price && <p className="notice">Campo Precio requerido</p>}
							<div className="input-group">
								<input
									type="text"
									{...register("rank", { required: true })}
									placeholder="Rango"
								/>
							</div>
							{errors.rank && <p className="notice">Campo rango requerido</p>}
							<div className="input-group">
								<input
									type="text"
									{...register("size", { required: true })}
									placeholder="Tamaño"
								/>
							</div>
							{errors.size && <p className="notice">Campo tamaño requerido</p>}
							<div className="input-group">
								<input
									type="text"
									{...register("productType", { required: true })}
									placeholder="Tipo de Producto"
								/>
							</div>
							{errors.productType && (
								<p className="notice">tipo de producto requerido</p>
							)}
							<input
								className="btn-enviar"
								id="btn-add-user"
								type="submit"
								value="Continuar"
							></input>
							{/* {registerErrors.map((error, i) => (
								<div className="errors" key={i}>
									{error}
								</div>
							))} */}
						</form>
					</div>
				</ModalTemplate>
			)}
			{/* main content */}
			<div className="dash-container-cards">
				{prodcutsData.map((productData, index) => (
					<div className="dash-container-card" key={index}>
						<div className="dash-card-user">
							<div className="colum-one">
								<img
									src={photo}
									alt="imagen del helado"
									className="dash-card-img-product"
								/>
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
									<form
										className="dashboard-form"
										// onSubmit={handleSubmitEdit(productData)}
									>
										<span>id: {productData.id}</span>
										<span className="span-edit-form">Nombre</span>
										<div className="input-group">
											<input
												type="text"
												name="name"
												defaultValue={productData.name}
											/>
										</div>
										{errors.name && (
											<p className="notice">Campo nombre requerido</p>
										)}
										<span className="span-edit-form">Descripcion</span>
										<div className="input-group">
											<input
												type="text"
												name="description"
												defaultValue={productData.description}
											/>
										</div>
										{errors.description && (
											<p className="notice">Campo descripcion requerido</p>
										)}
										<span className="span-edit-form">Precio</span>
										<div className="input-group">
											<input
												type="text"
												name="price"
												defaultValue={productData.price}
											/>
										</div>
										{errors.price && (
											<p className="notice">Campo precio requerido</p>
										)}
										<span className="span-edit-form">Estado</span>
										<select name="state" defaultValue={productData.state}>
											<option value="DISPONIBLE"></option>
											<option value="NO DISPONIBLE"></option>
										</select>
										<span className="span-edit-form">Rango</span>
										<div className="input-group">
											<input
												type="text"
												name="rank"
												defaultValue={productData.rank}
											/>
										</div>
										{errors.rank && (
											<p className="notice">Campo Rango requerido</p>
										)}
										<span className="span-edit-form">Tamaño</span>
										<div className="input-group">
											<input
												type="text"
												name="size"
												defaultValue={productData.productSize}
											/>
										</div>
										{errors.size && <p className="notice">Tamaño requerido</p>}
										<span className="span-edit-form">Tipo de producto</span>
										<div className="input-group">
											<input
												type="number"
												name="productType"
												defaultValue={productData.productType}
											/>
											{/* TRAER INFORMACION DEL TIPO DE PRODUCTO PARA MOSTRAR EN EL SELECT */}
										</div>
										{errors.productType && (
											<p className="notice">Tipo de producto requerido</p>
										)}
										{/* {console.log(
											"productData and role EDIT: ",
											productData,
										)} */}
										{/* Boton para enviar formulario de actualizacion de usuario */}
										<input
											type="submit"
											className="btn-enviar"
											id="btn-add-user"
											value="Actualizar"
											// onClick={() => {
											// 	updateUser(productData, roleInEdit);
											// }}
										/>

										{/* {registerErrors.map((error, i) => (
											<div className="errors" key={i}>
												{error}
											</div>
										))} */}
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
									<span className="modal-info">
										Nombre: {productData.name}
									</span>
									<span className="modal-info">
										precio: {productData.price}
									</span>
									<span>id: {productData.id}</span>
								</div>
								<div className="container-btn-alert-modal">
									<button
										className="btn-alert-modal"
										onClick={() => deleteUser(productData)}
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

export default DashPortfolio;
