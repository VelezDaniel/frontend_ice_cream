import { createContext, useState } from "react";

export const FiltersContext = createContext();

// Crear el Provider
export function FiltersProvider({ children }) {
	const [filters, setFilters] = useState({
		productType: "all",
		productName: "",
	});

	return (
		<FiltersContext.Provider
			value={{
				filters,
				setFilters,
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
}
