import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

export default function Header() {
	return (
		<header className="flex flex-col items-center justify-between gap-3 border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:flex-row sm:px-6">
			<Link to="/" className="tracking-widest">
				Fast Flavor Pizzeria
			</Link>
			<div className="flex items-center justify-between gap-2">
				<SearchOrder />
				<Username />
			</div>
		</header>
	);
}
