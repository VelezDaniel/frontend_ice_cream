import "./navbar.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import UserSettings from "../user_settings/UserSettings";
import NoneUserAuthenticated from "../user_settings/NoneUser";
import {
	IoMenu,
	IoClose,
	IoIceCreamOutline,
	IoBookmarksOutline,
} from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';

function NavBar({ navBarType }) {
	// const navigate = useNavigate();
	const [scroll, setScroll] = useState(false);
	const [menuVisible, setMenuVisible] = useState(false);
	const [userSetting, setUserSetting] = useState(false);
	const [noneUserSetting, setNoneUserSetting] = useState(false);

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
		if(user) {
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

						<li>
							<a href="/products">
								<IoIceCreamOutline size={40} className="icon-nav-responsive" />
								Productos
							</a>
						</li>
						<li>
							<a href="/book">
								<IoBookmarksOutline size={40} className="icon-nav-responsive" />
								Reservar
							</a>
						</li>
						<div className="close-menu" onClick={closeMenu}>
							<IoClose size={36} />
						</div>
					</ul>
					<div className="logo h-content">
						<h1>HELARTICO</h1>
					</div>

					<div className="icons h-content">
						<a className="nav-item nav-icon" href="">
							<i className="bi bi-handbag"></i>
						</a>
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
				{/* {userSetting && (
				<UserSettings closeMethod={closeSettingsUser} />
			)} */}
			</div>
			<div className="aside-user">
				{noneUserSetting && (
					<NoneUserAuthenticated closeMethod={closeNoneSettingsUser} />
				)}
				{userSetting && (
					<UserSettings closeMethod={closeSettingsUser} />
				)}
			</div>
		</>
	);
}

export default NavBar;
