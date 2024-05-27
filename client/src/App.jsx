import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Bookings from "./pages/Bookings";
// import Banner from "./components/banner/banner";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
// Styles
import "./index.css";
// import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<ShoppingCartProvider>
				<AuthProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/login" element={<LoginPage />} />
							{/* <Route path="/banner" element={<Banner />} /> */}
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/products" element={<Products />} />
							<Route path="/book" element={<Bookings />} />

							{/* Solo usuarios funcionarios */}
							<Route element={<ProtectedRoute />}>
								<Route path="/dashboard" element={<Dashboard />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</ShoppingCartProvider>
		</ThemeProvider>
	);
}

export default App;
