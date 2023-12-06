import { useDispatch } from 'react-redux';
import { deleteItem } from '../../store/cart/cartSlice';

export default function DeleteItem({ pizzaId }) {
	const dispatch = useDispatch();

	return (
		<button
			onClick={() => dispatch(deleteItem(pizzaId))}
			className="btn cursor-pointer text-xs text-stone-600 underline underline-offset-2 focus:ring-0 focus:ring-offset-0 sm:text-sm"
		>
			Remove
		</button>
	);
}
