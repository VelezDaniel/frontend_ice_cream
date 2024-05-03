import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import "./modal_product.css";
import { useEffect, useState } from "react";
import { showFlavorsRequest } from "../../../api/flavors";
import { showAditionsRequest } from "../../../api/aditions";
import aldea from "../../../assets/imgs/main_products_imgs/aldea.png";

function ModalProduct({ product, setStateModal }) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	// const aditionChecked = watch("adition");

	const [aditionsData, setAditionsData] = useState([]);
	const [aditionChecked, setAditionChecked] = useState(false);
	const [selectedAditions, setSelectedAditions] = useState([]);
	const [aditionQuantities, setAditionQuantities] = useState({});
	const [sauceChecked, setSauceChecked] = useState(false);
	const [sauceSelected, setSauceSelected] = useState({});
	const sauces = [
		{
			id: 1,
			sauceName: "Chocolate",
		},
		{
			id: 2,
			sauceName: "Lecherita",
		},
		{
			id: 3,
			sauceName: "Arequipe",
		},
		{
			id: 4,
			sauceName: "Mora",
		},
		{
			id: 5,
			sauceName: "Cereza",
		},
		{
			id: 6,
			sauceName: "Chicle",
		},
		{
			id: 7,
			sauceName: "Piña",
		},
	];

	// Manejar cambio en el checkbox ADICION
	const handleAditionChange = (event) => {
		setAditionChecked(event.target.checked);
		if (!event.target.checked) {
			setSelectedAditions([]);
			setAditionQuantities({});
		}
	};

	// Cambio de los checkboxes de las adiciones seleccionadas
	const handlerSelectedAditionChange = (aditionId) => (event) => {
		const checked = event.target.checked;
		setSelectedAditions((prevSelected) =>
			checked
				? [...prevSelected, aditionId]
				: prevSelected.filter((id) => id !== aditionId)
		);
		setAditionQuantities((prevQuantities) =>
			checked
				? { ...prevQuantities, [aditionId]: "" }
				: { ...prevQuantities, [aditionId]: undefined }
		);
	};

	// Manejo de cantidad de adicion
	const handlerQuantityChange = (aditionId) => (event) => {
		const value = parseInt(event.target.value);
		setAditionQuantities((prevQuantities) => ({
			...prevQuantities,
			[aditionId]: value,
		}));
	};

	// ? Manejar cambio en el checkbox SALSAS
	const handleSauceChange = () => {
		setSauceChecked(true);
		if (!setSauceChecked) {
			setSauceSelected({});
		}
	};

	// ? Cambiar la salsa seleccionada
	const handlerSaveSauce = (sauce) => {
		setSauceSelected(sauce);
	};

	// ? use effect para traer adiciones
	useEffect(() => {
		const getAditions = async () => {
			try {
				const aditions = await showAditionsRequest();
				// Establecer usuarios en estado
				console.log(aditions);
				setAditionsData(aditions.data.body);
			} catch (error) {
				console.log("Error in dash_portfolio: ", error);
			}
		};
		getAditions();
	}, []);

	const SaveProductInformation = () => {
		// consulta a base de datos
	}

	const onSubmit = handleSubmit((data) => {
		console.log("information of product: ", data);
	});

	return (
		<div className="cover-modal">
			<div className="container-modal product-modal">
				{/* Header */}
				<div className="modal-header">
					<h3>Elige tus preferencias</h3>
				</div>
				<button
					className="btn-close-modal"
					onClick={() => setStateModal(false)}
				>
					<IoIosClose size={34} />
				</button>
				{/* Modal body */}
				<div className="scroll-base-modal">
					<div className="box-img-card-product">
						<img src={aldea} alt="imagen helado" />
					</div>
					<div className="box-desc-product-modal">
						<h4>{product.name}</h4>
						<p className="subtitle-gray">{product.productType}</p>
						<p className="subtitle-gray">Tamaño: {product.productSize}</p>
						<p className="desc-product-modal">{product.description}</p>
					</div>
					<form className="form-detail-product" onSubmit={onSubmit}>
						{/* CANTIDAD */}
						<div className="form-sect-detail-product">
							<label className="font-detail-product" htmlFor="quantity">
								¿Cuantos deseas llevar?
							</label>
							<div className="input-group input-detail-product">
								<input
									type="number"
									defaultValue={1}
									{...register("quantity", {
										required: {
											value: true,
											message: "Este campo es requerido",
										},
										min: {
											value: 1,
											message: "Selecciona al menos 1",
										},
									})}
								/>
							</div>
						</div>
						{errors.quantity && <span>{errors.quantity.message}</span>}

						{/* Seleccion sabores */}
						<div className="check-box-input">
							<label className="font-detail-product" htmlFor="flavors">
								Elige los sabores de helado
							</label>
						</div>

						{/* Opcion cubiertos */}
						<div className="check-box-input">
							<label className="font-detail-product" htmlFor="cutlery">
								<input type="checkbox" {...register("cutlery")} />
								Llevar cubiertos
							</label>
						</div>

						<div className="container-aditions">
							{/* Seleccion adicion */}
							<div className="check-box-input">
								<label className="font-detail-product">
									<input
										type="checkbox"
										checked={aditionChecked}
										onChange={handleAditionChange}
									/>
									¿Deseas algúna adición?
								</label>
							</div>

							{aditionChecked && (
								<div className="box-aditions-group">
									{aditionsData.map((adition) => (
										<div className="div-adition-quantity" key={adition.id}>
											<label>
												<input
													className="input-checkbox"
													type="checkbox"
													checked={selectedAditions.includes(adition.id)}
													onChange={handlerSelectedAditionChange(adition.id)}
												/>
												<div>
													<p>{adition.nameAdition}</p>
													<p className="italic-item">{adition.priceAdition}</p>
												</div>
											</label>
											{selectedAditions.includes(adition.id) && (
												<input
													className="input-adition-quantity"
													type="number"
													value={aditionQuantities[adition.id] || ""}
													onChange={handlerQuantityChange(adition.id)}
													placeholder="¿Cuantos?"
												/>
											)}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Seleccion adicion */}
						{/* <div className="check-box-input">
							<label className="font-detail-product" htmlFor="adition">
								<input type="checkbox" {...register("adition")} />
								¿Deseas alguna adición?
							</label>

							{aditionChecked && (
								<input
									type="checkbox"
									// ! HACER CONSULTA DE LAS ADICIONES PARA CONTINUAR
									checked={selectedAditions.includes(adition.id)}
									onChange={checkBoxHandler}
								/>
							)}
						</div> */}

						{/* SALSAS */}
						<div className="check-box-input">
							<label className="font-detail-product" htmlFor="sausage">
								<input type="checkbox" onChange={handleSauceChange} />
								Deseas alguná salsa?
							</label>

							{sauceChecked && (
								<div className="form-group-select">
									<select
										className="form-control"
										defaultValue={sauces[0].sauceName}
										onChange={(e) => handlerSaveSauce(sauces.find(sauce => sauce.sauceName === e.target.value))}
									>
										{sauces.map((sauce) => (
											<option key={sauce.id} value={sauce.sauceName}>
												{sauce.sauceName}
											</option>
										))}
									</select>
								</div>
							)}
						</div>

						{/* DESCRIPCIÓN PEDIDO */}
						<div className="box-text-area-detail">
							<label className="font-detail-product" htmlFor="description">
								Añade un comentario sobre algo mas que debamos tener en cuenta
								para hacer tu pedido.
							</label>
							<textarea
								className="input-textarea"
								type="textarea"
								rows="4"
								cols="1"
								{...register("description")}
								placeholder="Descripción adicional"
							></textarea>
						</div>
						{errors.description && <span>{errors.description.message}</span>}

						<div className="container-btn cont-btn-product">
							<button className="btn btn-portfolio">Agregar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ModalProduct;
