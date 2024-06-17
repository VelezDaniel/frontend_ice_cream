import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Bookings from "./pages/Bookings";
import Payment from "./pages/Payment";
import CancelPayment from "./pages/CancelPayment";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Toaster } from "sonner";
// Styles
import "./index.css";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<ShoppingCartProvider>
				<Toaster position="top-center" />
				<AuthProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/products" element={<Products />} />
							<Route path="/book" element={<Bookings />} />

							<Route path="/payed" element={<Payment />} />

							<Route path="/payment-canceled" element={<CancelPayment />} />

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
