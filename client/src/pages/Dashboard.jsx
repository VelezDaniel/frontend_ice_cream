import './css/dashboard.css';
import { IoIceCreamOutline } from "react-icons/io5";

function Dashboard () {

  return (
    <div className="content">
        <form className="form-panel d-flex flex-column align-items-start" action="">
            <button className="btn-mostrarmenos" type="submit">
                <div className="icon-container1"><i className="bi bi-arrow-left"></i></div>
                Mostrar Menos
            </button>
            <button className="btn-panel" type="submit"> Panel de gestión
            </button>
            <button className="btn-pedidos" type="submit">
                <div className="icon-container"><i className="bi bi-cart"></i></div>
                Pedidos
            </button>
            <button className="btn-ventas" type="submit">
                <div className="icon-container"><i className="bi bi-cash-coin"></i></div>
                Ventas
            </button>
            <button className="btn-usuario" type="submit">
                <div className="icon-container"><i className="bi bi-people"></i></div>
                Usuarios
            </button>
            <button className="btn-portafolio" type="submit">
                <div className="icon-container"><i className="bi bi-briefcase"></i></div>
                Portafolio
            </button>
            <p className="admin-text">ADMINISTRADOR</p>
            <p className="admin-text">David Calderon</p>
        </form>
        <button className="btn-cerrarsesion" type="submit">
            <div className="icon-container1"><i className="bi bi-box-arrow-right"></i></div>
            Cerrar Sesión
        </button>
    </div>
  )
}

export default Dashboard;