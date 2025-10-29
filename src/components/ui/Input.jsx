export default function Input({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  className = ''
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} ${RightIcon ? 'pr-12' : 'pr-4'} py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <RightIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>
      )}
    </div>
  );
}   