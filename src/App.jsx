import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './layouts/Root';
import Home from './layouts/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, { action as createOrderAction } from './features/order/CreateOrder';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import Error from './components/Error';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <Home /> },
			{
				path: '/menu',
				element: <Menu />,
				loader: menuLoader,
				errorElement: <Error />,
			},
			{ path: '/cart', element: <Cart /> },
			{
				path: '/order/new',
				element: <CreateOrder />,
				action: createOrderAction,
			},
			{
				path: '/order/:orderId',
				element: <Order />,
				loader: orderLoader,
				action: updateOrderAction,
				errorElement: <Error />,
			},
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
