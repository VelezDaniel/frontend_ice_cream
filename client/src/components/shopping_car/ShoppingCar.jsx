import { IoClose } from "react-icons/io5";
import "./shoppingcar.css";
import { CartContext } from "../../context/ShoppingCartContext";
import { useContext } from "react";

function ShoppingCar({ closeMethod }) {
	const [cart, setCart] = useContext(CartContext);

	const quantity = cart.reduce((accumulator, current) => {
		return accumulator + current.quantity;
	}, 0);

	const totalPrice = cart.reduce(
		(accumulator, current) => accumulator + current.quantity * current.price,
		0
	);

	return (
		<div className="car-container">
			<div className="u-container1">
				<div className="wrap-btn">
					<button className="btn-back" onClick={closeMethod}>
						<i>
							<IoClose />
						</i>
					</button>
				</div>
				<div>
					<h3 className="car-title">Tu pedido</h3>
				</div>
				<div className="u-container1-1">
					<div className="wrap-subtitle">
						<h4 className="car-subtitle">Lista de productos</h4>
					</div>
					<div>
						<div>Items in car: {quantity}</div>
						<div>Total: ${totalPrice}</div>
					</div>
				</div>
			</div>
			<button onClick={() => console.log(cart)} className="btn-shopping-car">
				Pagar
			</button>
		</div>
	);
}

export default ShoppingCar;
