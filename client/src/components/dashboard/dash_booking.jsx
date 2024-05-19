import { LuBookPlus } from "react-icons/lu";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
import {
	showBookingsRequest,
	createBookingRequest,
	deleteBookingRequest,
} from "../../api/bookings";
import { showUserRequest } from "../../api/users";
import "./css/dash_bookings.css";

function DashBookings() {
	const [bookingsData, setBookingsData] = useState([]);
	const [bookingInfo, setBookingInfo] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);

	const {
		register: registerAdd,
		handleSubmit: handleSubmitAdd,
		reset: resetAdd,
		formState: { errors: errorsAdd },
	} = useForm();

	const {
		register: registerEdit,
		handleSubmit: handleSubmitEdit,
		setValue,
		reset: resetEdit,
		formState: { errors: errorsEdit },
	} = useForm();

	useEffect(() => {
		const handleShowBookings = async () => {
			try {
				const items = await showBookingsRequest();
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
			setValue("editDate", bookingInfo.dateBook);
			setValue("editDateTime", bookingInfo.datetime);
			setValue("editDescription", bookingInfo.description);
			setValue("editHiddenDescription", bookingInfo.hiddenDescription);
			// setValue("editIdentityClient", bookingInfo.identityClient);
		}
	}, [bookingInfo, setValue]);

	const openModalEdit = (index) => {
		setEditModal(true);
		setselectedObjectIndex(index);
		setBookingInfo(bookingsData[index]);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setselectedObjectIndex(index);
		setBookingInfo(bookingsData[index]);
	};

	const onSubmitAdd = handleSubmitAdd(async (values) => {
		console.log("values in onSubmitAdd", values);
		try {
			const client = {
				id: values.addIdentity,
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
					attendees: values.addGuests,
					dateBook: values.date,
					timeBook: values.start,
					description: values.addDescription,
					idClient: objectClientExist.id,
				};

				const createResult = await createBookingRequest(addBooking);
				console.log("add book in dashBookings: ", createResult);
				setAddModal(false);
				resetAdd();
			} else if (values.addIdentity && values.addClient) {
				const addBooking = {
					id: 0,
					attendees: values.addGuests,
					dateBook: values.date,
					timeBook: values.start,
					description: values.addDescription,
					hiddenDescription: `Identificación: ${values.addIdentity} Nombre: ${values.addClient}`,
				};

				const createResult = await createBookingRequest(addBooking);
				console.log("editResult in dashBookings: ", createResult);
				setAddModal(false);
				resetAdd();
				window.location.reload();
			} else {
				return new Error("Algo salió mal");
			}
		} catch (error) {
			console.log("Error in add dash_booking", error);
		}
	});

	const onSubmitEdit = handleSubmitEdit(async (values) => {
		console.log("values for edit: ", values);
		console.log("mekams: ", bookingInfo);
		try {
			if (values.editHiddenDescription != "N/A") {
				const editBooking = {
					id: bookingInfo.id,
					attendees: values.editAttendes,
					dateBook: values.editDate,
					timeBook: values.editDateTime,
					description: values.editDescription,
					hiddenDescription: values.hiddenDescription,
				};
				console.log("edit with client", editBooking);

				const editResult = await createBookingRequest(editBooking);
				console.log("editResult in dashBookings: ", editResult);
				setEditModal(false);
				window.location.reload();
			} else {
				const editBooking = {
					id: bookingInfo.id,
					attendees: values.editAttendes,
					dateBook: values.editDate,
					timeBook: values.editDateTime,
					description: values.editDescription,
					idClient: bookingInfo.idClient,
				};
				console.log("edit with user", editBooking);
				const editResult = await createBookingRequest(editBooking);
				console.log("editResult in dashBookings: ", editResult);
				setEditModal(false);
				window.location.reload();
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
			{addModal && (
				<ModalTemplate
					setStateModal={setAddModal}
					title="Nueva Reservación"
					showHeader={true}
				>
					<div className="modal-content-body">
						<h4>Ingresa la información de la reservacion</h4>
						<form className="dashboard-form" onSubmit={onSubmitAdd}>
							<label htmlFor="date">
								<i className="bi bi-calendar3"></i> Fecha del evento
							</label>
							<input
								type="date"
								{...registerAdd("date", {
									required: {
										value: true,
										message: "Este campo es requerido",
									},
								})}
							/>
							{errorsAdd.date && (
								<p className="notice">{errorsAdd.date.message}</p>
							)}

							<label htmlFor="start">
								<i className="bi bi-clock"></i> Hora de inicio
							</label>
							<input
								type="time"
								{...registerAdd("start", {
									required: {
										value: true,
										message: "Este campo es requerido",
									},
								})}
							/>
							{errorsAdd.start && (
								<p className="notice">{errorsAdd.start.message}</p>
							)}

							<div>
								<label>Número invitados</label>
								<div className="div-calendar-book">
									<input
										placeholder="Menos de 17"
										className="input-book-design"
										type="number"
										{...registerAdd("addGuests", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
							</div>
							{errorsAdd.addGuests && (
								<span className="notice">{errorsAdd.addGuests.message}</span>
							)}

							<div>
								<label>Descripción</label>
								<div className="div-calendar-book">
									<textarea
										cols={60}
										rows={3}
										className="text-area-book"
										placeholder="Añade una descripción al evento"
										{...registerAdd("addDescription", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
							</div>

							<div>
								<label>Nombre completo</label>
								<div className="div-calendar-book">
									<input
										placeholder="Ingrese nombre del cliente"
										className="input-book-design"
										type="text"
										{...registerAdd("addClient")}
									/>
								</div>
							</div>

							<div>
								<label>Identificación</label>
								<div className="div-calendar-book">
									<input
										placeholder="Ingrese Identificación del cliente"
										className="input-book-design"
										type="number"
										{...registerAdd("addIdentity")}
									/>
								</div>
							</div>
							<div className="box-btn-center">
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

			{editModal && (
				<ModalTemplate
					setStateModal={setEditModal}
					title="Editar Reservación"
					showHeader={true}
				>
					<div className="modal-content-body">
						<form className="dashboard-form" onSubmit={onSubmitEdit}>
							<label htmlFor="date">
								<i className="bi bi-calendar3"></i> Fecha del evento
							</label>
							<input
								type="date"
								{...registerEdit("editDate", {
									required: {
										value: true,
										message: "Este campo es requerido",
									},
								})}
							/>
							{errorsEdit.editDate && (
								<p className="notice">{errorsEdit.editDate.message}</p>
							)}

							<label htmlFor="start">
								<i className="bi bi-clock"></i> Hora de inicio
							</label>
							<input
								type="time"
								{...registerEdit("editDateTime", {
									required: {
										value: true,
										message: "Este campo es requerido",
									},
								})}
							/>
							{errorsEdit.editStart && (
								<p className="notice">{errorsEdit.editStart.message}</p>
							)}

							<div>
								<label>Número invitados</label>
								<div className="div-calendar-book">
									<input
										placeholder="Menos de 17"
										className="input-book-design"
										type="number"
										{...registerEdit("editAttendes", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
							</div>
							{errorsEdit.editAttendees && (
								<span className="notice">
									{errorsEdit.editAttendees.message}
								</span>
							)}

							<div>
								<label>Descripción</label>
								<div className="div-calendar-book">
									<textarea
										cols={60}
										rows={3}
										className="text-area-book"
										placeholder="Añade una descripción al evento"
										{...registerEdit("editDescription", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
							</div>

							<div>
								<label>Descripción (No registrados)</label>
								<div className="div-calendar-book">
									<textarea
										cols={60}
										rows={3}
										className="text-area-book"
										placeholder="Añade una descripción al evento"
										{...registerEdit("editHiddenDescription", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
							</div>

							<div className="box-btn-center">
								<input
									className="btn-enviar"
									id="btn-add-user"
									type="submit"
									value="Editar"
								></input>
							</div>
						</form>
					</div>
				</ModalTemplate>
			)}

			{deleteModal && (
				<ModalTemplate
					setStateModal={setDeleteModal}
					title="Eliminar Registro"
					showHeader={true}
					designClass={"alert"}
				>
					<div className="modal-content-body">
						<h2 className="modal-subtitle">
							Estas seguro de eliminar la reservación
						</h2>
						{bookingInfo.hiddenDescription != "N/A" && (
							<span className="modal-info">
								{bookingInfo.hiddenDescription}
							</span>
						)}
						{bookingInfo.hiddenDescription === "N/A" && (
							<>
								<span className="modal-info">
									Identificación: {bookingInfo.identityClient}
								</span>
								<span className="modal-info">
									Nombre: {bookingInfo.nameClient}
								</span>
							</>
						)}
						<span className="modal-info">
							Asistentes: {bookingInfo.attendees}
						</span>
						<span className="modal-info">Fecha: {bookingInfo.dateBook}</span>
						<span className="modal-info">
							Hora de Inicio: {bookingInfo.datetime}
						</span>
						<button
							className="btn-alert-modal"
							onClick={() => deleteBooking(bookingsData[selectedObjectIndex])}
						>
							Eliminar
						</button>
					</div>
				</ModalTemplate>
			)}

			<div className="main-list-bookings">
				<table>
					<thead>
						<tr>
							{/* <th>N°</th> */}
							<th>Nombre</th>
							<th>Invitados</th>
							<th>Fecha</th>
							<th>Hora</th>
							<th>Descripción</th>
							<th>Descripción (No registrados)</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{bookingsData.map((booking, index) => (
							<tr key={index}>
								{/* <td>{booking.id}</td> */}
								<td>{booking.nameClient}</td>
								<td>{booking.attendees}</td>
								<td>{booking.dateBook}</td>
								<td>{booking.datetime}</td>
								<td>{booking.description}</td>
								<td>{booking.hiddenDescription}</td>
								<td>
									<div className="table-button-container">
										<button onClick={() => openModalEdit(index)}>
											<HiOutlinePencilAlt size={24} />
										</button>
										<button onClick={() => openModalDelete(index)}>
											<HiOutlineTrash size={24} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default DashBookings;
