import { useState } from "react";
import { BiBookmarkAltPlus } from "react-icons/bi";

const DashOrders = () => {

  const [ordersData, setOrdersData] = useState([]);


	return (
		<div className="pannel-container">
			<div className="p-cont-header">
				<h2>Pedidos</h2>
				<div>
					<input type="text" placeholder="Buscar por identificacion" />
				</div>
			</div>
			<div className="div-dash-btn-add">
				<button>
					<BiBookmarkAltPlus size={26} />
					Añadir nuevo
				</button>
			</div>
      <div className="dash-container-cards">
        <div className="dash-container-card">

        </div>
      </div>
		</div>
	);
};

export default DashOrders;
