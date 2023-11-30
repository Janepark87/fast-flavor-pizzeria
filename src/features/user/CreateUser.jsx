import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateName } from '../../store/user/userSlice';
import Button from '../../components/Button';

export default function CreateUser() {
	const inputName = useRef();
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => inputName.current.focus(), []);

	function handleSubmit(e) {
		e.preventDefault();

		if (!username.trim()) {
			inputName.current.focus();
			return;
		}

		dispatch(updateName(username.trim()));
		setUsername('');
		navigate('/menu');
	}

	return (
		<form onSubmit={handleSubmit}>
			<p className="mb-4 text-sm text-stone-600 md:text-base">👋 Welcome! Please start by telling us your name:</p>

			<input
				ref={inputName}
				type="text"
				className="input mb-8 w-72"
				placeholder="Your full name"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			{username !== '' && (
				<div>
					<Button type="submit">Start ordering</Button>
				</div>
			)}
		</form>
	);
}
