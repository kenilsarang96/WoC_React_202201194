import React from 'react';

function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'outline',
  size = 'medium',
  icon,
  iconPosition = 'left',
  ...props
}) {
  // Base styles for all buttons
  const baseStyles =
    'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out';

  // Variant styles (chemistry-inspired colors)
  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 focus:ring-cyan-500',
    secondary: 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 focus:ring-gray-500',
    outline: 'border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 focus:ring-cyan-500',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 focus:ring-red-500',
  };

  // Size styles
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-7 py-3.5 text-lg',
  };

  // Disabled styles
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'hover:shadow-lg hover:-translate-y-0.5';

  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      {...props}
    >
      {/* Icon on the left */}
      {icon && iconPosition === 'left' && (
        <span className="mr-2 inline-flex items-center">{icon}</span>
      )}

      {/* Button content */}
      {children}

      {/* Icon on the right */}
      {icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex items-center">{icon}</span>
      )}
    </button>
  );
}

export default Button;