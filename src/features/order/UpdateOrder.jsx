import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../components/Button';

export default function UpdateOrder() {
	const fetcher = useFetcher();

	return (
		<fetcher.Form method="PATCH" className="text-right">
			<Button type="submit" size="sm">
				Make Priority
			</Button>
		</fetcher.Form>
	);
}

export async function action({ request, params }) {
	const updatedData = { priority: true };
	await updateOrder(params.orderId, updatedData);
	return null;
}
