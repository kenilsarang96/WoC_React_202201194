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
  // Define styles based on variant and size
  const baseStyles = 'font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  // Combine styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
    >
      {/* Icon on the left */}
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}

      {/* Button content */}
      {children}

      {/* Icon on the right */}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
}

export default Button;