import NavBar from "../components/navbar/NavBar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

// primereact
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

// styles
import "../css/bookings.css";
import { LuCalendarClock } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

function Bookings() {
	const { register, handleSubmit, errors } = useForm();

	const { user } = useAuth();
	// const [datetime24h, setDateTime24h] = useState(null);
	const [date, setDate] = useState(null);
	const [valueText, setValueText] = useState("");
	const [textUser, setTextUser] = useState("");

	const handlerCalendarChanger = (e) => {
		setDateTime24h(e.value);
	};

	const onSubmit = (data) => {
		console.log(data);
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
									{...register("addDate", {
										required: {
											value: true,
											message: "Campo requerido",
										},
									})}
									className="calendar-book"
									value={date}
									onChange={(e) => setDate(e.value)}
									showIcon
								/>
							</div>
							{errors && errors.addDate && (
								<p className="notice">{errors.addDate.message}</p>
							)}
							<div className="flex-auto">
								<label
									htmlFor="buttondisplay"
									className="font-bold block mb-2 label-date-book"
								>
									Elige la hora de tu evento
								</label>

								<Calendar
									{...register("addTime", {
										required: {
											value: true,
											message: "Campo requerido",
										},
									})}
									className="calendar-book"
									value={date}
									onChange={(e) => setDate(e.value)}
									showIcon
									timeOnly
									icon={() => <FiClock />}
								/>
							</div>
							{errors && errors.addTime && (
								<p className="notice">{errors.addTime.message}</p>
							)}
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
										value={valueText}
										onChange={(e) => setValueText(e.target.value)}
										rows={4}
										cols={40}
										name="addDescription"
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
							{errors && errors.addGuests && (
								<p className="notice">{errors.addGuests.message}</p>
							)}
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
												className="calendar-book"
												id="username"
												value={textUser}
												onChange={(e) => setTextUser(e.target.value)}
												name="addClient"
												{...register("addClient", {
													required: {
														value: true,
														message: "Campo requerido",
													},
												})}
											/>
											<label className="inside-label-input" htmlFor="username">
												Tu Nombre Completo
											</label>
										</FloatLabel>
									</div>
									{errors && errors.addClient && (
										<p className="notice">{errors.addClient.message}</p>
									)}
									<div className="card flex justify-content-center div-calendar-book">
										<FaRegAddressCard size={38} />
										<FloatLabel>
											<InputText
												className="calendar-book"
												id="userIdentity"
												value={textUser}
												onChange={(e) => setTextUser(e.target.value)}
												name="userIdentity"
												{...register("addIdentity", {
													required: {
														value: true,
														message: "Campo requerido",
													},
													minLength: {
														value: 6,
														message: "No es una identificación válida",
													},
												})}
											/>
											<label className="inside-label-input" htmlFor="username">
												Número de Identificacion
											</label>
										</FloatLabel>
									</div>
								</div>
								{errors && errors.userIdentity && (
									<p className="notice">{errors.addIdentity.message}</p>
								)}
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
