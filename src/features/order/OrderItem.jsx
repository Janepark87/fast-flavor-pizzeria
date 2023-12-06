import { formatCurrency } from '../../utils/helpers';

export default function OrderItem({ item, isLoadingIngredients, ingredients }) {
	const { quantity, name, totalPrice } = item;

	return (
		<li className="py-3">
			<div className="flex items-center justify-between gap-4 text-sm">
				<p>{name}</p>

				<div className="flex items-center gap-4">
					<span className="font-medium">{quantity}&times;</span>
					<p className="font-medium">{formatCurrency(totalPrice)}</p>
				</div>
			</div>
		</li>
	);
}
