import { useDispatch } from 'react-redux';
import { deleteItem } from '../../store/cart/cartSlice';
import Button from '../../components/Button';

export default function DeleteItem({ pizzaId }) {
	const dispatch = useDispatch();

	return (
		<Button size="sm" onClick={() => dispatch(deleteItem(pizzaId))}>
			Delete
		</Button>
	);
}
