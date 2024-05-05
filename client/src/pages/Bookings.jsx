import NavBar from "../components/navbar/NavBar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { createBookingRequest } from "../api/bookings";

// primereact
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

import { Message } from "primereact/message";

// styles
import "../css/bookings.css";
import { LuCalendarClock } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

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
		if (!date || !time) {
			setCustomErrors((prevErrors) => ({
				...prevErrors,
				addDate: "Fecha es requerida",
			}));
			return;
		}

		let info;
		// e.preventDefault();
		const dateTime =
			data && time ? formatDate(date) + " " + formatTime(time) : null;
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
						<div className="card flex flex-wrap gap-3 p-fluid div-calendar-book">
							<LuCalendarClock size={54} />
							<div className="flex-auto">
								<label
									htmlFor="buttondisplay"
									className="font-bold block mb-2 label-date-book"
								>
									Elige la fecha de tu evento
								</label>

								<Calendar
									// {...register("addDate", {
									// 	required: {
									// 		value: true,
									// 		message: "Campo requerido",
									// 	},
									// })}
									required
									className="calendar-book"
									value={date}
									onChange={(e) => setDate(e.value)}
									showIcon
								/>
							</div>
							{customErrors && customErrors.addDate && (
								// <p className="notice">{errors.addDate.message}</p>
								<div className="card flex justify-content-center">
									<Message text="Username is required" />
								</div>
							)}
							<div className="flex-auto">
								<label
									htmlFor="calendar-timeonly"
									className="font-bold block mb-2 label-date-book"
								>
									Elige la hora de tu evento
								</label>

								<Calendar
									// {...register("addTime", {
									// 	required: {
									// 		value: true,
									// 		message: "Campo requerido",
									// 	},
									// })}
									required
									id="calendar-timeonly"
									className="font-bold block mb-2 calendar-book"
									value={time}
									onChange={(e) => setTime(e.value)}
									showIcon
									timeOnly
									icon={() => <FiClock />}
								/>
							</div>
							{/* {errors && errors.addTime && (
								<p className="notice">{errors.addTime.message}</p>
							)} */}
						</div>
						<div className="card flex justify-content-center div-calendar-book">
							<LuBookMarked size={54} />
							<div>
								<p className="label-date-book">
									Describe tu evento y cual es tu motivo
								</p>
								<FloatLabel>
									<InputTextarea
										id="description"
										// value={valueText}
										// onChange={(e) => setValueText(e.target.value)}
										rows={4}
										cols={40}
										// name="addDescription"
										required
										{...register("addDescription", {
											required: {
												value: true,
												message: "Campo requerido",
											},
										})}
									/>
									<label className="inside-label-input" htmlFor="description">
										Descripción
									</label>
								</FloatLabel>
							</div>
							{errors && errors.addDescription && (
								<p className="notice">{errors.addDescription.message}</p>
							)}
						</div>
						<div className="div-calendar-book">
							<BsPeople size={48} />
							<div>
								<p className="label-date-book">
									¿Cuantos participantes habrá en el evento?
								</p>
								<div className="card flex justify-content-center div-calendar-book">
									<InputText
										keyfilter="int"
										placeholder="4"
										className="input-int-form"
										name="addGuests"
										required
										{...register("addGuests", {
											required: {
												value: true,
												message: "Campo requerido",
											},
											maxLength: {
												value: 2,
												message: "No podemos admitir tantos invitados :(",
											},
											validate: {
												maxGuests: (value) =>
													parseInt(value) <= 16 ||
													"No podemos admitir mas de 16 personas",
											},
										})}
									/>
								</div>
							</div>
						</div>
						{!user && (
							<div className="div-container-calendar div-space">
								<p className="label-date-book title-space-left">
									Ingresa tus datos para la reservación
								</p>

								<div className="div-container-calendar">
									<div className="card flex justify-content-center div-calendar-book">
										<FaRegUser size={38} />
										<FloatLabel>
											<InputText
												required
												className="calendar-book"
												id="client"
												value={client}
												onChange={(e) => setClient(e.target.value)}
												// name="addClient"
												// {...register("addClient", {
												// 	required: {
												// 		value: true,
												// 		message: "Campo requerido",
												// 	},
												// })}
											/>
											<label className="inside-label-input" htmlFor="username">
												Tu Nombre Completo
											</label>
										</FloatLabel>
									</div>
									{/* {errors && errors.addClient && (
										<p className="notice">{errors.addClient.message}</p>
									)} */}
									<div className="card flex justify-content-center div-calendar-book">
										<FaRegAddressCard size={38} />
										<FloatLabel>
											<InputText
												required
												className="calendar-book"
												id="userIdentity"
												value={ident}
												onChange={(e) => setIdent(e.target.value)}
												// name="userIdentity"
												// {...register("addIdentity", {
												// 	required: {
												// 		value: true,
												// 		message: "Campo requerido",
												// 	},
												// 	minLength: {
												// 		value: 6,
												// 		message: "No es una identificación válida",
												// 	},
												// })}
											/>
											<label className="inside-label-input" htmlFor="username">
												Número de Identificacion
											</label>
										</FloatLabel>
									</div>
								</div>
								{/* {errors && errors.userIdentity && (
									<p className="notice">{errors.addIdentity.message}</p>
								)} */}
							</div>
						)}
						<div className="container-btn">
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
