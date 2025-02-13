import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQuantityById } from '../../store/cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/Button';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

export default function MenuItem({ pizza }) {
	const dispatch = useDispatch();
	const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
	const currentQuantity = useSelector(getCurrentQuantityById(id));
	const isInCart = currentQuantity > 0;

	const handleAddToCart = () => {
		const newItem = {
			pizzaId: id,
			name,
			quantity: 1,
			unitPrice,
			totalPrice: unitPrice * 1,
			imageUrl,
		};

		dispatch(addItem(newItem));
	};

	return (
		<li className="flex gap-4 py-2">
			<img src={imageUrl} alt={name} className={`h-24 w-24 rounded-md object-cover text-xs ${soldOut ? 'opacity-70 grayscale' : ''}`} />

			<div className="flex grow flex-col gap-2 pt-0.5">
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
				</div>

				<div className="mt-auto flex items-center justify-between gap-2">
					{!soldOut ? (
						<p className="text-sm">{formatCurrency(unitPrice)}</p>
					) : (
						<p className="text-sm font-medium uppercase text-stone-500">Sold out</p>
					)}

					{isInCart && <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity} />}

					{!soldOut && !isInCart && (
						<Button size="sm" onClick={handleAddToCart}>
							+ Add
						</Button>
					)}
				</div>
			</div>
		</li>
	);
}
