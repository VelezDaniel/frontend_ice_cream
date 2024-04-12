// import "./css/dash_portfolio.css";
import { LuBookPlus } from "react-icons/lu";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
// import { useAuth } from "../../context/AuthContext";
import {
	showBookingsRequest,
	createBookingRequest,
	deleteBookingRequest,
} from "../../api/bookings";
import { showUserRequest } from "../../api/users";

function DashBookings() {
	const [bookingsData, setBookingsData] = useState([]);
	const [bookingInfo, setBookingInfo] = useState([]);
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
		const handleShowBookings = async () => {
			try {
				const items = await showBookingsRequest();
				// Establecer usuarios en estado
				console.log(items);
				setBookingsData(items.data.body);
			} catch (error) {
				console.log("Error in bookings_portfolio: ", error);
			}
		};
		handleShowBookings();
	}, []);

	useEffect(() => {
		if (bookingInfo) {
			setValue("editAttendes", bookingInfo.attendees);
			setValue("editDate", bookingInfo.date);
			setValue("editStart", bookingInfo.start);
			setValue("editEnd", bookingInfo.end);
			setValue("editIdentityClient", bookingInfo.identityClient);
		}
	}, [bookingInfo]);

	const openModalEdit = (index) => {
		setEditModal(true);
		setselectedObjectIndex(index);
		setBookingInfo(bookingsData[index]);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setselectedObjectIndex(index);
	};

	// Add new booking
	const onSubmit = handleSubmit(async (values) => {
		console.log(values);
		try {
			const client = {
				id: values.identityClient,
			};
			const clientExist = await showUserRequest(client);
			console.log("clientExist: ", clientExist);

			if (
				clientExist &&
				clientExist.data.body &&
				Object.keys(clientExist.data.body).length > 0
			) {
				const objectClientExist = clientExist.data.body;
				const addBooking = {
					id: 0,
					attendees: values.attendees,
					date: values.date,
					start: values.start,
					end: values.end,
					idClient: objectClientExist.id,
				};

				const createResult = await createBookingRequest(addBooking);
				console.log("editResult in dashBookings: ", createResult);
				setEditModal(false);
				reset();
				// window.location.reload();
			} else {
				return console.log("DEBE REGISTRARSE O COMPRAR");
			}

			values.id = 0;
			const result = await createBookingRequest(values);
			console.log("result from dash_booking: ", result);
			setAddModal(false);
			reset();
			// window.location.reload();
		} catch (error) {
			console.log('Error in add dash_booking', error)
		}
	});

	const onSubmitEdit = handleSubmit(async (values) => {
		console.log("values for edit: ", values);
		console.log("mekams: ", bookingInfo);
		try {
			const client = {
				id: values.editIdentityClient,
			};
			const clientExist = await showUserRequest(client);
			console.log("clientExist: ", clientExist);

			if (
				clientExist &&
				clientExist.data.body &&
				Object.keys(clientExist.data.body).length > 0
			) {
				const objectClientExist = clientExist.data.body;
				const editBooking = {
					id: bookingInfo.id,
					attendees: values.editAttendees,
					date: values.editDate,
					start: values.editStart,
					end: values.editEnd,
					idClient: objectClientExist.id,
				};

				const editResult = await createBookingRequest(editBooking);
				console.log("editResult in dashBookings: ", editResult);
				setEditModal(false);
				reset();
				// window.location.reload();
			} else {
				return console.log("DEBE REGISTRARSE O COMPRAR");
			}
		} catch (error) {
			console.log("error in onsubmitEdit ", error);
		}
	});

	const deleteBooking = async (bookingData) => {
		try {
			const result = await deleteBookingRequest(bookingData);
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
				<h2>Lista de Reservaciones</h2>
				<div>
					<input type="text" placeholder="Buscar por Identificación" />
				</div>
			</div>
			<div className="div-dash-btn-add">
				<button onClick={() => setAddModal(!addModal)}>
					<LuBookPlus size={26} />
					Agregar
				</button>
			</div>
			{/* MODAL AÑADIR USUARIO */}
			{addModal && (
				<ModalTemplate
					setStateModal={setAddModal}
					title="Nueva Reservación"
					showHeader={true}
				>
					<div className="modal-content-body">
						<h4>Ingresa la información de la reservacion</h4>
						<form className="dashboard-form" onSubmit={onSubmit}>
							<div className="input-group">
								<input
									type="number"
									{...register("attendees", {
										required: {
											value: true,
											message: "Este cambo es requerido",
										},
									})}
									placeholder="Numero asistentes"
								/>
							</div>
							{errors.attendees && (
								<span className="notice">{errors.attendees.message}</span>
							)}
							<label htmlFor="date">
								<i className="bi bi-calendar3"></i> Fecha del evento
							</label>
							<input
								type="date"
								{...register("date", {
									required: {
										value: true,
										message: "Este campo es requerido",
									},
								})}
							/>
							{errors.date && <p className="notice">{errors.date.message}</p>}
							<label htmlFor="start">
								<i class="bi bi-clock"></i> Hora de inicio
							</label>
							<input
								type="time"
								{...register("start", {
									required: {
										value: true,
										message: "Este campo es requerido",
									},
								})}
							/>
							{errors.start && <p className="notice">{errors.start.message}</p>}
							<label htmlFor="start">
								<i class="bi bi-clock"></i> Hora fin
							</label>
							<input
								type="time"
								{...register("end", {
									required: {
										value: true,
										message: "Este campo es requerido",
									},
								})}
							/>
							{errors.end && <p className="notice">{errors.end.message}</p>}
							<div className="input-group">
								<label htmlFor="identityClient">
									<i className="bi bi-person-vcard"></i>
								</label>
								<input
									type="text"
									{...register("identityClient", {
										required: {
											value: true,
											message: "Identificacion requerida",
										},
										// minLength: {
										// 	value: 6,
										// 	message: "No es una identificacion válida",
										// },
									})}
									placeholder="Documento"
								/>
							</div>
							{errors.identityClient && (
								<p className="notice">{errors.identityClient.message}</p>
							)}
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
				{bookingsData.map((bookingData, index) => (
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
									<span>Identificación</span>
									<span>{bookingData.identityClient}</span>
								</div>
								<div>
									<span> Nombre Cliente</span>
									<span>{bookingData.nameClient}</span>
								</div>
								<div>
									<span>Invitados</span>
									<span>{bookingData.attendees}</span>
								</div>
								<div>
									<span>Fecha del evento</span>
									<span>{bookingData.date}</span>
								</div>
								<div>
									<span>Hora de Inicio</span>
									<span>{bookingData.start}</span>
								</div>
								<div>
									<span>Hora de finalización</span>
									<span>{bookingData.end}</span>
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
								title="Editar Reservación"
								showHeader={true}
								designClass={""}
							>
								<div className="modal-content-body">
									<h5>Actualiza los datos de la Reservación</h5>
									<form className="dashboard-form" onSubmit={onSubmitEdit}>
										<span>id: {bookingData.id}</span>
										<span>id cliente {bookingData.idClient}</span>
										<span className="span-edit-form">
											Identificación Cliente
										</span>
										<div className="input-group">
											<input
												type="number"
												{...register("editIdentityClient", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
												})}
												defaultValue={bookingData.identityClients}
											/>
										</div>
										{errors.editIdentityClient && (
											<span>{errors.editIdentityClient.message}</span>
										)}
										<span className="span-edit-form">Asistentes</span>
										<div className="input-group">
											<input
												type="number"
												{...register("editAttendees", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
												})}
												defaultValue={bookingData.attendees}
											/>
										</div>
										{errors.editAttendees && (
											<span>{errors.editAttendees.message}</span>
										)}
										<span className="span-edit-form">Fecha del evento</span>
										<div className="input-group">
											<input
												type="date"
												{...register("editDate", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
												})}
												defaultValue={bookingData.date}
											/>
										</div>
										{errors.editDate && <span>{errors.editDate.message}</span>}
										<span className="span-edit-form">Hora de inicio</span>
										<div className="input-group">
											<input
												type="time"
												{...register("editStart", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
												})}
												defaultValue={bookingData.start}
											/>
										</div>
										{errors.editStart && (
											<span>{errors.editStart.message}</span>
										)}
										<span className="span-edit-form">Hora finalización</span>
										<div className="input-group">
											<input
												type="time"
												{...register("editEnd", {
													required: {
														value: true,
														message: "Este cambo es requerido",
													},
												})}
												defaultValue={bookingData.end}
											/>
										</div>
										{errors.editEnd && <span>{errors.editEnd.message}</span>}
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
								title={" Eliminar Reservación "}
								showHeader={true}
								designClass={"alert"}
							>
								<div className="modal-content-body">
									<span className="modal-subtitle">
										Seguro que deseas eliminar la Reservación:
									</span>
									<span className="modal-info">
										Id Cliente: {bookingData.identityClient}
									</span>
									<span className="modal-info">
										Nombre: {bookingData.nameClient}
									</span>
									<span className="modal-info">
										Asistentes: {bookingData.attendees}
									</span>
									<span className="modal-info">Fecha: {bookingData.date}</span>
									<span className="modal-info">
										Hora de Inicio: {bookingData.start}
									</span>
									<span className="modal-info">
										Hora Fin: {bookingData.end}
									</span>
								</div>
								<div className="container-btn-alert-modal">
									<button
										className="btn-alert-modal"
										onClick={() => deleteBooking(bookingData)}
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

export default DashBookings;
