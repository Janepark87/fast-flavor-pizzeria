import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!query) return;

		navigate(`/order/${query}`);
		setQuery('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search order #"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-48 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-100 placeholder:text-stone-400 focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64"
			/>
		</form>
	);
}
