import React from 'react';
import { motion } from 'framer-motion';

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
  
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out';

  
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 focus:ring-cyan-500',
    secondary:
      'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline:
      'border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 focus:ring-cyan-500',
    danger:
      'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 focus:ring-red-500',
  };

  
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'hover:shadow-lg hover:-translate-y-0.5';

    
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
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
    </motion.button>
  );
}

export default Button;
