import { useSelector } from 'react-redux';
import { getCurrentQuantityById } from '../../store/cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';

export default function CartItem({ item }) {
	const { pizzaId, name, totalPrice, imageUrl } = item;
	const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

	return (
		<li className="flex gap-3 py-3 sm:gap-4 sm:py-4">
			<img src={imageUrl} alt={name} className="h-16 w-16 rounded-md object-cover sm:h-20 sm:w-20" />

			<div className="flex grow flex-col gap-2 pt-0.5 sm:gap-4">
				<div className="flex items-center justify-between gap-2">
					<p>{name}</p>
					<p className="text-sm font-bold sm:text-base">{formatCurrency(totalPrice)}</p>
				</div>

				<div className="mt-auto flex justify-end gap-2 sm:gap-4">
					{currentQuantity !== 1 && <DeleteItem pizzaId={pizzaId} />}
					<UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
				</div>
			</div>
		</li>
	);
}
