import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/helpers';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';

const fakeCart = [
	{
		pizzaId: 12,
		name: 'Mediterranean',
		quantity: 2,
		unitPrice: 16,
		totalPrice: 32,
	},
	{
		pizzaId: 6,
		name: 'Vegetale',
		quantity: 1,
		unitPrice: 13,
		totalPrice: 13,
	},
	{
		pizzaId: 11,
		name: 'Spinach and Mushroom',
		quantity: 1,
		unitPrice: 15,
		totalPrice: 15,
	},
];

export default function CreateOrder() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const formErrors = useActionData();
	const username = useSelector((store) => store.user.username);

	const cart = fakeCart;

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
						value="on"
						className="focus:ring-yellow-4001 h-6 w-6 cursor-pointer accent-yellow-400 focus:outline-none"
					/>
					<label htmlFor="priority" className="cursor-pointer font-medium">
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input type="hidden" name="cart" value={JSON.stringify(cart)} />
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Placing order...' : 'Order now'}
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
	// const newOrder = await createOrder(order);
	// return redirect(`/order/${newOrder.id}`);
	return null;
}
