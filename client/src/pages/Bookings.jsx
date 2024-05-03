import NavBar from "../components/navbar/NavBar";
// import bookingImg from "../assets/imgs/imagebooking.png";
// styles
import "../css/bookings.css";

function Bookings() {
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
				<div></div>
			</div>
		</>
	);
}

export default Bookings;
