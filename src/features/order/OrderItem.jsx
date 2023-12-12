import { formatCurrency } from '../../utils/helpers';

export default function OrderItem({ item, fetchItem, isLoadingFetchItem }) {
	const { quantity, name, totalPrice } = item;

	return (
		<li className="flex gap-4 py-3">
			{isLoadingFetchItem ? (
				<div className="spin-container">
					<span className="spin"></span>
				</div>
			) : (
				<img src={fetchItem?.imageUrl} alt={name} className="h-16 w-16 rounded-md object-cover sm:h-20 sm:w-20" />
			)}

			<div className="flex grow flex-col gap-2 pt-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
				<div>
					<p className="text-sm sm:text-base">{name}</p>
					<p className="text-sm capitalize italic text-stone-500">{isLoadingFetchItem ? 'Loading...' : fetchItem?.ingredients.join(', ')}</p>
				</div>

				<div className="mt-auto flex justify-end gap-2 sm:mt-1 sm:gap-4">
					<span className="text-sm font-medium">{quantity}&times;</span>
					<p className="text-sm font-medium">{formatCurrency(totalPrice)}</p>
				</div>
			</div>
		</li>
	);
}
