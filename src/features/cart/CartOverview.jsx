import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from '../../store/cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';

export default function CartOverview() {
	const totalCartQuantity = useSelector(getTotalCartQuantity);
	const totalCartPrice = useSelector(getTotalCartPrice);

	if (!totalCartQuantity) return;

	return (
		<div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
			<p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
				<span>{totalCartQuantity} pizzas</span>
				<span>{formatCurrency(totalCartPrice)}</span>
			</p>
			<Link to="/cart">Open cart &rarr;</Link>
		</div>
	);
}
