import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../services/apiRestaurant';
import { formatCurrency, isValidPhone } from '../../utils/helpers';
import { clearCart, getCart, getTotalCartPrice } from '../../store/cart/cartSlice';
import { fetchAddress, getUser } from '../../store/user/userSlice';
import store from '../../store/store';
import Button from '../../components/Button';
import EmptyCart from '../cart/EmptyCart';

export default function CreateOrder() {
	const [withPriority, setWithPriority] = useState(false);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const formErrors = useActionData();

	const { username, status: addressStatus, position, address, error: errorAddress } = useSelector(getUser);
	const isLoadingAddress = addressStatus === 'loading';

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
				<div className={`input-group ${addressStatus === 'error' ? 'error' : ''}`}>
					<label>Address</label>
					<div>
						<div className="relative">
							<input type="text" className="input" name="address" defaultValue={address} disabled={isLoadingAddress} required />

							{!position.latitude && !position.longitude && (
								<Button
									size="xs"
									className="absolute right-2 top-1/2 z-50 translate-y-[-50%] rounded-md sm:right-1"
									onClick={(e) => {
										e.preventDefault();
										dispatch(fetchAddress());
									}}
									disabled={isLoadingAddress}
								>
									{isLoadingAddress ? 'Getting...' : 'Get Position'}
								</Button>
							)}
						</div>

						{addressStatus === 'error' && <small>{errorAddress}</small>}
					</div>
				</div>
				<div className="input-checkbox">
					<input
						type="checkbox"
						name="priority"
						id="priority"
						value={withPriority}
						onChange={(e) => setWithPriority(e.target.checked)}
						className="focus:ring-yellow-4001 h-5 w-5 cursor-pointer accent-yellow-400 focus:outline-none"
					/>
					<label htmlFor="priority" className="cursor-pointer font-medium">
						Want to give your order priority?
					</label>
				</div>

				<div>
					<input type="hidden" name="cart" value={JSON.stringify(cart)} />
					<input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ''} />

					<Button type="submit" disabled={isSubmitting || isLoadingAddress}>
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
		priority: Boolean(data.priority),
	};

	if (!isValidPhone(order.phone)) errors.phone = 'Please give us your correct phone number. We might need it to contact you.';

	// Return data if we have errors
	if (Object.keys(errors).length > 0) return errors;

	// If everything is okay, create a new order and redirect - #4DCXX0
	const newOrder = await createOrder(order);

	// do not overuse..
	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
}
