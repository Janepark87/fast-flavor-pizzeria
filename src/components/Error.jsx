import { useNavigate, useRouteError } from 'react-router-dom';
import Button from './Button';

export default function Error() {
	const navigate = useNavigate();
	const error = useRouteError();

	console.log(error);

	return (
		<div>
			<h1>Something went wrong 😢</h1>
			<p>{error.message || error.data}</p>
			<Button variant="link" onClick={() => navigate(-1)}>
				&larr; Go back
			</Button>
		</div>
	);
}
