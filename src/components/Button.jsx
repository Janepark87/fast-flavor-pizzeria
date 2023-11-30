export default function Button({ type = 'button', variant = 'primary', size = 'md', children, disabled, onClick }) {
	return (
		<button type={type} className={`btn btn-${variant} btn-${size}`} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
}
