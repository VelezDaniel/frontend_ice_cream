import { IoClose } from "react-icons/io5";
import "./shoppingcar.css";

function ShoppingCar({closeMethod}) {
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
            
          </div>
        </div>
			</div>
      <button className="btn-shopping-car">Pagar</button>
		</div>
	);
}

export default ShoppingCar;