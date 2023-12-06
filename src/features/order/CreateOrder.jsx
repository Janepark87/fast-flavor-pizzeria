import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createOrder } from '../../services/apiRestaurant';
import { formatCurrency, isValidPhone } from '../../utils/helpers';
import { clearCart, getCart, getTotalCartPrice } from '../../store/cart/cartSlice';
import Button from '../../components/Button';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store/store';

export default function CreateOrder() {
	const [withPriority, setWithPriority] = useState('off');
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const formErrors = useActionData();
	const username = useSelector((store) => store.user.username);
	const cart = useSelector(getCart);

	const totalCartPrice = useSelector(getTotalCartPrice);
	const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
	const totalPrice = totalCartPrice + priorityPrice;

	if (!cart.length) return <EmptyCart />;

	return (
		<div className="px-4 py-6">
			<h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

			<Form method="POST">
				<div className="input-group">
					<label>First Name</label>
					<div>
						<input type="text" className="input" name="customer" defaultValue={username} required />
					</div>
				</div>
				<div className={`input-group ${formErrors?.phone ? 'error' : ''}`}>
					<label>Phone number</label>
					<div>
						<input type="tel" className="input" name="phone" required />
						{formErrors?.phone && <small>{formErrors.phone}</small>}
					</div>
				</div>
				<div className="input-group">
					<label>Address</label>
					<div>
						<input type="text" className="input" name="address" required />
					</div>
				</div>
				<div className="input-checkbox">
					<input
						type="checkbox"
						name="priority"
						id="priority"
						value={withPriority}
						onChange={(e) => setWithPriority(e.target.checked ? 'on' : 'off')}
						className="focus:ring-yellow-4001 h-6 w-6 cursor-pointer accent-yellow-400 focus:outline-none"
					/>
					<label htmlFor="priority" className="cursor-pointer font-medium">
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input type="hidden" name="cart" value={JSON.stringify(cart)} />
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Placing order...' : `Order now (${formatCurrency(totalPrice)})`}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const errors = {};

	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === 'on',
	};

	if (!isValidPhone(order.phone)) errors.phone = 'Please give us your correct phone number. We might need it to contact you.';

	// Return data if we have errors
	if (Object.keys(errors).length > 0) return errors;

	// If everything is okay, create a new order and redirect
	const newOrder = await createOrder(order);

	// do not overuse..
	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
}
