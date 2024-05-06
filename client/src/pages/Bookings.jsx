import NavBar from "../components/navbar/NavBar";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { createBookingRequest, showUserBookingsRequest } from "../api/bookings";

// Prime React
import { Message } from "primereact/message";

// Material UI
import Alert from "@mui/material/Alert";

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
		formState: { errors },
	} = useForm();
	const [showBooks, setShowBooks] = useState(false);
	const [bookForm, setBookForm] = useState(true);
	const [userBooks, setUserBooks] = useState([]);

	const handleShowBooks = async () => {
		try {
			if (user != null) {
				const items = await showUserBookingsRequest(user);
				// Establecer usuarios en estado
				console.log(items);
				setUserBooks(items.data.body);
			} else {
				console.log("user null", user);
			}
		} catch (error) {
			console.log("Error in useEffect books: ", error);
		}
	};

	const handleForm = () => {
		setShowBooks(false);
		setBookForm(true);
	};

	const handleBooks = () => {
		handleShowBooks();
		setShowBooks(true);
		setBookForm(false);
	};

	const onSubmit = async (data) => {
		let info;
		console.log(data); // Imprime todos los datos del formulario
		console.log("user book: ", user);
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
		console.log("addBook response: ", addBook);
		// location.reload();
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
								<button className="btn btn-portfolio" onClick={handleForm}>
									Reservar
								</button>
							</div>
							<div className="container-btn btn-custom-book">
								<button className="btn btn-portfolio" onClick={handleBooks}>
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
									<Message
										severity="error"
										className="message-prime-react"
										text={errors.dateBook.message}
									/>
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
									<Message
										severity="error"
										className="message-prime-react"
										text={errors.timeBook.message}
									/>
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
									<Message
										severity="error"
										className="message-prime-react"
										text={errors.addGuests.message}
									/>
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
									<Message
										severity="error"
										className="message-prime-react"
										text={errors.addDescription.message}
									/>
								)}
							</div>

							{!user && (
								<>
									<div>
										<p className="label-date-book">Describe tu evento</p>
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
											<Message
												severity="error"
												className="message-prime-react"
												text={errors.addClient.message}
											/>
										)}
									</div>

									<div>
										<p className="label-date-book">Describe tu evento</p>
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
											<Message
												severity="error"
												className="message-prime-react"
												text={errors.addIdentity.message}
											/>
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
					{showBooks && (
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 450 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Fecha </TableCell>
										<TableCell align="right">Hora</TableCell>
										<TableCell align="right">Invitados</TableCell>
										<TableCell align="right">Descripción</TableCell>
										<TableCell align="right">Acciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{userBooks.map((book) => (
										<TableRow
											key={book.id}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{book.dateBook}
											</TableCell>
											<TableCell align="right" className="table-item">{book.timeBook}</TableCell>
											<TableCell align="right">{book.attendees}</TableCell>
											<TableCell align="right">{book.description}</TableCell>
											<TableCell align="right">
												<div className="dash-container-btns">
													<button
														className="dash-btn-edit"
														onClick={() => openModalEdit(book.id)}
													>
														<HiOutlinePencilAlt size={38} />
													</button>
													<button
														className="dash-btn-delete"
														onClick={() => openModalDelete(book.id)}
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
				</div>
			</div>
		</>
	);
}

export default Bookings;
