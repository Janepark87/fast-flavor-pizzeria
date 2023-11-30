import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';
import OrderItem from './OrderItem';

export default function Order() {
	const order = useLoaderData();
	const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;
	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	console.log(cart);

	return (
		<div className="space-y-8 px-4 py-6">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<h2 className="text-xl font-semibold">Order #{id} status</h2>
				<div className="space-x-2">
					{priority && <span className="badge badge-purple">Priority</span>}
					<span className="badge badge-green">{status} order</span>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-stone-200 px-6 py-6">
				<p className="font-medium">{deliveryIn >= 0 ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃` : 'Order should have arrived'}</p>
				<p className="text-xs text-stone-600">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
			</div>

			<ul className="dive-stone-200 divide-y">
				{cart.map((item) => (
					<OrderItem key={item.pizzaId} item={item} />
				))}
			</ul>

			<div className="border-t-2 py-5">
				<div className="ml-auto max-w-sm space-y-2">
					<p className="flex justify-between gap-2 text-sm font-medium text-stone-600">
						<span>
							Subtotal ({cart.length} {cart.length > 1 ? 'items' : 'item'}):{' '}
						</span>
						<span>{formatCurrency(orderPrice)}</span>
					</p>
					{priority && (
						<p className="flex justify-between gap-2 text-sm">
							<span>Delivery(priority):</span>
							<span>{formatCurrency(priorityPrice)}</span>
						</p>
					)}
					<p className="flex justify-between gap-2 text-sm">
						<span>Estimated Tax(5%):</span>
						<span>{formatCurrency(orderPrice * 0.05)}</span>
					</p>
					<p className="flex justify-between gap-2 font-bold">
						<span>Order Total:</span>
						<span>{formatCurrency(orderPrice + priorityPrice)}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export async function loader({ params }) {
	const order = await getOrder(params.orderId);
	return order;
}
