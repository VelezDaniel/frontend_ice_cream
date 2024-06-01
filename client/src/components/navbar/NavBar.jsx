import "./navbar.css";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import UserSettings from "../user_settings/UserSettings";
import NoneUserAuthenticated from "../user_settings/NoneUser";
import ShoppingCar from "../shopping_car/ShoppingCar";
// ? USO DE CONTECXTOS
import { CartContext } from "../../context/ShoppingCartContext";
// ? -------
import {
	IoMenu,
	IoClose,
	IoIceCreamOutline,
	IoBookmarksOutline,
} from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
//  ** IMPORTS MATERIAL UI
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function NavBar({ navBarType }) {
	// States for material ui component
	// const [countBadge, setCountBadge] = useState(4);
	// const [invisible, setInvisible] = useState(false);
	const [cart, setCart] = useContext(CartContext);

	const quantity = cart.reduce((accumulator, current) => {
		return accumulator + current.quantity;
	}, 0);

	const StyledBadge = styled(Badge)(({ theme }) => ({
		"& .MuiBadge-badge": {
			right: 4,
			top: 6,
			padding: "0 4px",
		},
	}));

	// const navigate = useNavigate();
	const [scroll, setScroll] = useState(false);
	const [menuVisible, setMenuVisible] = useState(false);
	const [userSetting, setUserSetting] = useState(false);
	const [noneUserSetting, setNoneUserSetting] = useState(false);
	const [shoppingCar, setShoppingCar] = useState(false);

	const { isAuthenticated, user } = useAuth();

	useEffect(() => {
		if (navBarType === "NoHome") {
			setScroll(true);
		}
	}, []);

	const changeColorNav = () => {
		if (window.scrollY >= 400) {
			setScroll(true);
		} else {
			setScroll(false);
		}
	};

	useEffect(() => {
		if (navBarType != "NoHome") {
			window.addEventListener("scroll", changeColorNav);
			return () => {
				window.removeEventListener("scroll", changeColorNav);
			};
		}
	}, []); // Agregamos una dependencia vacía para que se ejecute solo una vez al montar el componente

	const openMenu = () => {
		setMenuVisible(true);
	};

	const closeMenu = () => {
		setMenuVisible(false);
	};

	const openSettingsUser = () => {
		console.log(user);
		if (user) {
			setUserSetting(true);
		} else {
			setNoneUserSetting(true);
		}
	};

	const closeSettingsUser = () => {
		setUserSetting(false);
	};

	const closeNoneSettingsUser = () => {
		setNoneUserSetting(false);
	};

	// Shopping car
	const openShoppingCar = () => {
		setShoppingCar(true);
	};

	const closeShoppingCar = () => {
		setShoppingCar(false);
	};

	useEffect(() => {
		const $mainMenu = document.querySelector(".main-menu");
		const $bgSidebar = document.querySelector("#cover-sidebar");
		const $hiddenContent = document.querySelector(".h-content");

		if ($mainMenu && $bgSidebar && $hiddenContent) {
			if (menuVisible) {
				$mainMenu.style.display = "flex";
				$bgSidebar.style.display = "block";
				$hiddenContent.style.pointerEvents = "none";
				$mainMenu.classList.remove("hidden");
			} else {
				$mainMenu.classList.add("hidden");
				$bgSidebar.style.display = "none";
				$hiddenContent.style.pointerEvents = "all";
			}
		}
	}, [menuVisible]);

	return (
		<>
			<div>
				<nav className={`nav-navBar ${scroll ? "navbar active" : "navbar"}`}>
					<button className="open-menu" onClick={openMenu}>
						<IoMenu size={36} />
					</button>
					<ul className="main-menu">
						<li>
							<a href="/">
								<HiOutlineHome size={38} className="icon-nav-responsive" />
								Home
							</a>
						</li>

						{user && user.role !== "RECEPCIONISTA" ? (
							<li>
								<a href="/products">
									<IoIceCreamOutline
										size={40}
										className="icon-nav-responsive"
									/>
									Productos
								</a>
							</li>
						) : (
							<li>
								<a href="/products">
									<IoIceCreamOutline
										size={40}
										className="icon-nav-responsive"
									/>
									Pedido
								</a>
							</li>
						)}
						<li>
							<a href="/book">
								<IoBookmarksOutline size={40} className="icon-nav-responsive" />
								Reservar
							</a>
						</li>
						{user && user.role !== "CLIENTE" && (
							<li>
								<a href="/dashboard">
									<IoBookmarksOutline
										size={40}
										className="icon-nav-responsive"
									/>
									Panel
								</a>
							</li>
						)}
						<div className="close-menu" onClick={closeMenu}>
							<IoClose size={36} />
						</div>
					</ul>
					<div className="logo h-content">
						<h1>HELARTICO</h1>
					</div>

					<div className="icons h-content">
						{/* BOTON DEL CARRITO DE COMPRAS */}
						<IconButton
							onClick={openShoppingCar}
							aria-label="cart"
							sx={{
								width: 48,
								height: 48,
								borderRadius: "12px",
								":hover": {
									backgroundColor: "primary.btnHomeHover",
								},
							}}
						>
							<StyledBadge
								badgeContent={quantity}
								sx={{
									width: 46,
									height: 46,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
								color="secondary"
							>
								<ShoppingCartOutlinedIcon
									sx={{ width: 34, height: 34, color: "primary.contrastText" }}
								/>
							</StyledBadge>
						</IconButton>
						{/* BOTON DE INFORMACION DE USUARIO */}
						<button className="nav-btn-user" onClick={openSettingsUser}>
							<i className="bi bi-person icon-person"></i>
						</button>
					</div>
					<div
						id="cover-sidebar"
						className="cover-sidebar"
						onClick={closeMenu}
					></div>
				</nav>
			</div>
			<div className="aside-component">
				{noneUserSetting && (
					<NoneUserAuthenticated closeMethod={closeNoneSettingsUser} />
				)}
				{userSetting && <UserSettings closeMethod={closeSettingsUser} />}
				{shoppingCar && <ShoppingCar closeMethod={closeShoppingCar} />}
			</div>
		</>
	);
}

export default NavBar;
