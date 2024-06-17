import NavBar from "../components/navbar/NavBar";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import {
	createBookingRequest,
	showUserBookingsRequest,
	deleteBookingRequest,
} from "../api/bookings";
import ModalTemplate from "../components/modal/ModalTemplate";
// Sonner
import { toast } from "sonner";

// Material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// styles
import "../css/bookings.css";
import { LuCalendarClock } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";
import { FiClock, FiCalendar } from "react-icons/fi";
import { PiIdentificationCard } from "react-icons/pi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

function Bookings() {
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();
	const [showBooks, setShowBooks] = useState(false);
	const [bookForm, setBookForm] = useState(true);
	const [userBooks, setUserBooks] = useState([]);
	const [bookData, setBookData] = useState(null);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [getIndex, setGetIndex] = useState(null);
	const [selectedObjectIndex, setselectedObjectIndex] = useState(null);
	const [resToast, setResToast] = useState({});

	useEffect(() => {
		const showToast = () => {
			if (resToast && resToast.state === false) {
				toast.error("Lo sentimos", {
					className: "toast-error-style",
					description: resToast.message,
					duration: 4000,
				});
			} else if (resToast.state === true) {
				toast.success(resToast.title, {
					className: "toast-success-style",
					description: resToast.message,
					duration: 3000,
				});
			}
		};
		showToast();
	}, [resToast]);

	useEffect(() => {
		if (bookData) {
			setValue("editDateBook", bookData.dateBook);
			setValue("editTimeBook", bookData.timeBook);
			setValue("editGuests", bookData.attendees);
			setValue("editDescription", bookData.description);
		}
	}, [bookData]);

	useEffect(() => {
		const handleShowBooks = async () => {
			try {
				if (user != null) {
					const items = await showUserBookingsRequest(user);
					// Establecer usuarios en estado
					setUserBooks(items.data.body);
				}
			} catch (error) {
				console.log("Error in useEffect books: ", error);
			}
		};
		handleShowBooks();
	});

	const handleForm = () => {
		setShowBooks(false);
		setBookForm(true);
	};

	const handleBooks = () => {
		// handleShowBooks();
		setShowBooks(true);
		setBookForm(false);
	};

	const onSubmit = async (data) => {
		let info;
		if (!user) {
			info = {
				id: 0,
				dateBook: data.dateBook,
				timeBook: data.timeBook,
				description: data.addDescription,
				attendees: data.addGuests,
				hiddenDescription: `Identificación: ${data.addIdentity} | Nombre: ${data.addClient}`,
			};
		}
		if (user) {
			info = {
				id: 0,
				dateBook: data.dateBook,
				timeBook: data.timeBook,
				description: data.addDescription,
				attendees: data.addGuests,
				idClient: user.id,
			};
		}

		const addBook = await createBookingRequest(info);
		reset();
		if (addBook.data.body[0] === "Data saved succesfully") {
			setResToast({
				title: "¡No faltes!",
				state: true,
				message:
					"Tu reservación ha sido creada,  recuerda anotarla por si lo olvidas",
			});
		} else {
			setResToast({
				state: false,
				message: "No se pudo crear la reservación. Vuelve a intentarlo.",
			});
		}
	};

	const openModalEdit = (index) => {
		setEditModal(true);
		setGetIndex(index);
		setselectedObjectIndex(index);
		setBookData(userBooks[index]);
	};

	const openModalDelete = (index) => {
		setDeleteModal(true);
		setselectedObjectIndex(index);
		setGetIndex(index);
		setBookData(userBooks[index]);
	};

	const onSubmitEdit = handleSubmit(async (values) => {
		try {
			const infoBook = {
				id: values.id,
				dateBook: values.editDateBook,
				timeBook: values.editTimeBook,
				attendees: values.editGuests,
				description: values.editDescription,
				idClient: user.id,
			};
			const result = await createBookingRequest(infoBook);
			if (resultPass.data.body[0] === "Data updated succesfully") {
				setResToast({
					title: "¡Muy bien!",
					state: true,
					message: "Se ha actualizado tu reservación",
				});
			} else {
				setResToast({
					state: false,
					message: "No se pudo actualizar la reservación. Vuelve a intentarlo.",
				});
			}
		} catch (error) {
			console.log("error in onsubmitEdit ", error);
		}
	});

	const deleteBook = async (bookData) => {
		try {
			const result = await deleteBookingRequest(bookData);
			setDeleteModal(false);
			if (result.data.body === "Information deleted") {
				setResToast({
					title: "Hasta tu próxima reservación",
					state: true,
					message: "Se eliminó tu reservación",
				});
			} else {
				setResToast({
					state: false,
					message: "No se pudo eliminar la reservación. Vuelve a intentarlo.",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<NavBar navBarType="NoHome" />
			<div className="body-bookings">
				<div className="banner-bookigs">
					<div>
						<h4>Reserva con amigos, pareja y familia </h4>
						<p>Un lugar para pasar tiempo de calidad con quienes amas</p>
					</div>
				</div>

				<div className="main-sect-booking">
					<h2>¡Reserva momentos felices con los tuyos!</h2>
					{user && (
						<div className="div-calendar-book">
							<div className="container-btn btn-custom-book">
								<button
									className="btn btn-portfolio"
									onClick={() => handleForm()}
								>
									Reservar
								</button>
							</div>
							<div className="container-btn btn-custom-book">
								<button
									className="btn btn-portfolio"
									onClick={() => handleBooks()}
								>
									Mis reservas
								</button>
							</div>
						</div>
					)}
					{bookForm && (
						<form className="form-bookings" onSubmit={handleSubmit(onSubmit)}>
							{/* Calendario para reservaciones */}
							<div>
								<p className="label-date-book">Elige la fecha</p>
								<div className="div-calendar-book">
									<FiCalendar size={36} />
									<input
										type="date"
										{...register("dateBook", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
								{errors && errors.dateBook && (
									<p className="notice">{errors.dateBook.message}</p>
								)}
							</div>

							<div>
								<p className="label-date-book">Elige la hora</p>
								<div className="div-calendar-book">
									<FiClock size={36} />
									<input
										type="time"
										{...register("timeBook", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
								{errors && errors.timeBook && (
									<p className="notice">{errors.timeBook.message}</p>
								)}
							</div>

							<div>
								<p className="label-date-book">Cuantos invitados habrá</p>
								<div className="div-calendar-book">
									<IoPeopleOutline size={38} />
									<input
										placeholder="Menos de 17"
										className="input-book-design"
										type="number"
										{...register("addGuests", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
								{errors && errors.addGuests && (
									<p className="notice">{errors.addGuests.message}</p>
								)}
							</div>

							<div>
								<div>
									<p className="label-date-book">Describe tu evento</p>
									<p className="font-description-type">
										Describe cual es el motivo de tu evento y detalles
										adicionales que consideres importantes
									</p>
								</div>
								<div className="div-calendar-book">
									<LuBookMarked size={38} />
									<textarea
										cols={60}
										rows={3}
										className="text-area-book"
										placeholder="Descripcion"
										type="textarea"
										{...register("addDescription", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
								</div>
								{errors && errors.addDescription && (
									<p className="notice">{errors.addDescription.message}</p>
								)}
							</div>

							{!user && (
								<>
									<div>
										<p className="label-date-book">
											Ingresa tu Nombre completo
										</p>
										<div className="div-calendar-book">
											<FaRegUser size={38} />
											<input
												className="calendar-book input-book-design"
												placeholder="Nombre"
												type="text"
												{...register("addClient", {
													required: {
														value: true,
														message: "Campo requerido",
													},
												})}
											/>
										</div>
										{errors && errors.addClient && (
											<p className="notice">{errors.addClient.message}</p>
										)}
									</div>

									<div>
										<p className="label-date-book">Ingresa tu identificación</p>
										<div className="div-calendar-book">
											<PiIdentificationCard size={38} />
											<input
												className="calendar-book input-book-design"
												placeholder="Identificación"
												type="text"
												{...register("addIdentity", {
													required: {
														value: true,
														message: "Campo requerido",
													},
												})}
											/>
										</div>
										{errors && errors.addIdentity && (
											<p className="notice">{errors.addIdentity.message}</p>
										)}
									</div>
								</>
							)}

							<div className="container-btn btn-space-around">
								<button className="btn btn-portfolio" type="submit">
									Confirmar
								</button>
							</div>
						</form>
					)}
					{/* Tabla  */}
					{showBooks && (
						<TableContainer component={Paper}>
							<Table
								sx={{
									fontFamily: "Montserrat",
									minWidth: 450,
									boxShadow: 1,
									color: "primary.main",
								}}
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell
											sx={{
												fontFamily: "Montserrat",
												fontWeight: 700,
												fontSize: 16,
												minWidth: 70,
												color: "secondary.contrastText",
												bgcolor: "primary.light",
											}}
										>
											Fecha
										</TableCell>
										<TableCell
											align="right"
											sx={{
												fontFamily: "Montserrat",
												fontWeight: 700,
												fontSize: 16,
												color: "secondary.contrastText",
												bgcolor: "primary.light",
											}}
										>
											Hora
										</TableCell>
										<TableCell
											align="right"
											sx={{
												fontFamily: "Montserrat",
												fontWeight: 700,
												fontSize: 16,
												color: "secondary.contrastText",
												bgcolor: "primary.light",
											}}
										>
											Invitados
										</TableCell>
										<TableCell
											align="right"
											sx={{
												fontFamily: "Montserrat",
												fontWeight: 700,
												fontSize: 16,
												color: "secondary.contrastText",
												bgcolor: "primary.light",
											}}
										>
											Descripción
										</TableCell>
										<TableCell
											align="right"
											sx={{
												fontFamily: "Montserrat",
												fontWeight: 700,
												fontSize: 16,
												color: "secondary.contrastText",
												bgcolor: "primary.light",
											}}
										>
											Acciones
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody sx={{ borderRadius: 8 }}>
									{userBooks.map((book, index) => (
										<TableRow key={index} sx={{ boxShadow: 1, pb: 2 }}>
											<TableCell
												component="th"
												scope="row"
												sx={{
													fontFamily: "Montserrat",
													fontWeight: 600,
													fontSize: 14,
													color: "#494949",
												}}
											>
												{book.dateBook}
											</TableCell>
											<TableCell
												align="right"
												sx={{
													fontFamily: "Montserrat",
													fontWeight: 600,
													fontSize: 14,
													color: "#494949",
												}}
											>
												{book.timeBook}
											</TableCell>
											<TableCell
												align="right"
												sx={{
													fontFamily: "Montserrat",
													fontWeight: 600,
													fontSize: 14,
													color: "#494949",
													textAlign: "center",
												}}
											>
												{book.attendees}
											</TableCell>
											<TableCell
												align="right"
												sx={{
													fontFamily: "Montserrat",
													fontWeight: 600,
													fontSize: 14,
													color: "#494949",
													maxWidth: 120,
												}}
											>
												{book.description}
											</TableCell>
											<TableCell
												align="right"
												sx={{ display: "flex", justifyContent: "end" }}
											>
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
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}

					{/* Edit modal */}
					{editModal && selectedObjectIndex === getIndex && (
						<ModalTemplate
							setStateModal={setEditModal}
							title="Editar Reservación"
							showHeader={true}
							designClass={""}
						>
							<form onSubmit={onSubmitEdit}>
								<input type="hidden" value={bookData.id} {...register("id")} />
								<span className="span-edit-form">Fecha</span>
								<div>
									<input
										type="date"
										{...register("editDateBook", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
										defaultValue={bookData.dateBook}
									/>
								</div>
								{errors.editDateBook && (
									<p className="notice">{errors.editDateBook.message}</p>
								)}
								<span className="span-edit-form">Hora</span>
								<div>
									<input
										type="time"
										{...register("editTimeBook", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
										defaultValue={bookData.timeBook}
									/>
								</div>
								{errors.editTimeBook && (
									<p className="notice">{errors.editTimeBook.message}</p>
								)}
								<span className="span-edit-form">Invitados</span>
								<div className="div-input-edit-modal">
									<input
										className="input-edit-modal"
										type="number"
										{...register("editGuests", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
										defaultValue={bookData.attendees}
									/>
								</div>
								{errors.editGuests && (
									<p className="notice">{errors.editGuests.message}</p>
								)}
								<span className="span-edit-form">Descripción</span>
								<div>
									<textarea
										className="textarea-modal-edit"
										{...register("editDescription", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
										defaultValue={bookData.description}
									/>
								</div>
								{errors.editDescription && (
									<p className="notice">{errors.editDescription.message}</p>
								)}
								<div className="div-button-edit-modal">
									<input
										type="submit"
										className="btn-enviar fill-btn"
										id="btn-add-user"
										value="Actualizar"
										// onClick={onSubmitEdit}
									/>
								</div>
							</form>
						</ModalTemplate>
					)}
					{/* Mostrar Eliminar */}
					{deleteModal && selectedObjectIndex === getIndex && (
						<ModalTemplate
							setStateModal={setDeleteModal}
							title={" Eliminar Reservación"}
							showHeader={true}
							designClass={"alert"}
						>
							<div className="modal-content-body">
								<span className="modal-subtitle">
									Seguro que deseas eliminar la reservación:
								</span>
								<span className="modal-info">Fecha: {bookData.dateBook}</span>
								<span className="modal-info">Hora: {bookData.timeBook}</span>
								<span className="modal-info">
									Invitados: {bookData.attendees}
								</span>
								<span className="modal-info">
									Descripción: {bookData.description}
								</span>
							</div>
							<div className="container-btn-alert-modal">
								<button
									className="btn-alert-modal"
									onClick={() => deleteBook(bookData)}
								>
									Aceptar
								</button>
							</div>
						</ModalTemplate>
					)}
				</div>
			</div>
		</>
	);
}

export default Bookings;
