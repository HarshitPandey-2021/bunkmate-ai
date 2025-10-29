export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  className = '',
  disabled = false,
  fullWidth = false
}) {
  
  const baseStyles = 'py-3 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-500 hover:text-purple-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-purple-600 hover:bg-purple-50'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
}