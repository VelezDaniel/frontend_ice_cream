import NavBar from "../components/navbar/NavBar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { createBookingRequest } from "../api/bookings";

// primereact
// import { Calendar } from "primereact/calendar";
// import { InputTextarea } from "primereact/inputtextarea";
// import { FloatLabel } from "primereact/floatlabel";
// import { InputText } from "primereact/inputtext";

// import { Message } from "primereact/message";

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

function Bookings() {
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);
	const [client, setClient] = useState("");
	const [ident, setIdent] = useState("");
	const [customErrors, setCustomErrors] = useState({});

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const formatTime = (time) => {
		const hours = time.getHours().toString().padStart(2, "0");
		const minutes = time.getMinutes().toString().padStart(2, "0");
		const seconds = time.getSeconds().toString().padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	};

	const getFormErrMessage = (name) => {
		return errors[name] && <p className="notice">{errors[name].message}</p>;
	};

	const handlerClient = (e) => {
		setClient(e.target.value);
	};

	const handlerIdent = (e) => {
		setIdent(e.target.value);
	};

	const clientValid = () => {
		if (!client || !ident) {
			return false;
		}
		return true;
	};

	const onSubmit = async (data) => {
		let info;
		// e.preventDefault();
		const dateTime =
			data.dateBook && data.timeBook
				? formatDate(data.dateBook) + " " + formatTime(data.timeBook)
				: null;
		console.log(dateTime); // Imprime la fecha y la hora combinadas
		console.log(data); // Imprime todos los datos del formulario
		console.log("user book: ", user);
		if (!user) {
			info = {
				id: 0,
				dateBook: dateTime,
				description: data.addDescription,
				attendees: data.addGuests,
				hiddenDescription: `Identificación: ${ident} | Nombre: ${client}`,
			};
		}
		if (user) {
			info = {
				id: 0,
				dateBook: dateTime,
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
					<form className="form-bookings" onSubmit={handleSubmit(onSubmit)}>
						{/* Calendario para reservaciones */}
						<div>
							<p className="label-date-book">Elige la fecha</p>
							<div className="div-calendar-book">
								<FiCalendar size={36} />
								<input
									type="date"
									id=""
									{...register("dateBook", {
										required: {
											value: true,
											message: "Campo requerido",
										},
									})}
								/>
							</div>
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
						</div>

						<div>
							<div>
								<p className="label-date-book">Describe tu evento</p>
								<p className="font-description-type">
									Describe cual es el motivo de tu evento y detalles adicionales
									que consideres importantes
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
								</div>
							</>
						)}

						<div className="container-btn btn-space-around">
							<button className="btn btn-portfolio" type="submit">
								Reservar
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Bookings;
