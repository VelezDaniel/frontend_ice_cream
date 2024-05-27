import { CartContext } from "../../context/ShoppingCartContext";
import ProductImgBuilder from "../../utils/ProductImgBuilder";

// ** MATERIAL UI IMPORTS ** //
import { IconButton } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

export const ItemCart = ({ name, price, id, imgUrl, description, entireObject }) => {
	const [cart, setCart] = useContext(CartContext);

	// ? Añadir al carrito un producto
	const addToCart = () => {
		setCart((currentItems) => {
			const isItemsFound = currentItems.find((item) => item.id === id);
			if (isItemsFound) {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			} else {
				return [...currentItems, { id, quantity: 1, price }];
			}
		});
	};

	// ? Eliminar un producto del carrito
	const removeItemCart = (id) => {
		setCart((currentItems) => {
			if (currentItems.find((item) => item.id === id)?.quantity === 1) {
				return currentItems.filter((item) => item.id !== id);
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	// ? Obtener cantidad de un producto por Id
	const getQuantityById = (id) => {
		return cart.find((item) => item.id === id)?.quantity || 0;
	};

	// ? Cantidad por producto
	const quantityPerItem = getQuantityById(id);

	return (
		<div>
			<div>
				<img
					src={ProductImgBuilder(name.toLowerCase())}
					alt="imagen helado"
					className="img-card-portfolio"
				/>
			</div>
      <div>
        <div>
          <p>{name}</p>
        </div>
        <p>{description}</p>
        <p>${price}</p>
        <div>
				<IconButton aria-label="add" size="large">
					<AddRoundedIcon />
				</IconButton>
				<span>{quantityPerItem}</span>
				<IconButton aria-label="minus" size="large">
					<RemoveRoundedIcon />
				</IconButton>
        </div>
      </div>
		</div>
	);
};
