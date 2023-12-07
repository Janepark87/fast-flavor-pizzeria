import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from '../../store/cart/cartSlice';
import Button from '../../components/Button';
import LinkButton from '../../components/LinkButton';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

export default function Cart() {
	const dispatch = useDispatch();
	const username = useSelector((store) => store.user.username);
	const cart = useSelector(getCart);

	if (!cart.length) return <EmptyCart />;
	return (
		<div className="px-4 py-3">
			<LinkButton to="/menu">&larr; Back to menu</LinkButton>

			<h2 className="mt-7 text-xl font-semibold">Your cart, {username ? username : 'Guest!'}</h2>

			<ul className="mt-3 divide-y divide-stone-200 border-b">
				{cart.map((item) => (
					<CartItem key={item.pizzaId} item={item} />
				))}
			</ul>

			<div className="mt-6 space-x-2">
				<LinkButton to="/order/new" variant="primary">
					Order pizzas
				</LinkButton>

				<Button variant="outline-secondary" onClick={() => dispatch(clearCart())}>
					Clear cart
				</Button>
			</div>
		</div>
	);
}
