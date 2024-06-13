import { LuBookPlus } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalTemplate from "../modal/ModalTemplate";
import { useAuth } from "../../context/AuthContext";
import {
	showBookingsRequest,
	createBookingRequest,
	deleteBookingRequest,
} from "../../api/bookings";
import { showUserRequest } from "../../api/users";
import "./css/dash_bookings.css";
import { toast } from "sonner";

// IMPORTS MATERIAL UI
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	IconButton,
	Stack,
} from "@mui/material";

// icons
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function DashBookings({ dashChange, onAction }) {
	// ? Configuration Table Material UI ----------
	const columns = [
		{ id: "nameClient", label: "Nombre", minWidth: 100 },
		{ id: "attendees", label: "Invitados", minWidth: 100, align: "center" },
		{ id: "dateBook", label: "Fecha", minWidth: 100 },
		{ id: "datetime", label: "Hora", minWidth: 100 },
		{ id: "description", label: "Descripción", minWidth: 100 },
		{ id: "hiddenDescription", label: "No Registrados", minWidth: 100 },
		{ id: "actions", label: "Acciones", minWidth: 90, align: "center" },
	];

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	// ? End of configuration --------------------

	const [bookingsData, setBookingsData] = useState([]);
	const [bookingInfo, setBookingInfo] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);
	const [resToast, setResToast] = useState({});

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
	}, [dashChange]);

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

				if (createResult.data.body[0] === "Data saved succesfully") {
					setResToast({
						state: true,
						message: "Nueva reservación agregada",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo agregar la reservación. Vuelve a intentarlo.",
					});
				}

				onAction("addBooking");
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

				if (createResult.data.body[0] === "Data saved succesfully") {
					setResToast({
						state: true,
						message: "Nueva reservación agregada",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo agregar la reservación. Vuelve a intentarlo.",
					});
				}

				onAction("addBookingNoRegister");
			} else {
				setResToast({
					state: false,
					message: "Error inesperado... No se pudo agregar la reservación. Vuelve a intentarlo.",
				});
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
				if (editResult.data.body[0] === "Data updated succesfully") {
					setResToast({
						state: true,
						message: "Reservación actualizada",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo actualizar la reservación. Vuelve a intentarlo.",
					});
				}
				onAction("editBookingHidden");
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
				if (editResult.data.body[0] === "Data updated succesfully") {
					setResToast({
						state: true,
						message: "Reservación actualizada",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo actualizar la reservación. Vuelve a intentarlo.",
					});
				}
				onAction("editBooking");
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
				if (result.data.body === "Information deleted") {
					setResToast({
						state: true,
						message: "Reservación eliminada éxitosamente",
					});
				} else {
					setResToast({
						state: false,
						message: "No se pudo eliminar la reservación. Vuelve a intentarlo.",
					});
				}
				onAction("deleteBooking");
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
							{errorsAdd.addDescription && (
								<span className="notice">
									{errorsAdd.addDescription.message}
								</span>
							)}

							<div>
								<label>Nombre completo</label>
								<div className="div-calendar-book">
									<input
										placeholder="Nombre del cliente"
										className="input-book-design client-inputs"
										type="text"
										{...registerAdd("addClient", {
											required: {
												value: true,
												message: "Nombre del cliente requerido",
											},
										})}
									/>
								</div>
							</div>

							{errorsAdd.addClient && (
								<span className="notice">{errorsAdd.addClient.message}</span>
							)}

							<div>
								<label>Identificación</label>
								<div className="div-calendar-book">
									<input
										placeholder="Identificación del cliente"
										className="input-book-design client-inputs"
										type="number"
										{...registerAdd("addIdentity", {
											required: {
												value: true,
												message: "Identificación del cliente requerida",
											},
										})}
									/>
								</div>
							</div>

							{errorsAdd.addIdentity && (
								<span className="notice">{errorsAdd.addIdentity.message}</span>
							)}

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

			<Paper
				sx={{
					width: "100%",
					overflow: "hidden",
					marginBottom: 10,
					marginTop: 2,
					paddingRight: 2,
				}}
			>
				<TableContainer
					sx={{
						maxHeight: 440,
						fontFamily: "Montserrat",
						boxShadow: 1,
					}}
				>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
										sx={{
											fontWeight: 600,
											color: "secondary.contrastText",
											fontSize: 16,
											fontFamily: "Montserrat",
											backgroundColor: "primary.bgMediumLight",
										}}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody
							sx={{
								backgroundColor: "primary.bgLight",
								fontFamily: "Montserrat",
							}}
						>
							{bookingsData
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((book, bookIndex) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={book.id}>
											{columns.map((column, columnIndex) => {
												const value = book[column.id];
												if (column.id === "actions") {
													return (
														<TableCell key={columnIndex} align={column.align}>
															<Stack
																className="flex justify-center"
																direction="row"
																spacing={1}
															>
																<IconButton
																	onClick={() => openModalEdit(bookIndex)}
																	color="info"
																	size="large"
																	aria-label="edit"
																>
																	<ModeEditOutlinedIcon fontSize="inherit" />
																</IconButton>
																<IconButton
																	onClick={() => openModalDelete(bookIndex)}
																	color="error"
																	size="large"
																	aria-label="delete"
																>
																	<DeleteOutlinedIcon fontSize="inherit" />
																</IconButton>
															</Stack>
														</TableCell>
													);
												} else {
													return (
														<TableCell
															key={column.id}
															align={column.align}
															sx={{
																fontWeight: 500,
																fontSize: 15,
																fontFamily: "Montserrat",
																color: "secondary.contrastText",
															}}
														>
															{column.format && typeof value === "number"
																? column.format(value)
																: value}
														</TableCell>
													);
												}
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					sx={{
						backgroundColor: "primary.bgMediumLight",
						fontWeight: 600,
						fontFamily: "Montserrat",
					}}
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={bookingsData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			{/* <Toaster position="top-right" /> */}
		</div>
	);
}

export default DashBookings;
