import { Link } from 'react-router-dom';

export default function LinkButton({ children, to, variant = 'link', size = 'md' }) {
	return (
		<Link to={to} className={`${variant !== 'link' ? `btn btn-${size} ` : ''}btn-${variant}`}>
			{children}
		</Link>
	);
}
