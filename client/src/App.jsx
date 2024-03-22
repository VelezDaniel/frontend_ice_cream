import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
// import Banner from "./components/banner/banner";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PannelPortfolio from "./pages/dashboard/pannel_portfolio";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					{/* <Route path="/banner" element={<Banner />} /> */}
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/products" element={<Products />} />
					<Route path="/book" element={<h1 className="title">RESERVE</h1>} />

					<Route element={<Dashboard />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard/products" element={<PannelPortfolio/>} />
						<Route path="/dashboard/booking" element={<Dashboard />} />
						<Route path="/dashboard/users" element={<Dashboard />} />
						<Route path="/dashboard/orders" element={<Dashboard />} />
						<Route path="/dashboard/sales" element={<Dashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
