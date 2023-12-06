export default function Button({ type = 'button', variant = 'primary', size = 'md', className = '', children, disabled, onClick }) {
	return (
		<button type={type} className={`btn btn-${variant} btn-${size} ${className}`} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
}
