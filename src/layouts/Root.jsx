import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from '../components/Loader';

export default function Root() {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<div className="h-screen-dvh grid grid-rows-[auto_1fr_auto]">
			{isLoading && <Loader />}

			<Header />

			<main className="overflow-y-auto">
				<div className="mx-auto max-w-3xl">
					<Outlet />
				</div>
			</main>

			<CartOverview />
		</div>
	);
}
